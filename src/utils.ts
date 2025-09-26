import type { PayPeriod, VisitingDates, DaysInOtherStates, Bonus, TaxSettings, CalculationResult } from './types';
import { getStandardDeduction, getTaxBrackets } from './config';

// --- UTILITY FUNCTIONS ---

export const formatCurrency = (amount: number): string => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);

// --- TAX CALCULATION LOGIC ---

export const calculateMnTax = (grossTaxable: number, settings: TaxSettings, stateCode: string = 'MN'): number => {
    const deduction = settings.deductionType === 'itemized' && settings.itemizedDeduction 
        ? Number(settings.itemizedDeduction) 
        : getStandardDeduction(stateCode, settings.filingStatus);
    
    if (grossTaxable <= deduction) return 0;
    
    let taxable = grossTaxable - deduction;
    let owed = 0;
    let lastLimit = 0;
    
    const brackets = getTaxBrackets(stateCode);
    for (const bracket of brackets) {
        const bracketAmount = Math.min(bracket.upTo, taxable) - lastLimit;
        if (bracketAmount > 0) {
            owed += bracketAmount * bracket.rate;
            lastLimit = bracket.upTo;
        }
        if (taxable <= bracket.upTo) break;
    }
    
    return owed;
};

// --- ALLOCATION CALCULATION LOGIC ---

export function calculateAllocation(
    data: PayPeriod, 
    primaryState: string, 
    visitingDates: VisitingDates, 
    daysInOtherStates: DaysInOtherStates, 
    globalBonuses: Bonus[]
): CalculationResult {
    const { netPay, payPeriodStart, payPeriodEnd } = data;
    const ppStart = new Date(payPeriodStart + 'T00:00:00');
    const ppEnd = new Date(payPeriodEnd + 'T00:00:00');
    const primaryVisitStart = new Date(visitingDates.start + 'T00:00:00');
    const primaryVisitEnd = new Date(visitingDates.end + 'T00:00:00');

    if (isNaN(ppStart.getTime()) || isNaN(ppEnd.getTime())) {
        throw new Error(`Invalid pay period date for ${payPeriodStart}`);
    }

    const periodBonuses = globalBonuses.filter(b => {
        const bonusDate = new Date(b.date + 'T00:00:00');
        return b.date && bonusDate >= ppStart && bonusDate <= ppEnd;
    });

    // Helper: is weekday
    function isWeekday(date: Date): boolean {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
    }

    // Build a map of imported days (only weekdays)
    const otherStateDaysMap = new Map<string, string>();
    for (const state in daysInOtherStates) {
        for (const dateStr of daysInOtherStates[state]) {
            if(dateStr) {
                const d = new Date(dateStr + 'T00:00:00');
                if (isWeekday(d)) {
                    otherStateDaysMap.set(dateStr, state);
                }
            }
        }
    }

    let daysInPrimary = 0;
    const daysInOtherStatesCount: Record<string, number> = {};
    let totalWorkedDays = 0;

    for (let d = new Date(ppStart); d <= ppEnd; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (!isWeekday(d)) continue;
        if (otherStateDaysMap.has(dateStr)) {
            const state = otherStateDaysMap.get(dateStr)!;
            daysInOtherStatesCount[state] = (daysInOtherStatesCount[state] || 0) + 1;
            totalWorkedDays++;
        } else if (d >= primaryVisitStart && d <= primaryVisitEnd) {
            daysInPrimary++;
            totalWorkedDays++;
        }
    }

    // Bonuses are not subtracted from period pay; they are separate gross pay, allocated by date
    const regularPay = parseFloat(String(netPay || 0));
    const dailyRate = totalWorkedDays > 0 ? regularPay / totalWorkedDays : 0;

    const allocations: Record<string, { days: number; regularPay: number; bonus: number; total: number }> = {};
    const allStates = new Set([primaryState, ...Object.keys(daysInOtherStates), ...periodBonuses.map(b => b.state)]);
    
    allStates.forEach(state => {
        if (state) allocations[state] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
    });

    if (allocations[primaryState]) allocations[primaryState].days = daysInPrimary;
    for (const state in daysInOtherStatesCount) {
        if (allocations[state]) allocations[state].days = daysInOtherStatesCount[state];
    }
    for (const state in allocations) {
        allocations[state].regularPay = (allocations[state].days || 0) * dailyRate;
    }
    
    // Handle bonus allocation based on bonus type
    periodBonuses.forEach(bonus => {
        const bonusAmount = parseFloat(String(bonus.amount || 0));
        
        if (bonus.type === 'sign-on') {
            // Sign-on bonuses are applied to the state where the person was working on the date received
            const bonusDate = new Date(bonus.date + 'T00:00:00');
            const dateStr = bonusDate.toISOString().split('T')[0];
            
            let workingState = primaryState; // Default to primary state
            if (otherStateDaysMap.has(dateStr)) {
                workingState = otherStateDaysMap.get(dateStr)!;
            } else if (bonusDate >= primaryVisitStart && bonusDate <= primaryVisitEnd) {
                workingState = primaryState;
            }
            
            if (!allocations[workingState]) {
                allocations[workingState] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
            }
            allocations[workingState].bonus += bonusAmount;
        } else if (bonus.type === 'services-rendered') {
            // Services rendered bonuses are split based on days worked in each state during the bonus period
            const bonusPeriodStart = bonus.bonusPeriodStart ? new Date(bonus.bonusPeriodStart + 'T00:00:00') : ppStart;
            const bonusPeriodEnd = bonus.bonusPeriodEnd ? new Date(bonus.bonusPeriodEnd + 'T00:00:00') : ppEnd;
            
            // Count days worked in each state during the bonus period
            let bonusPeriodDaysInPrimary = 0;
            const bonusPeriodDaysInOtherStates: Record<string, number> = {};
            let totalBonusPeriodDays = 0;
            
            for (let d = new Date(Math.max(bonusPeriodStart.getTime(), ppStart.getTime())); 
                 d <= new Date(Math.min(bonusPeriodEnd.getTime(), ppEnd.getTime())); 
                 d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                if (!isWeekday(d)) continue;
                
                if (otherStateDaysMap.has(dateStr)) {
                    const state = otherStateDaysMap.get(dateStr)!;
                    bonusPeriodDaysInOtherStates[state] = (bonusPeriodDaysInOtherStates[state] || 0) + 1;
                    totalBonusPeriodDays++;
                } else if (d >= primaryVisitStart && d <= primaryVisitEnd) {
                    bonusPeriodDaysInPrimary++;
                    totalBonusPeriodDays++;
                }
            }
            
            // Allocate bonus proportionally to each state based on days worked
            if (totalBonusPeriodDays > 0) {
                // Allocate to primary state
                if (bonusPeriodDaysInPrimary > 0) {
                    const primaryAllocation = (bonusPeriodDaysInPrimary / totalBonusPeriodDays) * bonusAmount;
                    if (!allocations[primaryState]) {
                        allocations[primaryState] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
                    }
                    allocations[primaryState].bonus += primaryAllocation;
                }
                
                // Allocate to other states
                for (const state in bonusPeriodDaysInOtherStates) {
                    const stateAllocation = (bonusPeriodDaysInOtherStates[state] / totalBonusPeriodDays) * bonusAmount;
                    if (!allocations[state]) {
                        allocations[state] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
                    }
                    allocations[state].bonus += stateAllocation;
                }
            } else {
                // If no working days found in bonus period, allocate to primary state
                if (!allocations[primaryState]) {
                    allocations[primaryState] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
                }
                allocations[primaryState].bonus += bonusAmount;
            }
        } else {
            // Fallback for bonuses without type (backwards compatibility)
            const bonusDate = new Date(bonus.date + 'T00:00:00');
            const dateStr = bonusDate.toISOString().split('T')[0];
            
            // Determine which state the person was working in on this date
            let workingState = '';
            if (otherStateDaysMap.has(dateStr)) {
                workingState = otherStateDaysMap.get(dateStr)!;
            } else if (bonusDate >= primaryVisitStart && bonusDate <= primaryVisitEnd) {
                workingState = primaryState;
            }
            
            if (workingState) {
                if (!allocations[workingState]) {
                    allocations[workingState] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
                }
                allocations[workingState].bonus += bonusAmount;
            }
        }
    });
    
    for (const state in allocations) {
        allocations[state].total = allocations[state].regularPay + allocations[state].bonus;
    }
    
    return { allocations, primaryState, summary: { totalWorkedDays, dailyRate, regularPay } };
}

// --- INCOME TAX CALCULATION LOGIC ---

export function calculateIncomeTax(grossIncome: number, filingStatus: 'single' | 'married'): {
    grossIncome: number;
    filingStatus: 'single' | 'married';
    standardDeduction: number;
    taxableIncome: number;
    estimatedTax: number;
} {
    // 2024 Tax Year Standard Deductions
    const standardDeductions = {
        single: 14600,
        married: 29200
    };

    // 2024 Tax Year Federal Tax Brackets
    const taxBrackets = {
        single: [
            { rate: 0.10, min: 0, max: 11000 },
            { rate: 0.12, min: 11001, max: 44725 },
            { rate: 0.22, min: 44726, max: 95375 },
            { rate: 0.24, min: 95376, max: 182050 },
            { rate: 0.32, min: 182051, max: 231250 },
            { rate: 0.35, min: 231251, max: 578125 },
            { rate: 0.37, min: 578126, max: Infinity }
        ],
        married: [
            { rate: 0.10, min: 0, max: 22000 },
            { rate: 0.12, min: 22001, max: 89450 },
            { rate: 0.22, min: 89451, max: 190750 },
            { rate: 0.24, min: 190751, max: 364200 },
            { rate: 0.32, min: 364201, max: 462500 },
            { rate: 0.35, min: 462501, max: 693750 },
            { rate: 0.37, min: 693751, max: Infinity }
        ]
    };

    const standardDeduction = standardDeductions[filingStatus];
    const taxableIncome = Math.max(0, grossIncome - standardDeduction);
    
    let estimatedTax = 0;
    const brackets = taxBrackets[filingStatus];
    
    for (const bracket of brackets) {
        if (taxableIncome <= bracket.min) break;
        
        const taxableAtThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        if (taxableAtThisBracket > 0) {
            estimatedTax += taxableAtThisBracket * bracket.rate;
        }
        
        if (taxableIncome <= bracket.max) break;
    }

    return {
        grossIncome,
        filingStatus,
        standardDeduction,
        taxableIncome,
        estimatedTax: Math.round(estimatedTax * 100) / 100
    };
}

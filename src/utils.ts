import type { PayPeriod, VisitingDates, DaysInOtherStates, Bonus, TaxSettings, CalculationResult } from './types';

// --- UTILITY FUNCTIONS ---

export const formatCurrency = (amount: number): string => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);

// --- TAX CALCULATION LOGIC ---

export const calculateMnTax = (grossTaxable: number, settings: TaxSettings): number => {
    const deduction = settings.deductionType === 'itemized' && settings.itemizedDeduction 
        ? Number(settings.itemizedDeduction) 
        : Number(settings.stdDeduction);
    
    if (grossTaxable <= deduction) return 0;
    
    let taxable = grossTaxable - deduction;
    let owed = 0;
    let lastLimit = 0;
    
    for (const bracket of settings.brackets) {
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
    
    // Each bonus is its own gross pay, allocated to the state for its date
    periodBonuses.forEach(bonus => {
        if (bonus.state) {
            if (!allocations[bonus.state]) {
                allocations[bonus.state] = { days: 0, regularPay: 0, bonus: 0, total: 0 };
            }
            allocations[bonus.state].bonus += parseFloat(String(bonus.amount || 0));
        }
    });
    
    for (const state in allocations) {
        allocations[state].total = allocations[state].regularPay + allocations[state].bonus;
    }
    
    return { allocations, primaryState, summary: { totalWorkedDays, dailyRate, regularPay } };
}

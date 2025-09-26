// Configuration constants for the tax calculator
import { stateTaxConfigs } from './stateTaxData';

export const CLIENT_ID = '158815926301-2e46taooqll1firpnkq04ajlt9mmaq6o.apps.googleusercontent.com';
export const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
export const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
export const LOCAL_STORAGE_KEY = 'payAllocatorData_React';

export const exampleData = {
    primaryState: "MN",
    visitingDates: { start: "2025-01-01", end: "2025-05-31" },
    daysInOtherStates: { "FL": ["2025-01-16", "2025-01-17", "2025-02-10"], "AZ": [] },
    payPeriods: [
        { id: 1, netPay: 8500.00, payPeriodStart: "2025-01-15", payPeriodEnd: "2025-01-31" },
        { id: 2, netPay: 8650.00, payPeriodStart: "2025-02-01", payPeriodEnd: "2025-02-15" }
    ],
    bonuses: [
        { id: 1, amount: 1000, state: "MN", date: "2025-01-20" },
        { id: 2, amount: 250, state: "FL", date: "2025-01-30" },
        { id: 3, amount: 1200, state: "FL", date: "2025-02-14" }
    ]
};

export const defaultTaxSettings = {
    filingStatus: 'single' as const,
    deductionType: 'standard' as const,
    itemizedDeduction: ''
};

// Function to get user tax settings for any state
export function getTaxSettingsForState(_stateCode: string, filingStatus: 'single' | 'married' = 'single') {
    return {
        ...defaultTaxSettings,
        filingStatus
    };
}

// Helper function to get standard deduction for a state and filing status
export function getStandardDeduction(stateCode: string, filingStatus: 'single' | 'married' = 'single'): number {
    const config = stateTaxConfigs[stateCode.toUpperCase()];
    if (!config || !config.hasIncomeTax) {
        // Return MN amounts for states without income tax or invalid states
        return filingStatus === 'married' ? 29900 : 14950;
    }
    
    return filingStatus === 'married' 
        ? config.standardDeduction.marriedJoint 
        : config.standardDeduction.single;
}

// Helper function to get tax brackets for a state
export function getTaxBrackets(stateCode: string) {
    const config = stateTaxConfigs[stateCode.toUpperCase()];
    if (!config || !config.hasIncomeTax) {
        // Return MN brackets for states without income tax or invalid states
        return [
            { rate: 0.0535, upTo: 32570 },
            { rate: 0.068, upTo: 106990 },
            { rate: 0.0785, upTo: 198630 },
            { rate: 0.0985, upTo: Infinity }
        ];
    }
    
    return config.brackets;
}

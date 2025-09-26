// TypeScript interfaces for the tax calculator

export interface VisitingDates {
  start: string;
  end: string;
}

export interface PayPeriod {
  id: number | string;
  netPay: number | string;
  payPeriodStart: string;
  payPeriodEnd: string;
}

export interface Bonus {
  id: number | string;
  amount: number | string;
  state: string;
  date: string;
}

export interface DaysInOtherStates {
  [state: string]: string[];
}

export interface FormData {
  primaryState: string;
  visitingDates: VisitingDates;
  payPeriods: PayPeriod[];
  bonuses: Bonus[];
  daysInOtherStates: DaysInOtherStates;
}

export interface TaxBracket {
  rate: number;
  upTo: number;
}

export interface TaxSettings {
  filingStatus: 'single' | 'married';
  deductionType: 'standard' | 'itemized';
  itemizedDeduction: string | number;
}

export interface Message {
  text: string;
  type: 'error' | 'success' | 'info';
}

export interface CollapsedSections {
  global: boolean;
  otherStates: boolean;
  bonuses: boolean;
  payPeriods: boolean;
}

export interface AllocationResult {
  days: number;
  regularPay: number;
  bonus: number;
  total: number;
}

export interface Allocations {
  [state: string]: AllocationResult;
}

export interface CalculationResult {
  allocations: Allocations;
  primaryState: string;
  summary: {
    totalWorkedDays: number;
    dailyRate: number;
    regularPay: number;
  };
}

export interface ResultData {
  period: PayPeriod;
  result: CalculationResult;
}

export interface FilingStatus {
  status: 'single' | 'married';
  standardDeduction: number;
}

export interface IncomeTaxCalculation {
  grossIncome: number;
  filingStatus: 'single' | 'married';
  standardDeduction: number;
  taxableIncome: number;
  estimatedTax: number;
}

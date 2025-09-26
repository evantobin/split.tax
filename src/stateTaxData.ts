// Generated from 2025 State Individual Income Tax Rates and Brackets CSV
export interface StateTaxBracket {
  rate: number;
  upTo: number;
}

export interface StateTaxConfig {
  state: string;
  hasIncomeTax: boolean;
  standardDeduction: {
    single: number;
    marriedJoint: number;
  };
  personalExemption: {
    single: number;
    marriedJoint: number;
    dependent: number;
  };
  brackets: StateTaxBracket[];
}

export const stateTaxConfigs: Record<string, StateTaxConfig> = {
  'AL': {
    state: 'Alabama',
    hasIncomeTax: true,
    standardDeduction: { single: 3000, marriedJoint: 8500 },
    personalExemption: { single: 1500, marriedJoint: 3000, dependent: 1000 },
    brackets: [
      { rate: 0.02, upTo: 500 },
      { rate: 0.04, upTo: 3000 },
      { rate: 0.05, upTo: Infinity }
    ]
  },
  'AK': {
    state: 'Alaska',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'AZ': {
    state: 'Arizona',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 100 }, // Credit, not exemption
    brackets: [
      { rate: 0.025, upTo: Infinity }
    ]
  },
  'AR': {
    state: 'Arkansas',
    hasIncomeTax: true,
    standardDeduction: { single: 2410, marriedJoint: 4820 },
    personalExemption: { single: 29, marriedJoint: 58, dependent: 29 }, // Credit
    brackets: [
      { rate: 0.02, upTo: 4500 },
      { rate: 0.039, upTo: Infinity }
    ]
  },
  'CA': {
    state: 'California',
    hasIncomeTax: true,
    standardDeduction: { single: 5540, marriedJoint: 11080 },
    personalExemption: { single: 149, marriedJoint: 298, dependent: 461 }, // Credit
    brackets: [
      { rate: 0.01, upTo: 10756 },
      { rate: 0.02, upTo: 25499 },
      { rate: 0.04, upTo: 40245 },
      { rate: 0.06, upTo: 55866 },
      { rate: 0.08, upTo: 70606 },
      { rate: 0.093, upTo: 360659 },
      { rate: 0.103, upTo: 432787 },
      { rate: 0.123, upTo: 721314 },
      { rate: 0.133, upTo: Infinity }
    ]
  },
  'CO': {
    state: 'Colorado',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.044, upTo: Infinity }
    ]
  },
  'CT': {
    state: 'Connecticut',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 15000, marriedJoint: 24000, dependent: 0 },
    brackets: [
      { rate: 0.02, upTo: 10000 },
      { rate: 0.045, upTo: 50000 },
      { rate: 0.055, upTo: 100000 },
      { rate: 0.06, upTo: 200000 },
      { rate: 0.065, upTo: 250000 },
      { rate: 0.069, upTo: 500000 },
      { rate: 0.0699, upTo: Infinity }
    ]
  },
  'DE': {
    state: 'Delaware',
    hasIncomeTax: true,
    standardDeduction: { single: 3250, marriedJoint: 6500 },
    personalExemption: { single: 110, marriedJoint: 220, dependent: 110 }, // Credit
    brackets: [
      { rate: 0.022, upTo: 5000 },
      { rate: 0.039, upTo: 10000 },
      { rate: 0.048, upTo: 20000 },
      { rate: 0.052, upTo: 25000 },
      { rate: 0.0555, upTo: 60000 },
      { rate: 0.066, upTo: Infinity }
    ]
  },
  'FL': {
    state: 'Florida',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'GA': {
    state: 'Georgia',
    hasIncomeTax: true,
    standardDeduction: { single: 12000, marriedJoint: 24000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 4000 },
    brackets: [
      { rate: 0.0539, upTo: Infinity }
    ]
  },
  'HI': {
    state: 'Hawaii',
    hasIncomeTax: true,
    standardDeduction: { single: 4400, marriedJoint: 8800 },
    personalExemption: { single: 1144, marriedJoint: 2288, dependent: 1144 },
    brackets: [
      { rate: 0.014, upTo: 9600 },
      { rate: 0.032, upTo: 14400 },
      { rate: 0.055, upTo: 19200 },
      { rate: 0.064, upTo: 24000 },
      { rate: 0.068, upTo: 36000 },
      { rate: 0.072, upTo: 48000 },
      { rate: 0.076, upTo: 125000 },
      { rate: 0.079, upTo: 175000 },
      { rate: 0.0825, upTo: 225000 },
      { rate: 0.09, upTo: 275000 },
      { rate: 0.10, upTo: 325000 },
      { rate: 0.11, upTo: Infinity }
    ]
  },
  'ID': {
    state: 'Idaho',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.05695, upTo: Infinity }
    ]
  },
  'IL': {
    state: 'Illinois',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 2850, marriedJoint: 5700, dependent: 2850 },
    brackets: [
      { rate: 0.0495, upTo: Infinity }
    ]
  },
  'IN': {
    state: 'Indiana',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 1000, marriedJoint: 2000, dependent: 1000 },
    brackets: [
      { rate: 0.03, upTo: Infinity }
    ]
  },
  'IA': {
    state: 'Iowa',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 40, marriedJoint: 80, dependent: 40 }, // Credit
    brackets: [
      { rate: 0.038, upTo: Infinity }
    ]
  },
  'KS': {
    state: 'Kansas',
    hasIncomeTax: true,
    standardDeduction: { single: 3605, marriedJoint: 8240 },
    personalExemption: { single: 9160, marriedJoint: 18320, dependent: 2320 },
    brackets: [
      { rate: 0.052, upTo: 23000 },
      { rate: 0.0558, upTo: Infinity }
    ]
  },
  'KY': {
    state: 'Kentucky',
    hasIncomeTax: true,
    standardDeduction: { single: 3270, marriedJoint: 6540 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.04, upTo: Infinity }
    ]
  },
  'LA': {
    state: 'Louisiana',
    hasIncomeTax: true,
    standardDeduction: { single: 12500, marriedJoint: 25000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.03, upTo: Infinity }
    ]
  },
  'ME': {
    state: 'Maine',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 5150, marriedJoint: 10300, dependent: 300 }, // Credit
    brackets: [
      { rate: 0.058, upTo: 26800 },
      { rate: 0.0675, upTo: 63450 },
      { rate: 0.0715, upTo: Infinity }
    ]
  },
  'MD': {
    state: 'Maryland',
    hasIncomeTax: true,
    standardDeduction: { single: 2700, marriedJoint: 5450 },
    personalExemption: { single: 3200, marriedJoint: 6400, dependent: 3200 },
    brackets: [
      { rate: 0.02, upTo: 1000 },
      { rate: 0.03, upTo: 2000 },
      { rate: 0.04, upTo: 3000 },
      { rate: 0.0475, upTo: 100000 },
      { rate: 0.05, upTo: 125000 },
      { rate: 0.0525, upTo: 150000 },
      { rate: 0.055, upTo: 250000 },
      { rate: 0.0575, upTo: Infinity }
    ]
  },
  'MA': {
    state: 'Massachusetts',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 4400, marriedJoint: 8800, dependent: 1000 },
    brackets: [
      { rate: 0.05, upTo: 1083150 },
      { rate: 0.09, upTo: Infinity }
    ]
  },
  'MI': {
    state: 'Michigan',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 5800, marriedJoint: 11600, dependent: 5800 },
    brackets: [
      { rate: 0.0425, upTo: Infinity }
    ]
  },
  'MN': {
    state: 'Minnesota',
    hasIncomeTax: true,
    standardDeduction: { single: 14950, marriedJoint: 29900 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 5200 },
    brackets: [
      { rate: 0.0535, upTo: 32570 },
      { rate: 0.068, upTo: 106990 },
      { rate: 0.0785, upTo: 198630 },
      { rate: 0.0985, upTo: Infinity }
    ]
  },
  'MS': {
    state: 'Mississippi',
    hasIncomeTax: true,
    standardDeduction: { single: 2300, marriedJoint: 4600 },
    personalExemption: { single: 6000, marriedJoint: 12000, dependent: 1500 },
    brackets: [
      { rate: 0.044, upTo: Infinity }
    ]
  },
  'MO': {
    state: 'Missouri',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.02, upTo: 2626 },
      { rate: 0.025, upTo: 3939 },
      { rate: 0.03, upTo: 5252 },
      { rate: 0.035, upTo: 6565 },
      { rate: 0.04, upTo: 7878 },
      { rate: 0.045, upTo: 9191 },
      { rate: 0.047, upTo: Infinity }
    ]
  },
  'MT': {
    state: 'Montana',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.047, upTo: 21100 },
      { rate: 0.059, upTo: Infinity }
    ]
  },
  'NE': {
    state: 'Nebraska',
    hasIncomeTax: true,
    standardDeduction: { single: 8600, marriedJoint: 17200 },
    personalExemption: { single: 171, marriedJoint: 342, dependent: 171 }, // Credit
    brackets: [
      { rate: 0.0246, upTo: 4030 },
      { rate: 0.0351, upTo: 24120 },
      { rate: 0.0501, upTo: 38870 },
      { rate: 0.052, upTo: Infinity }
    ]
  },
  'NV': {
    state: 'Nevada',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'NH': {
    state: 'New Hampshire',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'NJ': {
    state: 'New Jersey',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 1000, marriedJoint: 2000, dependent: 1500 },
    brackets: [
      { rate: 0.014, upTo: 20000 },
      { rate: 0.0175, upTo: 35000 },
      { rate: 0.035, upTo: 40000 },
      { rate: 0.05525, upTo: 75000 },
      { rate: 0.06370, upTo: 500000 },
      { rate: 0.08970, upTo: 1000000 },
      { rate: 0.10750, upTo: Infinity }
    ]
  },
  'NM': {
    state: 'New Mexico',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 4000 },
    brackets: [
      { rate: 0.015, upTo: 5500 },
      { rate: 0.032, upTo: 16500 },
      { rate: 0.043, upTo: 33500 },
      { rate: 0.047, upTo: 66500 },
      { rate: 0.049, upTo: 210000 },
      { rate: 0.059, upTo: Infinity }
    ]
  },
  'NY': {
    state: 'New York',
    hasIncomeTax: true,
    standardDeduction: { single: 8000, marriedJoint: 16050 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 1000 },
    brackets: [
      { rate: 0.04, upTo: 8500 },
      { rate: 0.045, upTo: 11700 },
      { rate: 0.0525, upTo: 13900 },
      { rate: 0.055, upTo: 80650 },
      { rate: 0.06, upTo: 215400 },
      { rate: 0.0685, upTo: 1077550 },
      { rate: 0.0965, upTo: 5000000 },
      { rate: 0.103, upTo: 25000000 },
      { rate: 0.109, upTo: Infinity }
    ]
  },
  'NC': {
    state: 'North Carolina',
    hasIncomeTax: true,
    standardDeduction: { single: 12750, marriedJoint: 25500 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.0425, upTo: Infinity }
    ]
  },
  'ND': {
    state: 'North Dakota',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.0195, upTo: 244825 },
      { rate: 0.025, upTo: Infinity }
    ]
  },
  'OH': {
    state: 'Ohio',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 2400, marriedJoint: 4800, dependent: 2400 },
    brackets: [
      { rate: 0.0275, upTo: 100000 },
      { rate: 0.035, upTo: Infinity }
    ]
  },
  'OK': {
    state: 'Oklahoma',
    hasIncomeTax: true,
    standardDeduction: { single: 6350, marriedJoint: 12700 },
    personalExemption: { single: 1000, marriedJoint: 2000, dependent: 1000 },
    brackets: [
      { rate: 0.0025, upTo: 1000 },
      { rate: 0.0075, upTo: 2500 },
      { rate: 0.0175, upTo: 3750 },
      { rate: 0.0275, upTo: 4900 },
      { rate: 0.0375, upTo: 7200 },
      { rate: 0.0475, upTo: Infinity }
    ]
  },
  'OR': {
    state: 'Oregon',
    hasIncomeTax: true,
    standardDeduction: { single: 2800, marriedJoint: 5600 },
    personalExemption: { single: 250, marriedJoint: 500, dependent: 250 }, // Credit
    brackets: [
      { rate: 0.0475, upTo: 4400 },
      { rate: 0.0675, upTo: 11050 },
      { rate: 0.0875, upTo: 125000 },
      { rate: 0.099, upTo: Infinity }
    ]
  },
  'PA': {
    state: 'Pennsylvania',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.0307, upTo: Infinity }
    ]
  },
  'RI': {
    state: 'Rhode Island',
    hasIncomeTax: true,
    standardDeduction: { single: 10900, marriedJoint: 21800 },
    personalExemption: { single: 5100, marriedJoint: 10200, dependent: 5100 },
    brackets: [
      { rate: 0.0375, upTo: 79900 },
      { rate: 0.0475, upTo: 181650 },
      { rate: 0.0599, upTo: Infinity }
    ]
  },
  'SC': {
    state: 'South Carolina',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 4790 },
    brackets: [
      { rate: 0.00, upTo: 3560 },
      { rate: 0.03, upTo: 17830 },
      { rate: 0.062, upTo: Infinity }
    ]
  },
  'SD': {
    state: 'South Dakota',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'TN': {
    state: 'Tennessee',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'TX': {
    state: 'Texas',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'UT': {
    state: 'Utah',
    hasIncomeTax: true,
    standardDeduction: { single: 900, marriedJoint: 1800 }, // Credit
    personalExemption: { single: 0, marriedJoint: 0, dependent: 2046 },
    brackets: [
      { rate: 0.0455, upTo: Infinity }
    ]
  },
  'VT': {
    state: 'Vermont',
    hasIncomeTax: true,
    standardDeduction: { single: 7400, marriedJoint: 14850 },
    personalExemption: { single: 5100, marriedJoint: 10200, dependent: 5100 },
    brackets: [
      { rate: 0.0335, upTo: 47900 },
      { rate: 0.066, upTo: 116000 },
      { rate: 0.076, upTo: 242000 },
      { rate: 0.0875, upTo: Infinity }
    ]
  },
  'VA': {
    state: 'Virginia',
    hasIncomeTax: true,
    standardDeduction: { single: 8500, marriedJoint: 17000 },
    personalExemption: { single: 930, marriedJoint: 1860, dependent: 930 },
    brackets: [
      { rate: 0.02, upTo: 3000 },
      { rate: 0.03, upTo: 5000 },
      { rate: 0.05, upTo: 17000 },
      { rate: 0.0575, upTo: Infinity }
    ]
  },
  'WA': {
    state: 'Washington',
    hasIncomeTax: false, // Only capital gains tax
    standardDeduction: { single: 270000, marriedJoint: 270000 }, // For capital gains
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'WV': {
    state: 'West Virginia',
    hasIncomeTax: true,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 2000, marriedJoint: 4000, dependent: 2000 },
    brackets: [
      { rate: 0.0222, upTo: 10000 },
      { rate: 0.0296, upTo: 25000 },
      { rate: 0.0333, upTo: 40000 },
      { rate: 0.0444, upTo: 60000 },
      { rate: 0.0482, upTo: Infinity }
    ]
  },
  'WI': {
    state: 'Wisconsin',
    hasIncomeTax: true,
    standardDeduction: { single: 13560, marriedJoint: 25110 },
    personalExemption: { single: 700, marriedJoint: 1400, dependent: 700 },
    brackets: [
      { rate: 0.035, upTo: 14680 },
      { rate: 0.044, upTo: 29370 },
      { rate: 0.053, upTo: 323290 },
      { rate: 0.0765, upTo: Infinity }
    ]
  },
  'WY': {
    state: 'Wyoming',
    hasIncomeTax: false,
    standardDeduction: { single: 0, marriedJoint: 0 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: []
  },
  'DC': {
    state: 'District of Columbia',
    hasIncomeTax: true,
    standardDeduction: { single: 15000, marriedJoint: 30000 },
    personalExemption: { single: 0, marriedJoint: 0, dependent: 0 },
    brackets: [
      { rate: 0.04, upTo: 10000 },
      { rate: 0.06, upTo: 40000 },
      { rate: 0.065, upTo: 60000 },
      { rate: 0.085, upTo: 250000 },
      { rate: 0.0925, upTo: 500000 },
      { rate: 0.0975, upTo: 1000000 },
      { rate: 0.1075, upTo: Infinity }
    ]
  }
};

// Helper function to calculate state tax
export function calculateStateTax(
  taxableIncome: number, 
  stateCode: string, 
  deductionType: 'standard' | 'itemized' = 'standard',
  itemizedAmount: number = 0
): { tax: number; taxableAfterDeductions: number } {
  const config = stateTaxConfigs[stateCode.toUpperCase()];
  
  if (!config || !config.hasIncomeTax) {
    return { tax: 0, taxableAfterDeductions: taxableIncome };
  }

  // Calculate deduction
  let deduction = 0;
  if (deductionType === 'standard') {
    deduction = config.standardDeduction.single;
  } else {
    deduction = itemizedAmount;
  }

  // Calculate taxable income after deductions
  const taxableAfterDeductions = Math.max(0, taxableIncome - deduction);

  // Calculate tax using brackets
  let tax = 0;
  let remainingIncome = taxableAfterDeductions;
  let previousThreshold = 0;

  for (const bracket of config.brackets) {
    const bracketWidth = bracket.upTo - previousThreshold;
    const taxableInThisBracket = Math.min(remainingIncome, bracketWidth);
    
    if (taxableInThisBracket <= 0) break;
    
    tax += taxableInThisBracket * bracket.rate;
    remainingIncome -= taxableInThisBracket;
    previousThreshold = bracket.upTo;
    
    if (remainingIncome <= 0) break;
  }

  return { tax, taxableAfterDeductions };
}

// Helper function to get standard deduction for a state
export function getStandardDeduction(stateCode: string): number {
  const config = stateTaxConfigs[stateCode.toUpperCase()];
  return config?.standardDeduction.single || 0;
}

// Helper function to check if state has income tax
export function hasIncomeTax(stateCode: string): boolean {
  const config = stateTaxConfigs[stateCode.toUpperCase()];
  return config?.hasIncomeTax || false;
}

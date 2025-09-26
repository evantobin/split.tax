// Nonresident filing requirements by state based on tax law data
export interface FilingRequirement {
  state: string;
  abbreviation: string;
  requiresReturn: boolean;
  requirement: string;
  description: string;
}

export const nonresidentFilingRequirements: Record<string, FilingRequirement> = {
  'AL': {
    state: 'Alabama',
    abbreviation: 'AL',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'AK': {
    state: 'Alaska',
    abbreviation: 'AK',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'AZ': {
    state: 'Arizona',
    abbreviation: 'AZ',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'AR': {
    state: 'Arkansas',
    abbreviation: 'AR',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'CA': {
    state: 'California',
    abbreviation: 'CA',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'CO': {
    state: 'Colorado',
    abbreviation: 'CO',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'CT': {
    state: 'Connecticut',
    abbreviation: 'CT',
    requiresReturn: true,
    requirement: 'Day and Income Threshold',
    description: 'Filing required if > 15 days and > $6,000'
  },
  'DE': {
    state: 'Delaware',
    abbreviation: 'DE',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'FL': {
    state: 'Florida',
    abbreviation: 'FL',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'GA': {
    state: 'Georgia',
    abbreviation: 'GA',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $5,000 or 5% of wages'
  },
  'HI': {
    state: 'Hawaii',
    abbreviation: 'HI',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'ID': {
    state: 'Idaho',
    abbreviation: 'ID',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income > $2,500'
  },
  'IL': {
    state: 'Illinois',
    abbreviation: 'IL',
    requiresReturn: true,
    requirement: 'Day Threshold',
    description: 'Filing required if > 30 days worked'
  },
  'IN': {
    state: 'Indiana',
    abbreviation: 'IN',
    requiresReturn: true,
    requirement: 'Day Threshold',
    description: 'Filing required if > 30 days worked'
  },
  'IA': {
    state: 'Iowa',
    abbreviation: 'IA',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $1,000'
  },
  'KS': {
    state: 'Kansas',
    abbreviation: 'KS',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'KY': {
    state: 'Kentucky',
    abbreviation: 'KY',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'LA': {
    state: 'Louisiana',
    abbreviation: 'LA',
    requiresReturn: true,
    requirement: 'Day Threshold with Mutuality',
    description: 'Filing required if > 25 days (with mutuality requirement)'
  },
  'ME': {
    state: 'Maine',
    abbreviation: 'ME',
    requiresReturn: true,
    requirement: 'Day and Income Threshold',
    description: 'Filing required if > 12 days and > $3,000'
  },
  'MD': {
    state: 'Maryland',
    abbreviation: 'MD',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'MA': {
    state: 'Massachusetts',
    abbreviation: 'MA',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'MI': {
    state: 'Michigan',
    abbreviation: 'MI',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'MN': {
    state: 'Minnesota',
    abbreviation: 'MN',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $14,950 (MN sources)'
  },
  'MS': {
    state: 'Mississippi',
    abbreviation: 'MS',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'MO': {
    state: 'Missouri',
    abbreviation: 'MO',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $600'
  },
  'MT': {
    state: 'Montana',
    abbreviation: 'MT',
    requiresReturn: true,
    requirement: 'Day Threshold',
    description: 'Filing required if > 30 days worked'
  },
  'NE': {
    state: 'Nebraska',
    abbreviation: 'NE',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'NV': {
    state: 'Nevada',
    abbreviation: 'NV',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'NH': {
    state: 'New Hampshire',
    abbreviation: 'NH',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'NJ': {
    state: 'New Jersey',
    abbreviation: 'NJ',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'NM': {
    state: 'New Mexico',
    abbreviation: 'NM',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'NY': {
    state: 'New York',
    abbreviation: 'NY',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'NC': {
    state: 'North Carolina',
    abbreviation: 'NC',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'ND': {
    state: 'North Dakota',
    abbreviation: 'ND',
    requiresReturn: true,
    requirement: 'Day Threshold with Mutuality',
    description: 'Filing required if > 20 days (with mutuality requirement)'
  },
  'OH': {
    state: 'Ohio',
    abbreviation: 'OH',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'OK': {
    state: 'Oklahoma',
    abbreviation: 'OK',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $1,000'
  },
  'OR': {
    state: 'Oregon',
    abbreviation: 'OR',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income > $2,800'
  },
  'PA': {
    state: 'Pennsylvania',
    abbreviation: 'PA',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'RI': {
    state: 'Rhode Island',
    abbreviation: 'RI',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'SC': {
    state: 'South Carolina',
    abbreviation: 'SC',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'SD': {
    state: 'South Dakota',
    abbreviation: 'SD',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'TN': {
    state: 'Tennessee',
    abbreviation: 'TN',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'TX': {
    state: 'Texas',
    abbreviation: 'TX',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'UT': {
    state: 'Utah',
    abbreviation: 'UT',
    requiresReturn: true,
    requirement: 'Day Threshold with Mutuality',
    description: 'Filing required if > 20 days (with mutuality requirement)'
  },
  'VT': {
    state: 'Vermont',
    abbreviation: 'VT',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income > $100'
  },
  'VA': {
    state: 'Virginia',
    abbreviation: 'VA',
    requiresReturn: true,
    requirement: 'Day One',
    description: 'Filing required from day one of earning income'
  },
  'WA': {
    state: 'Washington',
    abbreviation: 'WA',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'Taxes certain capital gains income only'
  },
  'WV': {
    state: 'West Virginia',
    abbreviation: 'WV',
    requiresReturn: true,
    requirement: 'Day Threshold with Mutuality',
    description: 'Filing required if > 30 days (with mutuality requirement)'
  },
  'WI': {
    state: 'Wisconsin',
    abbreviation: 'WI',
    requiresReturn: true,
    requirement: 'Income Threshold',
    description: 'Filing required if income ≥ $2,000'
  },
  'WY': {
    state: 'Wyoming',
    abbreviation: 'WY',
    requiresReturn: false,
    requirement: 'No Income Tax',
    description: 'No individual income tax'
  },
  'DC': {
    state: 'District of Columbia',
    abbreviation: 'DC',
    requiresReturn: false,
    requirement: 'No Nonresident Tax',
    description: 'Individual income tax does not apply to nonresidents'
  }
};

// Helper function to get filing requirement for a state
export const getFilingRequirement = (state: string): FilingRequirement | null => {
  return nonresidentFilingRequirements[state] || null;
};

// Helper function to check if filing is required based on conditions
export const isFilingRequired = (
  state: string, 
  income: number = 0, 
  daysWorked: number = 0
): boolean => {
  const requirement = getFilingRequirement(state);
  if (!requirement) return false;
  
  if (!requirement.requiresReturn) return false;
  
  switch (requirement.requirement) {
    case 'Day One':
      return income > 0 || daysWorked > 0;
    
    case 'Income Threshold':
      if (state === 'GA') return income >= 5000; // $5,000 or 5% of wages
      if (state === 'ID') return income > 2500;
      if (state === 'IA') return income >= 1000;
      if (state === 'MN') return income >= 14950;
      if (state === 'MO') return income >= 600;
      if (state === 'OK') return income >= 1000;
      if (state === 'OR') return income > 2800;
      if (state === 'VT') return income > 100;
      if (state === 'WI') return income >= 2000;
      return false;
    
    case 'Day Threshold':
      if (state === 'IL' || state === 'IN' || state === 'MT') {
        return daysWorked > 30;
      }
      return false;
    
    case 'Day and Income Threshold':
      if (state === 'CT') return daysWorked > 15 && income > 6000;
      if (state === 'ME') return daysWorked > 12 && income > 3000;
      return false;
    
    case 'Day Threshold with Mutuality':
      if (state === 'LA') return daysWorked > 25;
      if (state === 'ND' || state === 'UT') return daysWorked > 20;
      if (state === 'WV') return daysWorked > 30;
      return false;
    
    default:
      return false;
  }
};

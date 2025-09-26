import { stateTaxConfigs } from './stateTaxData';

export interface StateOption {
  code: string;
  name: string;
  hasIncomeTax: boolean;
}

export const stateOptions: StateOption[] = Object.entries(stateTaxConfigs).map(([code, config]) => ({
  code,
  name: config.state,
  hasIncomeTax: config.hasIncomeTax
})).sort((a, b) => a.name.localeCompare(b.name));

// Create a search function that matches both codes and names
export function searchStates(query: string): StateOption[] {
  if (!query) return stateOptions;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return stateOptions.filter(state => 
    state.code.toLowerCase().includes(normalizedQuery) ||
    state.name.toLowerCase().includes(normalizedQuery)
  );
}

// Get state code from input (handles both codes and names)
export function getStateCode(input: string): string {
  const normalizedInput = input.trim().toUpperCase();
  
  // Check if it's already a valid state code
  if (stateTaxConfigs[normalizedInput]) {
    return normalizedInput;
  }
  
  // Search by full name
  const matchedState = stateOptions.find(state => 
    state.name.toLowerCase() === input.toLowerCase().trim()
  );
  
  return matchedState?.code || input.toUpperCase();
}

// Get full state name from code
export function getStateName(code: string): string {
  const config = stateTaxConfigs[code.toUpperCase()];
  return config?.state || code;
}

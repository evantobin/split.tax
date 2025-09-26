import { create } from 'zustand';
import type { FormData, TaxSettings, CollapsedSections, Message, ResultData } from './types';
import { LOCAL_STORAGE_KEY, exampleData, defaultTaxSettings, getTaxSettingsForState } from './config';
import { calculateAllocation } from './utils';

interface AppState {
  // Core app state
  formData: FormData;
  results: ResultData[] | null;
  message: Message;
  notifications: Message[];
  isLoading: boolean;
  
  // UI state
  collapsed: CollapsedSections;
  isDarkMode: boolean;
  
  // Modal state
  showSettings: boolean;
  showHowToUse: boolean;
  showImportWizard: boolean;
  showTermsOfService: boolean;
  showPrivacyPolicy: boolean;
  wizardStep: number;
  
  // Tax settings
  mnSettings: TaxSettings;
  
  // Google API state
  isSignedIn: boolean;
  tokenClient: any;
  newState: string;
  
  // Actions
  setFormData: (setter: (draft: FormData) => void) => void;
  setResults: (results: ResultData[] | null) => void;
  setMessage: (message: Message) => void;
  addNotification: (message: Message) => void;
  dismissNotification: (index: number) => void;
  setIsLoading: (loading: boolean) => void;
  
  // UI actions
  toggleSection: (key: keyof CollapsedSections) => void;
  toggleDarkMode: () => void;
  
  // Modal actions
  setShowSettings: (show: boolean) => void;
  setShowHowToUse: (show: boolean) => void;
  setShowImportWizard: (show: boolean) => void;
  setWizardStep: (step: number) => void;
  
  // Tax settings actions
  setMnSettings: (settings: TaxSettings) => void;
  
  // Google API actions
  setIsSignedIn: (signedIn: boolean) => void;
  setTokenClient: (client: any) => void;
  setNewState: (state: string) => void;
  
  // Complex actions
  handleCalculate: () => void;
  handleClear: () => void;
  handleToastOnly: (message: Message) => void;
  
  // Initialization
  initialize: () => void;
}

// Helper function to load initial form data
const loadInitialFormData = (): FormData => {
  try {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const data = savedData ? JSON.parse(savedData) : exampleData;
    return {
      ...data,
      payPeriods: Array.isArray(data.payPeriods) ? data.payPeriods : [],
      bonuses: Array.isArray(data.bonuses) ? data.bonuses : [],
      daysInOtherStates: typeof data.daysInOtherStates === 'object' && data.daysInOtherStates !== null ? data.daysInOtherStates : {},
    };
  } catch (e) {
    console.error("Failed to load from local storage", e);
    return exampleData;
  }
};

// Helper function to load initial dark mode preference
const loadInitialDarkMode = (): boolean => {
  try {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  formData: loadInitialFormData(),
  results: null,
  message: { text: '', type: 'info' },
  notifications: [],
  isLoading: false,
  
  // UI state
  collapsed: {
    global: false,
    otherStates: true,
    bonuses: true,
    payPeriods: false
  },
  isDarkMode: loadInitialDarkMode(),
  
  // Modal state
  showSettings: false,
  showHowToUse: false,
  showImportWizard: false,
  wizardStep: 1,
  
  // Tax settings
  mnSettings: defaultTaxSettings,
  
  // Google API state
  isSignedIn: false,
  tokenClient: null,
  newState: '',
  
  // Basic setters
  setFormData: (setter) => {
    const currentFormData = get().formData;
    const draft = JSON.parse(JSON.stringify(currentFormData));
    setter(draft);
    const newFormData = {
      primaryState: draft.primaryState || '',
      visitingDates: draft.visitingDates || { start: '', end: '' },
      payPeriods: Array.isArray(draft.payPeriods) ? draft.payPeriods : [],
      bonuses: Array.isArray(draft.bonuses) ? draft.bonuses : [],
      daysInOtherStates: typeof draft.daysInOtherStates === 'object' && draft.daysInOtherStates !== null ? draft.daysInOtherStates : {},
    };
    
    set({ formData: newFormData });
    
    // Save to localStorage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFormData));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
    
    // Update tax settings if primary state changed
    if (newFormData.primaryState !== currentFormData.primaryState) {
      const newSettings = getTaxSettingsForState(newFormData.primaryState);
      set({ mnSettings: newSettings });
    }
  },
  
  setResults: (results) => set({ results }),
  setMessage: (message) => set({ message }),
  
  addNotification: (message) => {
    if (message.text) {
      set((state) => ({
        notifications: [...state.notifications, { ...message, text: message.text }]
      }));
    }
  },
  
  dismissNotification: (index) => {
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index)
    }));
  },
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // UI actions
  toggleSection: (key) => {
    set((state) => ({
      collapsed: { ...state.collapsed, [key]: !state.collapsed[key] }
    }));
  },
  
  toggleDarkMode: () => {
    const newDarkMode = !get().isDarkMode;
    
    // Add transition class
    document.documentElement.classList.add('dark-mode-transitioning');
    
    set({ isDarkMode: newDarkMode });
    
    // Update DOM and localStorage
    try {
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error("Failed to save dark mode preference", e);
    }
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('dark-mode-transitioning');
    }, 300);
  },
  
  // Modal actions
  setShowSettings: (show) => set({ showSettings: show }),
  setShowHowToUse: (show) => set({ showHowToUse: show }),
  setShowImportWizard: (show) => set({ showImportWizard: show }),
  setWizardStep: (step) => set({ wizardStep: step }),
  
  // Tax settings actions
  setMnSettings: (settings) => set({ mnSettings: settings }),
  
  // Google API actions
  setIsSignedIn: (signedIn) => set({ isSignedIn: signedIn }),
  setTokenClient: (client) => set({ tokenClient: client }),
  setNewState: (newState) => set({ newState }),
  
  // Complex actions
  handleCalculate: () => {
    const { formData } = get();
    set({ results: null, message: { text: '', type: 'info' }, isLoading: true });
    
    setTimeout(() => {
      try {
        const { payPeriods = [], primaryState = '', visitingDates = { start: '', end: '' }, daysInOtherStates = {}, bonuses = [] } = formData || {};
        
        if (!primaryState || !visitingDates?.start || !visitingDates?.end) {
          throw new Error("Please fill out all fields in the Global Settings section.");
        }
        
        const allResults = payPeriods.map(period => ({
          period,
          result: calculateAllocation(period, primaryState, visitingDates, daysInOtherStates, bonuses)
        }));
        
        set({ results: allResults, isLoading: false });
      } catch (error: any) {
        set({ 
          message: { text: `Calculation Error: ${error.message}`, type: 'error' },
          isLoading: false 
        });
      }
    }, 500);
  },
  
  handleClear: () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ 
        formData: exampleData,
        results: null,
        message: { text: 'Form has been cleared and reset.', type: 'info' }
      });
    }
  },
  
  handleToastOnly: (message) => {
    get().addNotification(message);
  },
  
  // Initialization
  initialize: () => {
    const { isDarkMode, formData } = get();
    
    // Set up dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Set up tax settings based on primary state
    if (formData.primaryState) {
      const newSettings = getTaxSettingsForState(formData.primaryState);
      set({ mnSettings: newSettings });
    }
  }
}));

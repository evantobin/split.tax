import React, { useState, useRef, useEffect } from 'react';
import { searchStates, getStateCode, getStateName } from '../stateMapping';
import type { StateOption } from '../stateMapping';
import { ChevronDownIcon } from './Icons';

interface StateSelectorProps {
  value: string;
  onChange: (stateCode: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  value,
  onChange,
  placeholder = "Type state name or code...",
  label,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredStates, setFilteredStates] = useState<StateOption[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update input value when prop value changes
  useEffect(() => {
    if (value) {
      const stateName = getStateName(value);
      setInputValue(stateName !== value ? `${stateName} (${value})` : value);
    } else {
      setInputValue('');
    }
  }, [value]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    
    if (query.trim()) {
      const matches = searchStates(query).slice(0, 10); // Limit to 10 results
      setFilteredStates(matches);
      setIsOpen(true);
    } else {
      setFilteredStates([]);
      setIsOpen(false);
    }
  };

  // Handle state selection
  const handleStateSelect = (state: StateOption) => {
    onChange(state.code);
    setInputValue(`${state.name} (${state.code})`);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle input blur - try to parse the input
  const handleBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        
        // Try to parse the current input
        if (inputValue.trim()) {
          const stateCode = getStateCode(inputValue);
          if (stateCode !== inputValue.toUpperCase()) {
            onChange(stateCode);
          }
        }
      }
    }, 150);
  };

  // Handle focus
  const handleFocus = () => {
    if (inputValue && !isOpen) {
      const matches = searchStates(inputValue).slice(0, 10);
      setFilteredStates(matches);
      setIsOpen(matches.length > 0);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="form-input pr-8 focus:ring-slate-500 focus:border-slate-500"
          autoComplete="off"
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon />
        </div>
      </div>

      {isOpen && filteredStates.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredStates.map((state) => (
            <button
              key={state.code}
              onClick={() => handleStateSelect(state)}
              className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-600 focus:bg-slate-50 dark:focus:bg-slate-600 focus:outline-none flex justify-between items-center border-b border-slate-100 dark:border-slate-600 last:border-b-0"
            >
              <div>
                <span className="font-medium text-slate-900 dark:text-slate-100">{state.name}</span>
                <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">({state.code})</span>
              </div>
              {!state.hasIncomeTax && (
                <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                  No Income Tax
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

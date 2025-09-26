import React from 'react';
import { SplitTaxLogo, CalculatorIcon, QuestionIcon, RefreshIcon, MoonIcon, SunIcon } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onCalculate: () => void;
  onShowHelp: () => void;
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onCalculate,
  onShowHelp,
  onClear
}) => {
  return (
    <div className="nav-header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <SplitTaxLogo />
          <div className="flex items-center gap-3">
            <button 
              onClick={onCalculate}
              className="btn-primary"
            >
              <CalculatorIcon />
              Calculate
            </button>
            <button 
              onClick={onShowHelp}
              className="btn-ghost btn-sm"
            >
              <QuestionIcon />
              Help
            </button>
            <button 
              onClick={onToggleDarkMode}
              className="btn-secondary btn-sm"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button 
              onClick={onClear}
              className="btn-ghost btn-sm"
            >
              <RefreshIcon />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

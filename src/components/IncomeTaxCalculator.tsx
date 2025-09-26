import React, { useState } from 'react';
import { calculateIncomeTax, formatCurrency } from '../utils';
import type { IncomeTaxCalculation } from '../types';

export const IncomeTaxCalculator: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');
  const [calculation, setCalculation] = useState<IncomeTaxCalculation | null>(null);

  const handleCalculate = () => {
    const income = parseFloat(grossIncome);
    if (isNaN(income) || income < 0) {
      return;
    }
    
    const result = calculateIncomeTax(income, filingStatus);
    setCalculation(result);
  };

  const handleClear = () => {
    setGrossIncome('');
    setCalculation(null);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Federal Income Tax Calculator
        </h2>
        
        <div className="space-y-4">
          {/* Gross Income Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Annual Gross Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
                $
              </span>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="Enter your annual gross income"
                className="w-full pl-8 pr-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* Filing Status Selector */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Filing Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="single"
                  checked={filingStatus === 'single'}
                  onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-zinc-700 dark:text-zinc-300">Single</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="married"
                  checked={filingStatus === 'married'}
                  onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married')}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-zinc-700 dark:text-zinc-300">Married Filing Jointly</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleCalculate}
              disabled={!grossIncome || parseFloat(grossIncome) <= 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Tax
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        {calculation && (
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-600">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
              Tax Calculation Result
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Gross Income:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(calculation.grossIncome)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Filing Status:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                    {calculation.filingStatus === 'married' ? 'Married Filing Jointly' : 'Single'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Standard Deduction:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(calculation.standardDeduction)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Taxable Income:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(calculation.taxableIncome)}
                  </span>
                </div>
                
                <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-600 pt-3">
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Estimated Tax Owed:
                  </span>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(calculation.estimatedTax)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This is an estimate for the 2024 tax year using standard deduction only. 
                Actual taxes may vary based on other deductions, credits, and specific circumstances.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

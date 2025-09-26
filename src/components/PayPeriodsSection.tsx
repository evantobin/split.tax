import React from 'react';
import type { FormData, Message } from '../types';
import { PayPeriodCalendar } from './PayPeriodCalendar';

interface PayPeriodsSectionProps {
  formData: FormData;
  collapsed: boolean;
  preview: string;
  onToggle: () => void;
  onFormChange: (setter: (draft: FormData) => void) => void;
  onSetMessage: (message: Message) => void;
}

export const PayPeriodsSection: React.FC<PayPeriodsSectionProps> = ({
  formData,
  collapsed,
  preview,
  onToggle,
  onFormChange,
  onSetMessage
}) => {
  const generateBiweeklyPeriods = () => {
    const { visitingDates = { start: '', end: '' } } = formData;
    if (!visitingDates.start || !visitingDates.end) {
      onSetMessage({ text: 'Please fill out visiting dates in Global Settings before auto-generating pay periods.', type: 'error' });
      return;
    }
    
    const start = new Date(visitingDates.start);
    const end = new Date(visitingDates.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      onSetMessage({ text: 'Invalid visiting date range.', type: 'error' });
      return;
    }
    
    const payPeriods: typeof formData.payPeriods = [];
    let current = new Date(start);
    let periodId = 1;
    
    while (current <= end) {
      const periodEnd = new Date(current);
      periodEnd.setDate(periodEnd.getDate() + 13);
      
      if (periodEnd > end) {
        periodEnd.setTime(end.getTime());
      }
      
      payPeriods.push({
        id: `biweekly_${periodId}`,
        netPay: '',
        payPeriodStart: current.toISOString().slice(0, 10),
        payPeriodEnd: periodEnd.toISOString().slice(0, 10)
      });
      
      current = new Date(periodEnd);
      current.setDate(current.getDate() + 1);
      periodId++;
    }
    
    onFormChange(draft => { draft.payPeriods = payPeriods; });
    onSetMessage({ text: `Generated ${payPeriods.length} biweekly pay periods.`, type: 'success' });
  };

  const generateSemiMonthlyPeriods = () => {
    const { visitingDates = { start: '', end: '' } } = formData;
    if (!visitingDates.start || !visitingDates.end) {
      onSetMessage({ text: 'Please fill out visiting dates in Global Settings before auto-generating pay periods.', type: 'error' });
      return;
    }
    
    const start = new Date(visitingDates.start);
    const end = new Date(visitingDates.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      onSetMessage({ text: 'Invalid visiting date range.', type: 'error' });
      return;
    }
    
    const payPeriods: typeof formData.payPeriods = [];
    
    // Start from the month containing the start date
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    
    // Process each month from start to end
    for (let year = startYear; year <= endYear; year++) {
      const monthStart = (year === startYear) ? startMonth : 0;
      const monthEnd = (year === endYear) ? endMonth : 11;
      
      for (let month = monthStart; month <= monthEnd; month++) {
        // Create the two periods for this month
        // Period 1: 1st to 15th
        const period1Start = new Date(year, month, 1);
        const period1End = new Date(year, month, 15);
        
        // Period 2: 16th to last day of month  
        const period2Start = new Date(year, month, 16);
        const period2End = new Date(year, month + 1, 0); // Last day of current month
        
        // Add period 1 if it overlaps with visiting dates
        if (period1Start <= end && period1End >= start) {
          payPeriods.push({
            id: `semi_monthly_1_${year}_${month + 1}`,
            netPay: '',
            payPeriodStart: period1Start.toISOString().slice(0, 10),
            payPeriodEnd: period1End.toISOString().slice(0, 10)
          });
        }
        
        // Add period 2 if it overlaps with visiting dates
        if (period2Start <= end && period2End >= start) {
          payPeriods.push({
            id: `semi_monthly_2_${year}_${month + 1}`,
            netPay: '',
            payPeriodStart: period2Start.toISOString().slice(0, 10),
            payPeriodEnd: period2End.toISOString().slice(0, 10)
          });
        }
      }
    }
    
    onFormChange(draft => { draft.payPeriods = payPeriods; });
    
    onSetMessage({ text: `Generated ${payPeriods.length} semi-monthly pay periods (1st-15th, 16th-last day).`, type: 'success' });
  };

  return (
    <div>
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Pay Periods</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {collapsed ? preview : ''}
          </span>
          <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
            {collapsed ? '▶' : '▼'}
          </button>
        </div>
      </div>
      
      {!collapsed && (
        <div className="mt-4">
          <PayPeriodCalendar />
          
          <div className="mt-6 pt-4 border-t dark:border-zinc-600">
            <p className="form-description mb-2">Auto-generate pay periods:</p>
            <div className="flex gap-2">
              <button 
                onClick={generateBiweeklyPeriods}
                className="btn-secondary btn-sm flex-1"
              >
                Biweekly
              </button>
              
              <button 
                onClick={generateSemiMonthlyPeriods}
                className="btn-secondary btn-sm flex-1"
              >
                15th/Last Day
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

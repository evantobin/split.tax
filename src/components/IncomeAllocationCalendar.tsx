import React, { useState } from 'react';
import type { ResultData, FormData } from '../types';
import { formatCurrency } from '../utils';

interface IncomeAllocationCalendarProps {
  results: ResultData[];
  formData: FormData;
}

interface DayAllocation {
  date: Date;
  state: string;
  regularIncome: number;
  bonusIncome: number;
  totalIncome: number;
  isPrimary: boolean;
}

interface CalendarMonth {
  year: number;
  month: number;
  days: (DayAllocation | null)[];
}

const STATE_COLORS = {
  primary: 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-600',
  other: 'bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-600',
  bonus: 'bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-600'
};

export const IncomeAllocationCalendar: React.FC<IncomeAllocationCalendarProps> = ({
  results,
  formData
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Helper function to check if a date is a weekday
  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
  };

  // Generate daily allocations from results
  const generateDailyAllocations = (): DayAllocation[] => {
    const dailyAllocations: DayAllocation[] = [];
    const primaryState = formData.primaryState;
    
    // Create a map of other state days
    const otherStateDaysMap = new Map<string, string>();
    for (const state in formData.daysInOtherStates) {
      for (const dateStr of formData.daysInOtherStates[state]) {
        if (dateStr) {
          otherStateDaysMap.set(dateStr, state);
        }
      }
    }

    // Process each pay period
    results.forEach(({ period, result }) => {
      const ppStart = new Date(period.payPeriodStart + 'T00:00:00');
      const ppEnd = new Date(period.payPeriodEnd + 'T00:00:00');
      const primaryVisitStart = new Date(formData.visitingDates.start + 'T00:00:00');
      const primaryVisitEnd = new Date(formData.visitingDates.end + 'T00:00:00');
      
      // Calculate total working days for this period
      let totalWorkingDays = 0;
      for (let d = new Date(ppStart); d <= ppEnd; d.setDate(d.getDate() + 1)) {
        if (isWeekday(d)) {
          const dateStr = d.toISOString().split('T')[0];
          if (otherStateDaysMap.has(dateStr) || (d >= primaryVisitStart && d <= primaryVisitEnd)) {
            totalWorkingDays++;
          }
        }
      }
      
      const dailyRegularRate = totalWorkingDays > 0 ? parseFloat(String(period.netPay || 0)) / totalWorkingDays : 0;
      
      // Process each day in the pay period
      for (let d = new Date(ppStart); d <= ppEnd; d.setDate(d.getDate() + 1)) {
        if (!isWeekday(d)) continue;
        
        const dateStr = d.toISOString().split('T')[0];
        let dayState = '';
        let regularIncome = 0;
        let bonusIncome = 0;
        
        // Determine which state this day belongs to
        if (otherStateDaysMap.has(dateStr)) {
          dayState = otherStateDaysMap.get(dateStr)!;
        } else if (d >= primaryVisitStart && d <= primaryVisitEnd) {
          dayState = primaryState;
        } else {
          continue; // Not a working day
        }
        
        // Calculate regular income for this day
        regularIncome = dailyRegularRate;
        
        // Add any bonuses for this specific date
        formData.bonuses.forEach(bonus => {
          if (bonus.date === dateStr && bonus.state === dayState) {
            bonusIncome += parseFloat(String(bonus.amount || 0));
          }
        });
        
        dailyAllocations.push({
          date: new Date(d),
          state: dayState,
          regularIncome,
          bonusIncome,
          totalIncome: regularIncome + bonusIncome,
          isPrimary: dayState === primaryState
        });
      }
    });

    return dailyAllocations.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Group daily allocations into months
  const groupIntoMonths = (dailyAllocations: DayAllocation[]): CalendarMonth[] => {
    if (dailyAllocations.length === 0) return [];
    
    const months: CalendarMonth[] = [];
    let currentMonth: CalendarMonth | null = null;
    
    dailyAllocations.forEach(allocation => {
      const year = allocation.date.getFullYear();
      const month = allocation.date.getMonth();
      
      // Check if we need to create a new month
      if (!currentMonth || currentMonth.year !== year || currentMonth.month !== month) {
        // Add the previous month to the array if it exists
        if (currentMonth) {
          months.push(currentMonth);
        }
        
        // Create a new month
        currentMonth = {
          year,
          month,
          days: []
        };
        
        // Fill the calendar grid (weekdays only)
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Initialize calendar grid (5 weekdays per week, up to 6 weeks)
        for (let week = 0; week < 6; week++) {
          for (let weekday = 1; weekday <= 5; weekday++) { // Monday to Friday
            currentMonth.days.push(null);
          }
        }
      }
      
      // Place the allocation in the correct position in the grid
      const dayOfMonth = allocation.date.getDate();
      const firstDayOfMonth = new Date(allocation.date.getFullYear(), allocation.date.getMonth(), 1);
      const firstWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // Convert Sunday to 7
      const weekdayOfMonth = allocation.date.getDay() === 0 ? 7 : allocation.date.getDay(); // Convert Sunday to 7
      
      // Only place weekdays (Monday = 1, Friday = 5)
      if (weekdayOfMonth >= 1 && weekdayOfMonth <= 5) {
        const weeksFromFirst = Math.floor((dayOfMonth - 1 + firstWeekday - 1) / 7);
        const position = weeksFromFirst * 5 + (weekdayOfMonth - 1); // weekdayOfMonth 1-5 becomes 0-4
        
        if (position >= 0 && position < currentMonth.days.length) {
          currentMonth.days[position] = allocation;
        }
      }
    });
    
    // Add the last month if it exists
    if (currentMonth) {
      months.push(currentMonth);
    }
    
    return months;
  };

  const dailyAllocations = generateDailyAllocations();
  const months = groupIntoMonths(dailyAllocations);
  
  if (months.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        No income allocation data to display.
      </div>
    );
  }

  const currentMonth = months[currentMonthIndex] || months[0];

  // Navigation functions
  const canNavigatePrevious = currentMonthIndex > 0;
  const canNavigateNext = currentMonthIndex < months.length - 1;

  const navigateToPrevious = () => {
    if (canNavigatePrevious) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const navigateToNext = () => {
    if (canNavigateNext) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const getStateColor = (allocation: DayAllocation): string => {
    if (allocation.bonusIncome > 0) return STATE_COLORS.bonus;
    return allocation.isPrimary ? STATE_COLORS.primary : STATE_COLORS.other;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Income Allocation Calendar
        </h3>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing weekdays only
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={navigateToPrevious}
          disabled={!canNavigatePrevious}
          className={`p-2 rounded-md transition-colors ${
            canNavigatePrevious
              ? 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          ← Prev
        </button>
        
        <h4 className="text-md font-medium text-zinc-900 dark:text-white">
          {new Date(currentMonth.year, currentMonth.month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h4>
        
        <button
          onClick={navigateToNext}
          disabled={!canNavigateNext}
          className={`p-2 rounded-md transition-colors ${
            canNavigateNext
              ? 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded border ${STATE_COLORS.primary}`}></div>
          <span>Primary State ({formData.primaryState})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded border ${STATE_COLORS.other}`}></div>
          <span>Other States</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded border ${STATE_COLORS.bonus}`}></div>
          <span>Bonus Income</span>
        </div>
      </div>

      {/* Week headers */}
      <div className="grid grid-cols-5 gap-1 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid (6 weeks x 5 weekdays) */}
      <div className="grid grid-cols-5 gap-1">
        {currentMonth.days.map((allocation, index) => {
          const weekIndex = Math.floor(index / 5);
          const dayIndex = index % 5;
          
          if (!allocation) {
            return (
              <div 
                key={`${weekIndex}-${dayIndex}`} 
                className="h-16 border border-transparent"
              ></div>
            );
          }

          return (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`
                h-16 border rounded p-1 text-xs
                ${getStateColor(allocation)}
                transition-all duration-150
              `}
            >
              <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                {allocation.date.getDate()}
              </div>
              <div className="text-zinc-700 dark:text-zinc-300 font-medium text-[10px]">
                {allocation.state}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 text-[9px] leading-tight">
                {allocation.totalIncome > 0 && formatCurrency(allocation.totalIncome)}
              </div>
              {allocation.bonusIncome > 0 && (
                <div className="text-purple-700 dark:text-purple-300 text-[8px]">
                  +{formatCurrency(allocation.bonusIncome)} bonus
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Monthly summary */}
      <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
        <h5 className="text-sm font-medium text-zinc-900 dark:text-white mb-2">
          Monthly Summary
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {(() => {
            const monthlyTotals: Record<string, { regular: number; bonus: number; days: number }> = {};
            
            currentMonth.days.forEach(allocation => {
              if (allocation) {
                if (!monthlyTotals[allocation.state]) {
                  monthlyTotals[allocation.state] = { regular: 0, bonus: 0, days: 0 };
                }
                monthlyTotals[allocation.state].regular += allocation.regularIncome;
                monthlyTotals[allocation.state].bonus += allocation.bonusIncome;
                monthlyTotals[allocation.state].days += 1;
              }
            });

            return Object.entries(monthlyTotals)
              .sort(([a], [b]) => {
                if (a === formData.primaryState) return -1;
                if (b === formData.primaryState) return 1;
                return a.localeCompare(b);
              })
              .map(([state, totals]) => (
                <div key={state} className="text-zinc-700 dark:text-zinc-300">
                  <div className="font-medium">{state}</div>
                  <div>{formatCurrency(totals.regular + totals.bonus)}</div>
                  <div className="text-zinc-500 dark:text-zinc-400">{totals.days} days</div>
                </div>
              ));
          })()}
        </div>
      </div>
    </div>
  );
};

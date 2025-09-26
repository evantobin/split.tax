import React from 'react';
import type { ResultData, TaxSettings, Message, FormData } from '../types';
import { formatCurrency } from '../utils';
import { calculateStateTax, getStandardDeduction, hasIncomeTax } from '../stateTaxData';
import { CloudDownloadIcon } from './Icons';
import { IncomeAllocationCalendar } from './IncomeAllocationCalendar';

interface ResultsPanelProps {
  results: ResultData[] | null;
  mnSettings: TaxSettings;
  isLoading: boolean;
  message: Message;
  formData: FormData;
}

const generatePDF = (results: ResultData[] | null, mnSettings: TaxSettings, formData: FormData) => {
  if (!results || results.length === 0) return;

  // Aggregate per-state totals
  const stateTotals: Record<string, { total: number; days: number }> = {};
  let primaryState = '';
  
  results.forEach(({ result }) => {
    primaryState = result.primaryState;
    for (const state in result.allocations) {
      if (!stateTotals[state]) {
        stateTotals[state] = { total: 0, days: 0 };
      }
      stateTotals[state].total += result.allocations[state].total;
      stateTotals[state].days += result.allocations[state].days;
    }
  });

  // Generate daily allocations for calendar
  const generateDailyAllocations = () => {
    const dailyAllocations: Array<{date: Date; state: string; income: number; isPrimary: boolean}> = [];
    const otherStateDaysMap = new Map<string, string>();
    
    for (const state in formData.daysInOtherStates) {
      for (const dateStr of formData.daysInOtherStates[state]) {
        if (dateStr) {
          otherStateDaysMap.set(dateStr, state);
        }
      }
    }

    results.forEach(({ period }) => {
      const ppStart = new Date(period.payPeriodStart + 'T00:00:00');
      const ppEnd = new Date(period.payPeriodEnd + 'T00:00:00');
      const primaryVisitStart = new Date(formData.visitingDates.start + 'T00:00:00');
      const primaryVisitEnd = new Date(formData.visitingDates.end + 'T00:00:00');
      
      let totalWorkingDays = 0;
      for (let d = new Date(ppStart); d <= ppEnd; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // weekdays only
          const dateStr = d.toISOString().split('T')[0];
          if (otherStateDaysMap.has(dateStr) || (d >= primaryVisitStart && d <= primaryVisitEnd)) {
            totalWorkingDays++;
          }
        }
      }
      
      const dailyRegularRate = totalWorkingDays > 0 ? parseFloat(String(period.netPay || 0)) / totalWorkingDays : 0;
      
      for (let d = new Date(ppStart); d <= ppEnd; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue; // skip weekends
        
        const dateStr = d.toISOString().split('T')[0];
        let dayState = '';
        let income = 0;
        
        if (otherStateDaysMap.has(dateStr)) {
          dayState = otherStateDaysMap.get(dateStr)!;
        } else if (d >= primaryVisitStart && d <= primaryVisitEnd) {
          dayState = primaryState;
        } else {
          continue;
        }
        
        income = dailyRegularRate;
        
        // Add bonuses for this date (bonuses go to whatever state person was working in)
        formData.bonuses.forEach(bonus => {
          if (bonus.date === dateStr) {
            income += parseFloat(String(bonus.amount || 0));
          }
        });
        
        dailyAllocations.push({
          date: new Date(d),
          state: dayState,
          income,
          isPrimary: dayState === primaryState
        });
      }
    });

    return dailyAllocations.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const dailyAllocations = generateDailyAllocations();
  
  const stateKeys = Object.keys(stateTotals)
    .filter(state => stateTotals[state].total > 0 || stateTotals[state].days > 0)
    .sort((a, b) => {
      const diff = stateTotals[b].total - stateTotals[a].total;
      if (diff !== 0) return diff;
      if (a === primaryState) return -1;
      if (b === primaryState) return 1;
      return a.localeCompare(b);
    });

  let primaryStateTax = null;
  if (stateTotals[primaryState] && hasIncomeTax(primaryState)) {
    const { tax } = calculateStateTax(
      stateTotals[primaryState].total, 
      primaryState, 
      mnSettings.deductionType,
      Number(mnSettings.itemizedDeduction || 0)
    );
    primaryStateTax = tax;
  }

  // Generate calendar HTML for PDF
  const generateCalendarHTML = () => {
    if (dailyAllocations.length === 0) return '';

    type DayAllocation = {date: Date; state: string; income: number; isPrimary: boolean};

    // Group allocations by month
    const monthGroups: Record<string, DayAllocation[]> = {};
    dailyAllocations.forEach(allocation => {
      const monthKey = `${allocation.date.getFullYear()}-${allocation.date.getMonth()}`;
      if (!monthGroups[monthKey]) {
        monthGroups[monthKey] = [];
      }
      monthGroups[monthKey].push(allocation);
    });

    return Object.entries(monthGroups).map(([_monthKey, allocations]) => {
      const firstDate = allocations[0].date;
      const monthName = firstDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      let calendarHTML = `
        <div class="calendar-month" style="margin: 30px 0; page-break-inside: avoid;">
          <h3 style="text-align: center; font-size: 18px; margin-bottom: 15px; color: #111827;">${monthName}</h3>
          <div class="calendar-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; font-weight: 600; padding: 8px; background: #f3f4f6; font-size: 12px;">Mon</div>
            <div style="text-align: center; font-weight: 600; padding: 8px; background: #f3f4f6; font-size: 12px;">Tue</div>
            <div style="text-align: center; font-weight: 600; padding: 8px; background: #f3f4f6; font-size: 12px;">Wed</div>
            <div style="text-align: center; font-weight: 600; padding: 8px; background: #f3f4f6; font-size: 12px;">Thu</div>
            <div style="text-align: center; font-weight: 600; padding: 8px; background: #f3f4f6; font-size: 12px;">Fri</div>`;

      // Fill calendar with days
      const weeks: Array<Array<DayAllocation | null>> = [];
      let currentWeek: Array<DayAllocation | null> = [null, null, null, null, null];
      let weekStarted = false;

      allocations.forEach(allocation => {
        const dayOfWeek = allocation.date.getDay();
        const weekdayIndex = dayOfWeek === 0 ? 4 : dayOfWeek - 1; // Convert to Mon-Fri (0-4)
        
        if (weekdayIndex >= 0 && weekdayIndex <= 4) {
          if (weekdayIndex === 0 || !weekStarted) {
            if (weekStarted) {
              weeks.push(currentWeek);
            }
            currentWeek = [null, null, null, null, null];
            weekStarted = true;
          }
          
          currentWeek[weekdayIndex] = allocation;
          
          if (weekdayIndex === 4) {
            weeks.push(currentWeek);
            currentWeek = [null, null, null, null, null];
            weekStarted = false;
          }
        }
      });

      if (weekStarted && currentWeek.some(day => day !== null)) {
        weeks.push(currentWeek);
      }

      weeks.forEach(week => {
        week.forEach(day => {
          if (day) {
            const bgColor = day.isPrimary ? '#dbeafe' : '#dcfce7';
            const borderColor = day.isPrimary ? '#93c5fd' : '#86efac';
            calendarHTML += `
              <div style="border: 1px solid ${borderColor}; background: ${bgColor}; padding: 4px; text-align: center; font-size: 10px; min-height: 40px; display: flex; flex-direction: column; justify-content: center;">
                <div style="font-weight: 600; color: #374151;">${day.date.getDate()}</div>
                <div style="color: #6b7280; font-size: 8px;">${day.state}</div>
                <div style="color: #374151; font-size: 8px;">${formatCurrency(day.income)}</div>
              </div>`;
          } else {
            calendarHTML += `<div style="min-height: 40px;"></div>`;
          }
        });
      });

      calendarHTML += `
          </div>
        </div>`;
      
      return calendarHTML;
    }).join('');
  };

  const calendarHTML = generateCalendarHTML();

  // Create printable content
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tax Allocation Results - Split.Tax</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          margin: 40px; 
          color: #374151;
          line-height: 1.6;
        }
        .header { 
          text-align: center; 
          margin-bottom: 40px; 
          border-bottom: 2px solid #e5e7eb; 
          padding-bottom: 20px;
        }
        .header h1 { 
          color: #111827; 
          margin: 0 0 10px 0; 
          font-size: 28px;
        }
        .header p { 
          color: #6b7280; 
          margin: 0;
          font-size: 14px;
        }
        .results { 
          margin: 30px 0; 
        }
        .state-card { 
          margin: 20px 0; 
          padding: 20px; 
          border: 1px solid #d1d5db; 
          border-radius: 8px;
          background: #f9fafb;
        }
        .state-card.primary { 
          background: #eff6ff; 
          border-color: #93c5fd;
        }
        .state-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          margin-bottom: 10px;
        }
        .state-name { 
          font-size: 20px; 
          font-weight: 600; 
          color: #111827;
          margin: 0;
        }
        .primary-badge { 
          background: #2563eb; 
          color: white; 
          padding: 4px 8px; 
          border-radius: 4px; 
          font-size: 12px;
          font-weight: 500;
        }
        .amount { 
          font-size: 32px; 
          font-weight: 700; 
          color: #111827;
          margin: 10px 0;
        }
        .amount-label { 
          color: #6b7280; 
          font-size: 14px;
          margin: 0;
        }
        .days-worked { 
          color: #6b7280; 
          font-size: 14px;
          text-align: right;
        }
        .tax-info { 
          margin-top: 15px; 
          padding-top: 15px; 
          border-top: 1px solid #d1d5db;
          font-size: 14px;
        }
        .tax-owed { 
          color: #dc2626; 
          font-weight: 600;
        }
        .warning { 
          background: #fef3c7; 
          border: 1px solid #f59e0b; 
          padding: 12px; 
          border-radius: 6px;
          color: #92400e;
          font-size: 14px;
          margin-top: 10px;
        }
        .calendar-section {
          margin: 40px 0;
          border-top: 2px solid #e5e7eb;
          padding-top: 30px;
        }
        .footer { 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
          text-align: center; 
          color: #6b7280; 
          font-size: 12px;
        }
        @media print {
          body { margin: 20px; }
          .state-card { break-inside: avoid; }
          .calendar-month { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Tax Allocation Results</h1>
        <p>Gross Taxable Income by State • Generated by Split.Tax on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="results">
        ${stateKeys.map(state => {
          const { total, days } = stateTotals[state];
          const isPrimary = state === primaryState;
          
          return `
            <div class="state-card ${isPrimary ? 'primary' : ''}">
              <div class="state-header">
                <div>
                  <h2 class="state-name">
                    ${state} ${isPrimary ? '<span class="primary-badge">Primary</span>' : ''}
                  </h2>
                  <p class="amount">${formatCurrency(total)}</p>
                  <p class="amount-label">Gross Taxable Income</p>
                </div>
                <div class="days-worked">
                  ${days} days worked
                </div>
              </div>
              
              ${isPrimary && primaryStateTax !== null && hasIncomeTax(state) ? `
                <div class="tax-info">
                  <p class="tax-owed">Estimated ${state} Income Tax Owed: ${formatCurrency(primaryStateTax)}</p>
                </div>
              ` : ''}
              
              ${!isPrimary && hasIncomeTax(state) && total > getStandardDeduction(state) ? `
                <div class="warning">
                  ⚠️ Income exceeds ${state} standard deduction (${formatCurrency(getStandardDeduction(state))}).
                  You may owe taxes in ${state}. Consult a tax professional.
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
      
      ${calendarHTML ? `
        <div class="calendar-section">
          <h2 style="text-align: center; font-size: 24px; margin-bottom: 20px; color: #111827;">Income Allocation Calendar</h2>
          <p style="text-align: center; font-size: 14px; color: #6b7280; margin-bottom: 30px;">Daily income allocation by state (weekdays only)</p>
          <div style="margin-bottom: 20px; display: flex; justify-content: center; gap: 20px; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <div style="width: 15px; height: 15px; background: #dbeafe; border: 1px solid #93c5fd;"></div>
              <span>Primary State (${primaryState})</span>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <div style="width: 15px; height: 15px; background: #dcfce7; border: 1px solid #86efac;"></div>
              <span>Other States</span>
            </div>
          </div>
          ${calendarHTML}
        </div>
      ` : ''}
      
      <div class="footer">
        <p>This report provides estimates based on the information provided. Consult a tax professional for complex situations.</p>
        <p>Generated by Split.Tax • split.tax</p>
      </div>
    </body>
    </html>
  `;

  // Open print dialog
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  mnSettings,
  isLoading,
  message,
  formData
}) => {
  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Allocation Results (Gross Taxable Income)
            </h2>
          </div>
          <div className="card-body">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Allocation Results (Gross Taxable Income)
            </h2>
            {results && results.length > 0 && (
              <button
                onClick={() => generatePDF(results, mnSettings, formData)}
                className="btn-secondary btn-sm flex items-center gap-2"
              >
                <CloudDownloadIcon />
                Download PDF
              </button>
            )}
          </div>
        </div>
        
        <div className="card-body">
          {message.text && (
            <div className={`text-center p-4 rounded-lg mb-6 ${
              message.type === 'error' ? 'badge-red' : 
              message.type === 'success' ? 'badge-green' : 
              'badge-blue'
            }`}>
              {message.text}
            </div>
          )}
          
          {results && results.length > 0 && (() => {
            const stateTotals: Record<string, { total: number; days: number }> = {};
            let primaryState = '';
            
            results.forEach(({ result }) => {
              primaryState = result.primaryState;
              for (const state in result.allocations) {
                if (!stateTotals[state]) {
                  stateTotals[state] = { total: 0, days: 0 };
                }
                stateTotals[state].total += result.allocations[state].total;
                stateTotals[state].days += result.allocations[state].days;
              }
            });
            
            const stateKeys = Object.keys(stateTotals)
              .filter(state => stateTotals[state].total > 0 || stateTotals[state].days > 0)
              .sort((a, b) => {
                const diff = stateTotals[b].total - stateTotals[a].total;
                if (diff !== 0) return diff;
                if (a === primaryState) return -1;
                if (b === primaryState) return 1;
                return a.localeCompare(b);
              });

            // Calculate tax for all states
            const stateTaxes: Record<string, number> = {};
            for (const state in stateTotals) {
              if (hasIncomeTax(state) && stateTotals[state].total > 0) {
                const { tax } = calculateStateTax(
                  stateTotals[state].total, 
                  state,
                  state === primaryState ? mnSettings.deductionType : 'standard',
                  state === primaryState ? Number(mnSettings.itemizedDeduction || 0) : 0,
                  mnSettings.filingStatus
                );
                stateTaxes[state] = tax;
              }
            }

            return (
              <div className="space-y-6">
                <div className="space-y-4">
                  {stateKeys.map(state => {
                    const { total, days } = stateTotals[state];
                    const isPrimary = state === primaryState;
                    
                    return (
                      <div key={state} className="card">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                {state} {isPrimary && <span className="badge badge-blue ml-2">Primary</span>}
                              </h3>
                              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {formatCurrency(total)}
                              </p>
                              <p className="form-description mt-1">
                                Gross Taxable Income
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="form-description">
                                {days} days worked
                              </p>
                            </div>
                          </div>
                          
                          {stateTaxes[state] !== undefined && stateTaxes[state] > 0 && (
                            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                                Estimated {state} Income Tax Owed: {formatCurrency(stateTaxes[state])}
                              </p>
                            </div>
                          )}
                          
                          {!isPrimary && hasIncomeTax(state) && stateTaxes[state] === undefined && total > getStandardDeduction(state) && (
                            <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-800">
                              <div className="badge badge-yellow">
                                ⚠️ Income exceeds {state} standard deduction ({formatCurrency(getStandardDeduction(state))})
                              </div>
                              <p className="form-description mt-1">
                                You may owe taxes in {state}. Consult a tax professional.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Income Allocation Calendar */}
                <div className="card">
                  <div className="card-body">
                    <IncomeAllocationCalendar results={results} formData={formData} />
                  </div>
                </div>
              </div>
            );
          })()}
          
          {!results && !isLoading && !message.text && (
            <div className="text-center py-12">
              <p className="form-description">Click "Calculate" to see your income allocation by state.</p>
              <p className="form-description text-xs mt-2">Make sure to fill out the Global Settings first.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

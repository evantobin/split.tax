import React, { useState, useRef, useCallback } from 'react';
import type { PayPeriod } from '../types';
import { useAppStore } from '../store';

interface PayPeriodCalendarProps {}

interface CalendarDay {
  date: Date;
  isWeekday: boolean;
  payPeriodId?: string | number;
}

interface DragState {
  isDragging: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

const COLORS = [
  'bg-blue-100 border-blue-200 dark:bg-blue-900 dark:border-blue-800',
  'bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800',
  'bg-purple-100 border-purple-200 dark:bg-purple-900 dark:border-purple-800',
  'bg-orange-100 border-orange-200 dark:bg-orange-900 dark:border-orange-800',
  'bg-pink-100 border-pink-200 dark:bg-pink-900 dark:border-pink-800',
  'bg-indigo-100 border-indigo-200 dark:bg-indigo-900 dark:border-indigo-800',
  'bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-800',
  'bg-yellow-100 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-800',
];

export const PayPeriodCalendar: React.FC<PayPeriodCalendarProps> = () => {
  // Get state and actions from store
  const { formData, setFormData, handleToastOnly } = useAppStore();
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startDate: null,
    endDate: null
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string | number | null>(null);
  const [editingAmount, setEditingAmount] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    // Initialize with the first month of the visiting dates
    if (formData.visitingDates?.start) {
      return new Date(formData.visitingDates.start);
    }
    return new Date();
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  // Generate calendar days for current month (weekdays only) within visiting dates
  const generateCalendarDays = useCallback((): CalendarDay[] => {
    const { visitingDates } = formData;
    if (!visitingDates?.start || !visitingDates?.end) return [];

    const startDate = new Date(visitingDates.start);
    const endDate = new Date(visitingDates.end);
    const days: CalendarDay[] = [];

    // Get the first and last day of the current month
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Use the later of the month start or visiting start date
    const rangeStart = startDate > monthStart ? startDate : monthStart;
    // Use the earlier of the month end or visiting end date
    const rangeEnd = endDate < monthEnd ? endDate : monthEnd;

    let currentDate = new Date(rangeStart);
    while (currentDate <= rangeEnd) {
      const dayOfWeek = currentDate.getDay();
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday

      if (isWeekday) {
        // Find which pay period this day belongs to
        const payPeriodId = formData.payPeriods?.find(period => {
          const periodStart = new Date(period.payPeriodStart + 'T00:00:00');
          const periodEnd = new Date(period.payPeriodEnd + 'T23:59:59');
          return currentDate >= periodStart && currentDate <= periodEnd;
        })?.id;

        days.push({
          date: new Date(currentDate),
          isWeekday,
          payPeriodId
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [formData.visitingDates, formData.payPeriods, currentMonth]);

  const calendarDays = generateCalendarDays();

  // Navigation functions
  const navigateToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const navigateToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Check if navigation should be enabled
  const canNavigatePrevious = () => {
    if (!formData.visitingDates?.start) return false;
    const startDate = new Date(formData.visitingDates.start);
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth.getFullYear() > startDate.getFullYear() || 
           (prevMonth.getFullYear() === startDate.getFullYear() && prevMonth.getMonth() >= startDate.getMonth());
  };

  const canNavigateNext = () => {
    if (!formData.visitingDates?.end) return false;
    const endDate = new Date(formData.visitingDates.end);
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.getFullYear() < endDate.getFullYear() || 
           (nextMonth.getFullYear() === endDate.getFullYear() && nextMonth.getMonth() <= endDate.getMonth());
  };

  // Get color for a pay period
  const getPayPeriodColor = (payPeriodId: string | number): string => {
    const index = formData.payPeriods?.findIndex(p => p.id === payPeriodId) || 0;
    return COLORS[index % COLORS.length];
  };

  // Handle mouse down to start dragging
  const handleMouseDown = (date: Date) => {
    setDragState({
      isDragging: true,
      startDate: date,
      endDate: date
    });
  };

  // Handle mouse enter during drag
  const handleMouseEnter = (date: Date) => {
    if (dragState.isDragging) {
      setDragState(prev => ({
        ...prev,
        endDate: date
      }));
    }
  };

  // Handle mouse up to finish dragging
  const handleMouseUp = () => {
    if (dragState.isDragging && dragState.startDate && dragState.endDate) {
      const startDate = dragState.startDate < dragState.endDate ? dragState.startDate : dragState.endDate;
      const endDate = dragState.startDate < dragState.endDate ? dragState.endDate : dragState.startDate;

      // Create new pay period
      const newPayPeriod: PayPeriod = {
        id: Date.now(),
        netPay: '',
        payPeriodStart: startDate.toISOString().slice(0, 10),
        payPeriodEnd: endDate.toISOString().slice(0, 10)
      };

      setFormData(draft => {
        if (!draft.payPeriods) draft.payPeriods = [];
        draft.payPeriods.push(newPayPeriod);
      });

      handleToastOnly({ text: 'New pay period created. Click to set the gross taxable amount.', type: 'success' });
    }

    setDragState({
      isDragging: false,
      startDate: null,
      endDate: null
    });
  };

  // Handle clicking on a day to edit pay period
  const handleDayClick = (day: CalendarDay) => {
    if (day.payPeriodId) {
      const payPeriod = formData.payPeriods?.find(p => p.id === day.payPeriodId);
      if (payPeriod) {
        setSelectedPeriod(day.payPeriodId);
        setEditingAmount(payPeriod.netPay.toString());
      }
    }
  };

  // Handle saving edited amount
  const handleSaveAmount = () => {
    if (selectedPeriod !== null) {
      setFormData(draft => {
        const periodIndex = draft.payPeriods.findIndex(p => p.id === selectedPeriod);
        if (periodIndex !== -1) {
          draft.payPeriods[periodIndex].netPay = editingAmount;
        }
      });
      setSelectedPeriod(null);
      setEditingAmount('');
      handleToastOnly({ text: 'Pay period amount updated.', type: 'success' });
    }
  };

  // Handle deleting a pay period
  const handleDeletePeriod = (payPeriodId: string | number) => {
    setFormData(draft => {
      draft.payPeriods = draft.payPeriods.filter(p => p.id !== payPeriodId);
    });
    setSelectedPeriod(null);
    handleToastOnly({ text: 'Pay period deleted.', type: 'success' });
  };

  // Check if a day is in the current drag selection
  const isDayInDragSelection = (date: Date): boolean => {
    if (!dragState.isDragging || !dragState.startDate || !dragState.endDate) return false;
    const startDate = dragState.startDate < dragState.endDate ? dragState.startDate : dragState.endDate;
    const endDate = dragState.startDate < dragState.endDate ? dragState.endDate : dragState.startDate;
    return date >= startDate && date <= endDate;
  };

  // Create proper calendar grid with days in correct weekday columns
  const createCalendarGrid = (days: CalendarDay[]): (CalendarDay | null)[][] => {
    if (days.length === 0) return [];

    const weeks: (CalendarDay | null)[][] = [];
    let currentWeek: (CalendarDay | null)[] = [null, null, null, null, null]; // Mon, Tue, Wed, Thu, Fri
    let weekStarted = false;

    days.forEach((day) => {
      const dayOfWeek = day.date.getDay();
      // Convert to 0=Monday, 1=Tuesday, ..., 4=Friday
      const weekdayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday becomes 6, others shift left
      
      // Only process Monday-Friday (weekdayIndex 0-4)
      if (weekdayIndex < 5) {
        // If this is Monday or we haven't started a week yet, start a new week
        if (weekdayIndex === 0 || !weekStarted) {
          if (weekStarted) {
            weeks.push(currentWeek);
          }
          currentWeek = [null, null, null, null, null];
          weekStarted = true;
        }
        
        currentWeek[weekdayIndex] = day;
        
        // If this is Friday, complete the week
        if (weekdayIndex === 4) {
          weeks.push(currentWeek);
          currentWeek = [null, null, null, null, null];
          weekStarted = false;
        }
      }
    });

    // Add the last incomplete week if it has content
    if (weekStarted && currentWeek.some(day => day !== null)) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = createCalendarGrid(calendarDays);

  if (!formData.visitingDates?.start || !formData.visitingDates?.end) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        Please set visiting dates in Global Settings to display the calendar.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        <p>• Click on a colored day to edit the gross taxable amount</p>
        <p>• Drag across empty days to create a new pay period</p>
        <p>• Only weekdays (Monday-Friday) are shown</p>
      </div>

      <div 
        ref={calendarRef}
        className="select-none"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Month navigation header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={navigateToPreviousMonth}
            disabled={!canNavigatePrevious()}
            className={`p-2 rounded-md transition-colors ${
              canNavigatePrevious()
                ? 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
            }`}
          >
            ← Prev
          </button>
          
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={navigateToNextMonth}
            disabled={!canNavigateNext()}
            className={`p-2 rounded-md transition-colors ${
              canNavigateNext()
                ? 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                : 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>

        {/* Show calendar content or empty message */}
        {calendarDays.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
            No working days in this month.
          </div>
        ) : (
          <>
            {/* Week headers */}
            <div className="grid grid-cols-5 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar weeks */}
            <div className="space-y-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-5 gap-1">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      // Empty cell for days not in range
                      return <div key={`${weekIndex}-${dayIndex}`} className="h-12"></div>;
                    }

                    const isInDragSelection = isDayInDragSelection(day.date);
                    const hasPayPeriod = !!day.payPeriodId;
                    const colorClass = hasPayPeriod ? getPayPeriodColor(day.payPeriodId!) : '';

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`
                          h-12 border rounded cursor-pointer transition-all duration-150 flex flex-col items-center justify-center text-xs
                          ${hasPayPeriod 
                            ? `${colorClass} hover:opacity-80` 
                            : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          }
                          ${isInDragSelection ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600' : ''}
                        `}
                        onMouseDown={() => handleMouseDown(day.date)}
                        onMouseEnter={() => handleMouseEnter(day.date)}
                        onClick={() => handleDayClick(day)}
                      >
                        <div className="font-medium text-zinc-700 dark:text-zinc-300">
                          {day.date.getDate()}
                        </div>
                        {hasPayPeriod && (
                          <div className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                            ${formData.payPeriods?.find(p => p.id === day.payPeriodId)?.netPay || '0'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pay period summary */}
      {formData.payPeriods && formData.payPeriods.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Pay Periods Summary</h4>
          <div className="space-y-1">
            {formData.payPeriods.map((period) => (
              <div 
                key={period.id} 
                className={`flex items-center justify-between p-2 rounded text-xs ${getPayPeriodColor(period.id)}`}
              >
                <div>
                  <span className="font-medium">
                    {period.payPeriodStart} - {period.payPeriodEnd}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${period.netPay || '0'}</span>
                  <button
                    onClick={() => handleDeletePeriod(period.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit modal */}
      {selectedPeriod !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
              Edit Gross Taxable Amount
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveAmount}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setSelectedPeriod(null);
                    setEditingAmount('');
                  }}
                  className="flex-1 bg-zinc-300 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

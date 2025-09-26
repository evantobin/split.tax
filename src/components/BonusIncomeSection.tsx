import React from 'react';
import type { FormData } from '../types';
import { TrashIcon, PlusIcon } from './Icons';
import { StateSelector } from './StateSelector';

interface BonusIncomeSectionProps {
  formData: FormData;
  collapsed: boolean;
  preview: string;
  onToggle: () => void;
  onFormChange: (setter: (draft: FormData) => void) => void;
}

export const BonusIncomeSection: React.FC<BonusIncomeSectionProps> = ({
  formData,
  collapsed,
  preview,
  onToggle,
  onFormChange
}) => {
  return (
    <div>
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Bonus Income</h2>
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
        <>
          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Bonus Types:</h3>
            <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-2">
              <li>
                <strong>For Services Rendered:</strong> Use this for bonuses related to work you've already performed, such as annual bonuses, quarterly bonuses, or performance bonuses. The bonus is split proportionally based on days worked in each state during the bonus period. Specify the start and end dates of the period the bonus covers.
              </li>
              <li>
                <strong>Sign On:</strong> Use this for bonuses for work not yet performed, such as a bonus for starting with a new company or relocation bonuses. The bonus is allocated entirely to the state you were working in on the date you received the bonus.
              </li>
            </ul>
          </div>
          
          <div className="space-y-3 mt-2">
            {(formData.bonuses || []).map((bonus, index) => (
              <div key={bonus.id} className="card">
                <div className="card-body">
                  <div className="space-y-3">
                    {/* First row: Amount and Bonus Type */}
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        placeholder="Amount" 
                        step="0.01" 
                        className="form-input flex-1" 
                        value={bonus.amount} 
                        onChange={e => onFormChange(draft => { 
                          draft.bonuses[index].amount = e.target.value;
                        })}
                      />
                      <select
                        className="form-input flex-1"
                        value={bonus.type || 'services-rendered'}
                        onChange={e => onFormChange(draft => {
                          draft.bonuses[index].type = e.target.value as 'services-rendered' | 'sign-on';
                        })}
                      >
                        <option value="services-rendered">For Services Rendered</option>
                        <option value="sign-on">Sign On</option>
                      </select>
                      <button 
                        onClick={() => onFormChange(draft => { 
                          draft.bonuses = draft.bonuses.filter(b => b.id !== bonus.id);
                        })}
                        className="btn-destructive btn-xs"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    {/* Conditional fields based on bonus type */}
                    {bonus.type === 'services-rendered' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <label className="text-sm text-zinc-600 dark:text-zinc-400 w-24">
                            Bonus Period:
                          </label>
                          <input 
                            type="date" 
                            placeholder="Start Date"
                            className="form-input flex-1" 
                            value={bonus.bonusPeriodStart || ''} 
                            onChange={e => onFormChange(draft => { 
                              draft.bonuses[index].bonusPeriodStart = e.target.value;
                            })}
                          />
                          <input 
                            type="date" 
                            placeholder="End Date"
                            className="form-input flex-1" 
                            value={bonus.bonusPeriodEnd || ''} 
                            onChange={e => onFormChange(draft => { 
                              draft.bonuses[index].bonusPeriodEnd = e.target.value;
                            })}
                          />
                        </div>
                      </div>
                    )}

                    {bonus.type === 'sign-on' && (
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-zinc-600 dark:text-zinc-400 w-24">
                          Date Received:
                        </label>
                        <input 
                          type="date" 
                          className="form-input flex-1" 
                          value={bonus.date} 
                          onChange={e => onFormChange(draft => { 
                            draft.bonuses[index].date = e.target.value;
                          })}
                        />
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onFormChange(draft => { 
              draft.bonuses.push({ 
                id: Date.now(), 
                amount: '', 
                state: '', 
                date: '', 
                type: 'services-rendered',
                bonusPeriodStart: '',
                bonusPeriodEnd: ''
              });
            })}
            className="btn-secondary btn-sm flex items-center gap-2 mt-2"
          >
            <PlusIcon />
            Add Bonus
          </button>
        </>
      )}
    </div>
  );
};

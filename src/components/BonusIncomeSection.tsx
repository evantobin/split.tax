import React from 'react';
import type { FormData } from '../types';
import { TrashIcon, PlusIcon } from './Icons';

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
          <div className="space-y-2 mt-2">
            {(formData.bonuses || []).map((bonus, index) => (
              <div key={bonus.id} className="card">
                <div className="card-body">
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
                    <input 
                      type="date" 
                      className="form-input flex-1" 
                      value={bonus.date} 
                      onChange={e => onFormChange(draft => { 
                        draft.bonuses[index].date = e.target.value;
                      })}
                    />
                    <button 
                      onClick={() => onFormChange(draft => { 
                        draft.bonuses = draft.bonuses.filter(b => b.id !== bonus.id);
                      })}
                      className="btn-destructive btn-xs"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onFormChange(draft => { 
              draft.bonuses.push({ id: Date.now(), amount: '', state: '', date: '' });
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

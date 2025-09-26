import React from 'react';
import type { FormData, TaxSettings } from '../types';
import { formatCurrency } from '../utils';
import { StateSelector } from './StateSelector';
import { CogIcon } from './Icons';

interface PrimaryLocationSettingsProps {
  formData: FormData;
  mnSettings: TaxSettings;
  collapsed: boolean;
  preview: string;
  onToggle: () => void;
  onFormChange: (setter: (draft: FormData) => void) => void;
  onShowSettings: () => void;
}

export const PrimaryLocationSettings: React.FC<PrimaryLocationSettingsProps> = ({
  formData,
  mnSettings,
  collapsed,
  preview,
  onToggle,
  onFormChange,
  onShowSettings
}) => {
  return (
    <div>
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Primary Location Settings</h2>
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
        <div className="space-y-4 mt-2">
          <StateSelector
            value={formData.primaryState}
            onChange={(stateCode) => onFormChange(draft => { 
              draft.primaryState = stateCode;
            })}
            label="Primary State"
            placeholder="Type state name or code (e.g., Minnesota or MN)"
          />
          
          <div>
            <label className="form-label">
              Primary State Visiting Dates
            </label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="form-input flex-1" 
                value={formData.visitingDates.start} 
                onChange={e => onFormChange(draft => { 
                  draft.visitingDates.start = e.target.value;
                })} 
              />
              <span className="text-zinc-500 dark:text-zinc-400">to</span>
              <input 
                type="date" 
                className="form-input flex-1" 
                value={formData.visitingDates.end} 
                onChange={e => onFormChange(draft => { 
                  draft.visitingDates.end = e.target.value;
                })} 
              />
            </div>
          </div>

          {/* Primary State Tax Settings Preview */}
          <div className="card">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">Primary State Tax Settings</h4>
                  <p className="form-description">
                    {mnSettings.deductionType === 'standard' 
                      ? `Standard: ${formatCurrency(mnSettings.stdDeduction)}` 
                      : `Itemized: ${formatCurrency(Number(mnSettings.itemizedDeduction || 0))}`
                    }
                    {' • '}{mnSettings.brackets.length} bracket{mnSettings.brackets.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button 
                  onClick={onShowSettings}
                  className="btn-ghost btn-sm flex items-center gap-2"
                >
                  <CogIcon />
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

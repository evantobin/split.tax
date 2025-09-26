import React from 'react';
import type { FormData } from '../types';
import { TrashIcon, PlusIcon, CloudDownloadIcon, RefreshIcon } from './Icons';

interface OtherStatesSectionProps {
  formData: FormData;
  collapsed: boolean;
  preview: string;
  isSignedIn: boolean;
  newState: string;
  onToggle: () => void;
  onFormChange: (setter: (draft: FormData) => void) => void;
  onShowImportWizard: () => void;
  onImportCalendarEvents: () => void;
  onSignOut: () => void;
  onNewStateChange: (value: string) => void;
}

export const OtherStatesSection: React.FC<OtherStatesSectionProps> = ({
  formData,
  collapsed,
  preview,
  isSignedIn,
  newState,
  onToggle,
  onFormChange,
  onShowImportWizard,
  onImportCalendarEvents,
  onSignOut,
  onNewStateChange
}) => {
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div 
          className="flex items-center gap-3 cursor-pointer flex-1"
          onClick={onToggle}
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Days in Other States</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {collapsed ? preview : ''}
            </span>
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
              {collapsed ? '▶' : '▼'}
            </button>
          </div>
        </div>
        
        {/* Import Button */}
        <div className="flex items-center gap-2">
          {!isSignedIn ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onShowImportWizard();
              }} 
              className="btn-primary btn-sm flex items-center gap-2"
            >
              <CloudDownloadIcon />
              Import
            </button>
          ) : (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onImportCalendarEvents();
                }}
                className="btn-primary btn-sm flex items-center gap-2"
              >
                <CloudDownloadIcon />
                Import
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSignOut();
                }}
                className="btn-secondary btn-sm flex items-center gap-2"
              >
                <RefreshIcon />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
      
      {!collapsed && (
        <div className="space-y-4 mt-2">
          {Object.entries(formData.daysInOtherStates || {}).map(([state, dates]) => (
            <div key={state} className="card">
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{state}</h3>
                  <button 
                    onClick={() => onFormChange(draft => { delete draft.daysInOtherStates[state]; })}
                    className="btn-destructive btn-xs"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <div className="space-y-2">
                  {dates.map((date, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input 
                        type="date" 
                        className="form-input flex-1" 
                        value={date} 
                        onChange={e => onFormChange(draft => { 
                          draft.daysInOtherStates[state][index] = e.target.value;
                        })}
                      />
                      <button 
                        onClick={() => onFormChange(draft => { 
                          draft.daysInOtherStates[state].splice(index, 1);
                        })}
                        className="btn-destructive btn-xs"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onFormChange(draft => { 
                    draft.daysInOtherStates[state].push('');
                  })}
                  className="btn-ghost btn-sm mt-2"
                >
                  + Add Date
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="text" 
              placeholder="New State (e.g. CA)" 
              value={newState} 
              onChange={e => onNewStateChange(e.target.value.toUpperCase())} 
              maxLength={2}
              className="form-input w-40 uppercase"
            />
            <button 
              onClick={() => {
                if (newState && !formData.daysInOtherStates[newState]) {
                  onFormChange(draft => { 
                    draft.daysInOtherStates[newState.toUpperCase()] = [];
                  });
                  onNewStateChange('');
                }
              }}
              className="btn-secondary btn-sm flex items-center gap-2"
            >
              <PlusIcon />
              Add State
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

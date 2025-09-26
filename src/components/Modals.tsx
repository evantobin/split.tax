import React from 'react';

interface HowToUseModalProps {
  showHowToUse: boolean;
  setShowHowToUse: (show: boolean) => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ showHowToUse, setShowHowToUse }) => {
  if (!showHowToUse) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/40 flex items-center justify-center z-50 p-4" onClick={() => setShowHowToUse(false)}>
      <div className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">How to Use Split.Tax</h2>
            <button 
              onClick={() => setShowHowToUse(false)}
              className="btn-ghost btn-xs"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="space-y-6 text-zinc-900 dark:text-white">
            <div>
              <h3 className="font-semibold text-lg mb-2">📋 Step 1: Global Settings</h3>
              <ul className="space-y-1 ml-4">
                <li>• Enter your <strong>Primary State</strong> (e.g., MN for Minnesota)</li>
                <li>• Set your <strong>Visiting Dates</strong> - the full period you'll be working</li>
                <li>• For Minnesota, configure your <strong>Tax Settings</strong> (standard vs itemized deduction)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🏢 Step 2: Pay Periods</h3>
              <ul className="space-y-1 ml-4">
                <li>• Add each pay period with dates and <strong>gross taxable income</strong></li>
                <li>• Use <strong>Auto-generate</strong> buttons for common schedules:</li>
                <li className="ml-4">- <span className="bg-green-100 px-2 py-1 rounded text-sm">Biweekly</span>: Every 14 days</li>
                <li className="ml-4">- <span className="bg-purple-100 px-2 py-1 rounded text-sm">15th/Last Day</span>: Twice monthly</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🌎 Step 3: Days in Other States</h3>
              <ul className="space-y-1 ml-4">
                <li>• Add states where you worked outside your primary state</li>
                <li>• Add specific dates you worked in each state</li>
                <li>• Use <strong>Google Calendar Import</strong> to automatically import tagged events</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">💰 Step 4: Global Bonuses</h3>
              <ul className="space-y-1 ml-4">
                <li>• Add any bonuses with their amount and date</li>
                <li>• Bonuses are allocated to the state where you were working on that date</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">📊 Step 5: Calculate</h3>
              <ul className="space-y-1 ml-4">
                <li>• Click <strong>Calculate</strong> to see your income allocation by state</li>
                <li>• Review the results showing gross taxable income per state</li>
                <li>• For Minnesota, see estimated tax owed based on your settings</li>
              </ul>
            </div>

            <div className="card border-blue-200 dark:border-blue-800">
              <div className="card-body bg-blue-50 dark:bg-blue-950/20">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Google Calendar Integration</h3>
                <p className="text-blue-800 dark:text-blue-400 text-sm">
                  Tag calendar events with <code className="badge badge-blue">[TAX] STATE</code> format 
                  (e.g., "[TAX] CA" for California work days). The import feature will automatically 
                  add these dates to your other states list.
                </p>
              </div>
            </div>

            <div className="card border-yellow-200 dark:border-yellow-800">
              <div className="card-body bg-yellow-50 dark:bg-yellow-950/20">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">⚠️ Important Notes</h3>
                <ul className="text-yellow-800 dark:text-yellow-400 text-sm space-y-1">
                  <li>• Only weekdays (Mon-Fri) are counted as work days</li>
                  <li>• Data is automatically saved to your browser's local storage</li>
                  <li>• This tool provides estimates - consult a tax professional for complex situations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <div className="flex justify-end">
            <button 
              onClick={() => setShowHowToUse(false)}
              className="btn-primary"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TaxSettingsModalProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  mnSettings: any;
  setMnSettings: (settings: any) => void;
}

export const TaxSettingsModal: React.FC<TaxSettingsModalProps> = ({
  showSettings,
  setShowSettings,
  mnSettings,
  setMnSettings
}) => {
  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/40 flex items-center justify-center z-50 p-4" onClick={() => setShowSettings(false)}>
      <div className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Primary State Tax Settings</h2>
            <button 
              onClick={() => setShowSettings(false)}
              className="btn-ghost btn-xs"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="space-y-4">
            <div>
              <label className="form-label mb-2">
                Deduction Type
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-zinc-900 dark:text-white">
                  <input 
                    type="radio" 
                    name="deductionType"
                    value="standard"
                    checked={mnSettings.deductionType === 'standard'}
                    onChange={() => setMnSettings((s: any) => ({ ...s, deductionType: 'standard' }))}
                    className="mr-2"
                  />
                  Standard
                </label>
                <label className="flex items-center text-zinc-900 dark:text-white">
                  <input 
                    type="radio" 
                    name="deductionType"
                    value="itemized"
                    checked={mnSettings.deductionType === 'itemized'}
                    onChange={() => setMnSettings((s: any) => ({ ...s, deductionType: 'itemized' }))}
                    className="mr-2"
                  />
                  Itemized
                </label>
              </div>
            </div>

            {mnSettings.deductionType === 'standard' && (
              <div>
                <label className="form-label mb-1">
                  Standard Deduction
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={mnSettings.stdDeduction} 
                  onChange={e => setMnSettings((s: any) => ({ ...s, stdDeduction: Number(e.target.value) }))}
                />
              </div>
            )}

            {mnSettings.deductionType === 'itemized' && (
              <div>
                <label className="form-label mb-1">
                  Itemized Deduction
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={mnSettings.itemizedDeduction} 
                  onChange={e => setMnSettings((s: any) => ({ ...s, itemizedDeduction: e.target.value }))}
                />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label">
                  Tax Brackets
                </label>
                <button 
                  onClick={() => setMnSettings((s: any) => ({ 
                    ...s, 
                    brackets: [...s.brackets, { rate: 0, upTo: Infinity }] 
                  }))}
                  className="btn-secondary btn-xs"
                >
                  + Add Bracket
                </button>
              </div>
              
              <div className="space-y-2">
                {mnSettings.brackets.map((bracket: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      step="0.0001" 
                      placeholder="Rate"
                      className="form-input flex-1" 
                      value={bracket.rate} 
                      onChange={e => setMnSettings((s: any) => { 
                        const newBrackets = [...s.brackets];
                        newBrackets[index].rate = Number(e.target.value);
                        return { ...s, brackets: newBrackets };
                      })}
                    />
                    <span className="form-description">rate</span>
                    
                    <input 
                      type="number" 
                      placeholder="Up to (or leave empty for ∞)"
                      className="form-input flex-1" 
                      value={bracket.upTo === Infinity ? '' : bracket.upTo} 
                      onChange={e => setMnSettings((s: any) => { 
                        const newBrackets = [...s.brackets];
                        newBrackets[index].upTo = e.target.value === '' ? Infinity : Number(e.target.value);
                        return { ...s, brackets: newBrackets };
                      })}
                    />
                    <span className="form-description">up to</span>
                    
                    {mnSettings.brackets.length > 1 && (
                      <button 
                        onClick={() => setMnSettings((s: any) => ({
                          ...s, 
                          brackets: s.brackets.filter((_: any, j: number) => j !== index)
                        }))}
                        className="btn-destructive btn-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        <div className="card-footer">
          <div className="flex justify-end">
            <button 
              onClick={() => setShowSettings(false)}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GoogleImportWizardProps {
  showImportWizard: boolean;
  setShowImportWizard: (show: boolean) => void;
  wizardStep: number;
  setWizardStep: (step: number) => void;
  isSignedIn: boolean;
  handleAuthClick: () => void;
  importCalendarEvents: () => void;
}

export const GoogleImportWizard: React.FC<GoogleImportWizardProps> = ({
  showImportWizard,
  setShowImportWizard,
  wizardStep,
  setWizardStep,
  isSignedIn,
  handleAuthClick,
  importCalendarEvents
}) => {
  if (!showImportWizard) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/40 flex items-center justify-center z-50 p-4" onClick={() => {setShowImportWizard(false); setWizardStep(1);}}>
      <div className="card max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Google Calendar Import</h2>
            <button 
              onClick={() => {
                setShowImportWizard(false);
                setWizardStep(1);
              }}
              className="btn-ghost btn-xs"
            >
              ×
            </button>
          </div>
        </div>

        <div className="card-body">

          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">Import Work Days from Google Calendar</h3>
                <p className="form-description text-sm mb-6">
                  Automatically import your work location data from Google Calendar events.
                </p>
              </div>

              <div className="card border-blue-200 dark:border-blue-800">
                <div className="card-body bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">How it works:</h4>
                  <ol className="text-blue-800 dark:text-blue-400 text-sm space-y-1">
                    <li>1. Create calendar events for days you work in other states</li>
                    <li>2. Tag them with <code className="badge badge-blue">[TAX] STATE</code> format</li>
                    <li>3. Example: <code className="badge badge-blue">[TAX] CA</code> for California work days</li>
                    <li>4. Import will scan all your calendars for these tagged events</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🔐</div>
                <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">Authorize Google Calendar Access</h3>
                <p className="form-description text-sm mb-6">
                  We need permission to read your calendar events to find work location tags.
                </p>
              </div>

              {!isSignedIn ? (
                <div className="space-y-4">
                  <div className="card border-yellow-200 dark:border-yellow-800">
                    <div className="card-body bg-yellow-50 dark:bg-yellow-950/20">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">🔒 Privacy & Security</h4>
                      <ul className="text-yellow-800 dark:text-yellow-400 text-sm space-y-1">
                        <li>• Read-only access to your calendar events</li>
                        <li>• No data is stored on our servers</li>
                        <li>• Only scans for [TAX] tagged events</li>
                        <li>• You can revoke access anytime</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="card border-green-200 dark:border-green-800">
                    <div className="card-body bg-green-50 dark:bg-green-950/20 text-center">
                      <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">✅ Authorization Successful!</h4>
                      <p className="text-green-800 dark:text-green-400 text-sm">
                        You're now connected to Google Calendar. Ready to import your work location data.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="card-footer">
          <div className="flex justify-between">
            {wizardStep === 1 && (
              <>
                <button 
                  onClick={() => setShowImportWizard(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setWizardStep(2)}
                  className="btn-primary"
                >
                  Continue
                </button>
              </>
            )}
            {wizardStep === 2 && (
              <>
                <button 
                  onClick={() => setWizardStep(1)}
                  className="btn-ghost"
                >
                  Back
                </button>
                {!isSignedIn ? (
                  <button 
                    onClick={handleAuthClick}
                    className="btn-primary"
                  >
                    Authorize Google Calendar
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      importCalendarEvents();
                      setShowImportWizard(false);
                      setWizardStep(1);
                    }}
                    className="btn-primary"
                  >
                    Import Events
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

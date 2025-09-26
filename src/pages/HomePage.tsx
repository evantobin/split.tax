import { useEffect } from 'react';
import { CLIENT_ID, DISCOVERY_DOCS, SCOPES } from '../config';
import { useAppStore } from '../store';
import { Header } from '../components/Header';
import { PrimaryLocationSettings } from '../components/PrimaryLocationSettings';
import { OtherStatesSection } from '../components/OtherStatesSection';
import { BonusIncomeSection } from '../components/BonusIncomeSection';
import { PayPeriodsSection } from '../components/PayPeriodsSection';
import { ResultsPanel } from '../components/ResultsPanel';
import { HowToUseModal, GoogleImportWizard, TaxSettingsModal } from '../components/Modals';
import { NotificationsContainer } from '../components/Notifications';
import { IntroductionSection } from '../components/IntroductionSection';

// Declare global types for Google APIs
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export const HomePage: React.FC = () => {
  // Get state and actions from store
  const {
    // State
    formData,
    results,
    message,
    notifications,
    isLoading,
    collapsed,
    isDarkMode,
    showSettings,
    showHowToUse,
    showImportWizard,
    wizardStep,
    mnSettings,
    isSignedIn,
    tokenClient,
    newState,
    
    // Actions
    setFormData,
    dismissNotification,
    toggleSection,
    toggleDarkMode,
    setShowSettings,
    setShowHowToUse,
    setShowImportWizard,
    setWizardStep,
    setMnSettings,
    setIsSignedIn,
    setTokenClient,
    setNewState,
    handleCalculate,
    handleClear,
    handleToastOnly,
    setMessage,
    setResults,
    setIsLoading,
    
    // Initialization
    initialize
  } = useAppStore();

  // Section preview helpers
  const globalSettingsPreview = () => {
    return `${formData.primaryState || '—'} | ${formData.visitingDates.start || '—'} to ${formData.visitingDates.end || '—'}`;
  };
  
  const otherStatesPreview = () => {
    const states = Object.keys(formData.daysInOtherStates || {}).filter(s => (formData.daysInOtherStates[s] || []).length > 0);
    if (!states.length) return 'None';
    return states.map(s => `${s} (${formData.daysInOtherStates[s].length})`).join(', ');
  };
  
  const bonusesPreview = () => {
    const n = (formData.bonuses || []).length;
    if (!n) return 'None';
    const total = formData.bonuses.reduce((sum: number, b: any) => sum + Number(b.amount || 0), 0);
    return `${n} bonus${n > 1 ? 'es' : ''}, $${total}`;
  };
  
  const payPeriodsPreview = () => {
    const n = (formData.payPeriods || []).length;
    if (!n) return 'None';
    const total = formData.payPeriods.reduce((sum: number, p: any) => sum + Number(p.netPay || 0), 0);
    return `${n} period${n > 1 ? 's' : ''}, $${total}`;
  };

  // Initialize store on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Set up Google APIs
  useEffect(() => {
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => {
      if (window.gapi) {
        window.gapi.load('client', () => window.gapi.client.init({ discoveryDocs: DISCOVERY_DOCS }));
      }
    };
    document.body.appendChild(gapiScript);

    const gsiScript = document.createElement('script');
    gsiScript.src = 'https://accounts.google.com/gsi/client';
    gsiScript.onload = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (resp: any) => {
            if (resp.error) {
              console.error(resp);
              return;
            }
            setIsSignedIn(true);
          },
        });
        setTokenClient(client);
      }
    };
    document.body.appendChild(gsiScript);

    return () => {
      if (document.body.contains(gapiScript)) document.body.removeChild(gapiScript);
      if (document.body.contains(gsiScript)) document.body.removeChild(gsiScript);
    };
  }, [setIsSignedIn, setTokenClient]);

  const handleAuthClick = () => {
    if (tokenClient) tokenClient.requestAccessToken({ prompt: 'consent' });
  };

  const handleSignoutClick = () => {
    const token = window.gapi?.client?.getToken();
    if (token) {
      window.google?.accounts?.oauth2?.revoke(token.access_token, () => {
        window.gapi?.client?.setToken('');
        setIsSignedIn(false);
      });
    }
  };

  const importCalendarEvents = async () => {
    if (formData.payPeriods.length === 0) {
      setMessage({ text: 'Please add at least one pay period before importing.', type: 'error' });
      return;
    }
    
    setResults(null);
    setIsLoading(true);
    
    const { visitingDates = { start: '', end: '' } } = formData;
    if (!visitingDates.start || !visitingDates.end) {
      setMessage({ text: 'Cannot import: Please fill out visiting dates in Global Settings.', type: 'error' });
      setIsLoading(false);
      return;
    }
    
    const timeMin = new Date(visitingDates.start + 'T00:00:00').toISOString();
    const maxEndDate = new Date(visitingDates.end + 'T00:00:00');
    maxEndDate.setDate(maxEndDate.getDate() + 1);
    const timeMax = maxEndDate.toISOString();

    try {
      const calendarListResp = await window.gapi.client.calendar.calendarList.list();
      const calendars = (calendarListResp.result.items || []).map((cal: any) => cal.id);
      
      if (!calendars.length) {
        setMessage({ text: 'No calendars found in your account.', type: 'info' });
        setIsLoading(false);
        return;
      }
      
      let allEvents: any[] = [];
      for (const calendarId of calendars) {
        const resp = await window.gapi.client.calendar.events.list({
          'calendarId': calendarId,
          'timeMin': timeMin,
          'timeMax': timeMax,
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime'
        });
        
        if (resp.result.items) {
          allEvents = allEvents.concat(resp.result.items.map((ev: any) => ({ ...ev, _calendarId: calendarId })));
        }
      }
      
      const taxEventRegex = /\[TAX\]\s*([A-Z]{2})/i;
      let importCount = 0;
      
      setFormData(draft => {
        allEvents.forEach(event => {
          const match = event.summary?.match(taxEventRegex);
          if (match && match[1]) {
            const state = match[1];
            let startDateStr = event.start.date || (event.start.dateTime && event.start.dateTime.split('T')[0]);
            let endDateStr = event.end?.date || (event.end?.dateTime && event.end.dateTime.split('T')[0]);
            
            if (!startDateStr) return;
            if (!endDateStr) endDateStr = startDateStr;
            
            let startDate = new Date(startDateStr);
            let endDate = new Date(endDateStr);
            
            if (event.start.date && event.end?.date) {
              endDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
            }
            
            if (!draft.daysInOtherStates[state]) draft.daysInOtherStates[state] = [];
            
            let d = new Date(startDate);
            while (d <= endDate) {
              const dStr = d.toISOString().split('T')[0];
              if (!draft.daysInOtherStates[state].includes(dStr)) {
                draft.daysInOtherStates[state].push(dStr);
                importCount++;
              }
              d.setDate(d.getDate() + 1);
            }
          }
        });
        
        for (const state in draft.daysInOtherStates) {
          draft.daysInOtherStates[state].sort();
        }
      });
      
      setMessage({
        text: importCount > 0 
          ? `Successfully imported and merged ${importCount} new event(s) from all calendars!`
          : `No new "[TAX]" events found to import in any calendar.`,
        type: importCount > 0 ? 'success' : 'info'
      });
    } catch (err: any) {
      setMessage({
        text: `Error fetching calendar events: ${err.result?.error?.message || err.message}`,
        type: 'error'
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <Header 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onCalculate={handleCalculate}
          onShowHelp={() => setShowHowToUse(true)}
          onClear={handleClear}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 space-y-8">
          {/* Introduction Section */}
          <IntroductionSection />
          
          {/* Settings Panel */}
          <div className="sidebar">
            <div className="p-6 space-y-6">
              
              <PrimaryLocationSettings
                formData={formData}
                mnSettings={mnSettings}
                collapsed={collapsed.global}
                preview={globalSettingsPreview()}
                onToggle={() => toggleSection('global')}
                onFormChange={setFormData}
                onShowSettings={() => setShowSettings(true)}
              />

              <OtherStatesSection
                formData={formData}
                collapsed={collapsed.otherStates}
                preview={otherStatesPreview()}
                isSignedIn={isSignedIn}
                newState={newState}
                onToggle={() => toggleSection('otherStates')}
                onFormChange={setFormData}
                onShowImportWizard={() => setShowImportWizard(true)}
                onImportCalendarEvents={importCalendarEvents}
                onSignOut={handleSignoutClick}
                onNewStateChange={setNewState}
              />

              <BonusIncomeSection
                formData={formData}
                collapsed={collapsed.bonuses}
                preview={bonusesPreview()}
                onToggle={() => toggleSection('bonuses')}
                onFormChange={setFormData}
              />

              <PayPeriodsSection
                formData={formData}
                collapsed={collapsed.payPeriods}
                preview={payPeriodsPreview()}
                onToggle={() => toggleSection('payPeriods')}
                onFormChange={setFormData}
                onSetMessage={handleToastOnly}
              />
              
            </div>
          </div>

          {/* Results Panel - Below Settings */}
          <ResultsPanel
            results={results}
            mnSettings={mnSettings}
            isLoading={isLoading}
            message={message}
          />
        </div>
      </div>

      {/* Modals */}
      <HowToUseModal 
        showHowToUse={showHowToUse}
        setShowHowToUse={setShowHowToUse}
      />
      
      <GoogleImportWizard
        showImportWizard={showImportWizard}
        setShowImportWizard={setShowImportWizard}
        wizardStep={wizardStep}
        setWizardStep={setWizardStep}
        isSignedIn={isSignedIn}
        handleAuthClick={handleAuthClick}
        importCalendarEvents={importCalendarEvents}
      />

      <TaxSettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        mnSettings={mnSettings}
        setMnSettings={setMnSettings}
      />

      {/* Toast Notifications */}
      <NotificationsContainer
        messages={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
};

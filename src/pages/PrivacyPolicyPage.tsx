import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

export const PrivacyPolicyPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Calculator
              </Link>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
          <div className="px-6 py-8 max-w-none">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </div>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8 first:mt-0">1. Information We Collect</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-2">
              Split.tax collects information that you voluntarily provide when using our service:
            </p>
            <ul className="text-zinc-700 dark:text-zinc-300 mb-4 ml-6 list-disc space-y-1">
              <li><strong className="text-zinc-900 dark:text-white">Tax Information:</strong> Income amounts, pay periods, state information, and dates you provide for calculations</li>
              <li><strong className="text-zinc-900 dark:text-white">Google Calendar Data:</strong> When you choose to connect your Google Calendar, we access calendar events marked with [TAX] tags</li>
              <li><strong className="text-zinc-900 dark:text-white">Local Storage:</strong> Your input data is stored locally in your browser for convenience</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">2. How We Use Your Information</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-2">We use the information you provide to:</p>
            <ul className="text-zinc-700 dark:text-zinc-300 mb-4 ml-6 list-disc space-y-1">
              <li>Perform tax calculations and provide estimates</li>
              <li>Import relevant calendar events when you authorize Google Calendar access</li>
              <li>Save your progress locally in your browser</li>
              <li>Improve our service and user experience</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">3. Data Storage and Security</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">Local Storage:</strong> Your tax calculation data is stored locally in your browser using localStorage. 
              This data never leaves your device unless you explicitly choose to connect to Google Calendar.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">Google Calendar Integration:</strong> When you authorize calendar access, we only read events 
              that contain [TAX] tags in their titles. We do not store, modify, or share your calendar data.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">No Server Storage:</strong> We do not store your personal tax information on our servers.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">4. Third-Party Services</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">Google APIs:</strong> When you choose to connect your Google Calendar, we use Google's APIs 
              under their terms of service and privacy policy. We only request the minimum permissions necessary 
              to read calendar events.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">GitHub Pages:</strong> This website is hosted on GitHub Pages, which has its own privacy policy.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">5. Data Sharing</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              Your tax calculation data remains private and is only used for providing our service.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">6. Your Rights and Choices</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-2">You have the right to:</p>
            <ul className="text-zinc-700 dark:text-zinc-300 mb-4 ml-6 list-disc space-y-1">
              <li><strong className="text-zinc-900 dark:text-white">Access:</strong> View all data stored locally in your browser</li>
              <li><strong className="text-zinc-900 dark:text-white">Delete:</strong> Clear all locally stored data using the "Clear All" button</li>
              <li><strong className="text-zinc-900 dark:text-white">Revoke Access:</strong> Disconnect Google Calendar integration at any time</li>
              <li><strong className="text-zinc-900 dark:text-white">Data Portability:</strong> Export your data (feature may be added in future updates)</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">7. Cookies and Local Storage</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We use browser localStorage to save your tax calculation data locally. This is not a cookie 
              and does not track you across websites. You can clear this data at any time through our 
              interface or your browser settings.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">8. Children's Privacy</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Our service is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">9. International Users</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              This service is designed for U.S. tax calculations. If you are accessing from outside 
              the United States, please be aware that your information may be processed in the U.S.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">10. Changes to This Policy</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We may update this privacy policy from time to time. We will notify users of any material 
              changes by updating the "Last updated" date at the top of this policy.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">11. Contact Us</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us through our website.
            </p>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                <strong>Privacy-First Design:</strong> Your tax data is stored locally in your browser and never 
                transmitted to our servers. You maintain full control over your sensitive information.
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/terms"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View our Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

export const TermsOfServicePage: React.FC = () => {
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
                Terms of Service
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

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8 first:mt-0">1. Acceptance of Terms</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              By accessing and using Split.tax, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">2. Description of Service</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Split.tax is a tax calculation tool designed to help users estimate their tax obligations when working across multiple states. 
              The service provides calculations based on user-provided information and current tax rates.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">3. User Responsibilities</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-2">You are responsible for:</p>
            <ul className="text-zinc-700 dark:text-zinc-300 mb-4 ml-6 list-disc space-y-1">
              <li>Providing accurate information for calculations</li>
              <li>Verifying all results with qualified tax professionals</li>
              <li>Ensuring compliance with all applicable tax laws</li>
              <li>Keeping your account information secure</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">4. Disclaimers</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              <strong className="text-zinc-900 dark:text-white">Split.tax is for informational purposes only and does not constitute tax advice.</strong> 
              Tax calculations provided by this service are estimates based on available information and should not be considered 
              as professional tax advice. Always consult with qualified tax professionals for specific tax situations.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We make no guarantees about the accuracy, completeness, or reliability of the calculations or information provided.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">5. Limitation of Liability</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              In no event shall Split.tax, its operators, or contributors be liable for any direct, indirect, incidental, 
              special, or consequential damages arising out of or in connection with your use of this service.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">6. Privacy and Data</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Your privacy is important to us. Please review our{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your information.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">7. Modifications</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
              Your continued use of the service constitutes acceptance of the modified terms.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">8. Termination</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              We may terminate or suspend your access to the service at any time, without prior notice or liability, 
              for any reason, including breach of these terms.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">9. Governing Law</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              These terms shall be governed by and construed in accordance with applicable law, without regard to 
              conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4 mt-8">10. Contact Information</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              If you have any questions about these Terms of Service, please contact us through our website.
            </p>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> This tool provides estimates only. Always consult with qualified tax professionals 
                for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

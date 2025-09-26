import React from 'react';

interface PrivacyPolicyProps {
  show: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-auto m-4">
        <div className="sticky top-0 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 py-4 prose prose-zinc dark:prose-invert max-w-none">
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <h3>1. Information We Collect</h3>
          <p>
            Split.tax collects information that you voluntarily provide when using our service:
          </p>
          <ul>
            <li><strong>Tax Information:</strong> Income amounts, pay periods, state information, and dates you provide for calculations</li>
            <li><strong>Google Calendar Data:</strong> When you choose to connect your Google Calendar, we access calendar events marked with [TAX] tags</li>
            <li><strong>Local Storage:</strong> Your input data is stored locally in your browser for convenience</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Perform tax calculations and provide estimates</li>
            <li>Import relevant calendar events when you authorize Google Calendar access</li>
            <li>Save your progress locally in your browser</li>
            <li>Improve our service and user experience</li>
          </ul>

          <h3>3. Data Storage and Security</h3>
          <p>
            <strong>Local Storage:</strong> Your tax calculation data is stored locally in your browser using localStorage. 
            This data never leaves your device unless you explicitly choose to connect to Google Calendar.
          </p>
          <p>
            <strong>Google Calendar Integration:</strong> When you authorize calendar access, we only read events 
            that contain [TAX] tags in their titles. We do not store, modify, or share your calendar data.
          </p>
          <p>
            <strong>No Server Storage:</strong> We do not store your personal tax information on our servers.
          </p>

          <h3>4. Third-Party Services</h3>
          <p>
            <strong>Google APIs:</strong> When you choose to connect your Google Calendar, we use Google's APIs 
            under their terms of service and privacy policy. We only request the minimum permissions necessary 
            to read calendar events.
          </p>
          <p>
            <strong>GitHub Pages:</strong> This website is hosted on GitHub Pages, which has its own privacy policy.
          </p>

          <h3>5. Data Sharing</h3>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties. 
            Your tax calculation data remains private and is only used for providing our service.
          </p>

          <h3>6. Your Rights and Choices</h3>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> View all data stored locally in your browser</li>
            <li><strong>Delete:</strong> Clear all locally stored data using the "Clear All" button</li>
            <li><strong>Revoke Access:</strong> Disconnect Google Calendar integration at any time</li>
            <li><strong>Data Portability:</strong> Export your data (feature may be added in future updates)</li>
          </ul>

          <h3>7. Cookies and Local Storage</h3>
          <p>
            We use browser localStorage to save your tax calculation data locally. This is not a cookie 
            and does not track you across websites. You can clear this data at any time through our 
            interface or your browser settings.
          </p>

          <h3>8. Children's Privacy</h3>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect personal 
            information from children under 13.
          </p>

          <h3>9. International Users</h3>
          <p>
            This service is designed for U.S. tax calculations. If you are accessing from outside 
            the United States, please be aware that your information may be processed in the U.S.
          </p>

          <h3>10. Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time. We will notify users of any material 
            changes by updating the "Last updated" date at the top of this policy.
          </p>

          <h3>11. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy or our data practices, 
            please contact us through our website.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              <strong>Privacy-First Design:</strong> Your tax data is stored locally in your browser and never 
              transmitted to our servers. You maintain full control over your sensitive information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

interface TermsOfServiceProps {
  show: boolean;
  onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-auto m-4">
        <div className="sticky top-0 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Terms of Service
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

          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using Split.tax, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h3>2. Description of Service</h3>
          <p>
            Split.tax is a tax calculation tool designed to help users estimate their tax obligations when working across multiple states. 
            The service provides calculations based on user-provided information and current tax rates.
          </p>

          <h3>3. User Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul>
            <li>Providing accurate information for calculations</li>
            <li>Verifying all results with qualified tax professionals</li>
            <li>Ensuring compliance with all applicable tax laws</li>
            <li>Keeping your account information secure</li>
          </ul>

          <h3>4. Disclaimers</h3>
          <p>
            <strong>Split.tax is for informational purposes only and does not constitute tax advice.</strong> 
            Tax calculations provided by this service are estimates based on available information and should not be considered 
            as professional tax advice. Always consult with qualified tax professionals for specific tax situations.
          </p>
          <p>
            We make no guarantees about the accuracy, completeness, or reliability of the calculations or information provided.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            In no event shall Split.tax, its operators, or contributors be liable for any direct, indirect, incidental, 
            special, or consequential damages arising out of or in connection with your use of this service.
          </p>

          <h3>6. Privacy and Data</h3>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
            use, and protect your information.
          </p>

          <h3>7. Modifications</h3>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
            Your continued use of the service constitutes acceptance of the modified terms.
          </p>

          <h3>8. Termination</h3>
          <p>
            We may terminate or suspend your access to the service at any time, without prior notice or liability, 
            for any reason, including breach of these terms.
          </p>

          <h3>9. Governing Law</h3>
          <p>
            These terms shall be governed by and construed in accordance with applicable law, without regard to 
            conflict of law provisions.
          </p>

          <h3>10. Contact Information</h3>
          <p>
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
  );
};

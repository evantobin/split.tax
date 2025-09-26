import React from 'react';

export const IntroductionSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-8 mb-8 border border-blue-200 dark:border-zinc-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Multi-State Tax Calculator
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
          Calculate your state tax allocation when working across multiple states throughout the year.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              Who Needs This Tool?
            </h2>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Remote Workers:</strong> Digital nomads and remote employees working from different states</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Snowbirds:</strong> Retirees and professionals who split time between seasonal residences</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Business Travelers:</strong> Consultants and professionals with extended travel assignments</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Temporary Residents:</strong> Contract workers, interns, or anyone with temporary state residency</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Multi-State Employees:</strong> Workers whose job requires presence in multiple states</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
              What This Tool Does
            </h2>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Calculates proper state tax allocation based on days worked in each state</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Handles complex multi-state tax scenarios with accurate apportionment</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Integrates with Google Calendar to automatically import work locations</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Provides detailed pay period analysis with visual calendar interface</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Generates professional reports for tax filing and record keeping</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-blue-200 dark:border-zinc-600">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            <strong className="text-zinc-900 dark:text-white">Important:</strong> This tool is for informational purposes only and does not constitute tax advice.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Always consult with a qualified tax professional for your specific situation. State tax laws vary and change frequently.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';

interface ConversionStage {
  name: string;
  count: number;
  percentage: number;
  avgDays?: number;
  dropOffReason?: string;
}

const ConversionAnalytics: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Mock conversion funnel data
  const funnelStages: ConversionStage[] = [
    { 
      name: 'Initial Inquiries', 
      count: 500, 
      percentage: 100,
      avgDays: 0
    },
    { 
      name: 'Pre-qualification', 
      count: 425, 
      percentage: 85,
      avgDays: 0.5,
      dropOffReason: 'Income requirements not met'
    },
    { 
      name: 'Application Submitted', 
      count: 360, 
      percentage: 72,
      avgDays: 2.1,
      dropOffReason: 'Incomplete documentation'
    },
    { 
      name: 'Credit Approved', 
      count: 340, 
      percentage: 68,
      avgDays: 1.3,
      dropOffReason: 'Credit score below threshold'
    },
    { 
      name: 'Appraisal Complete', 
      count: 225, 
      percentage: 45,
      avgDays: 5.2,
      dropOffReason: 'Property valuation issues'
    },
    { 
      name: 'Underwriting Approved', 
      count: 190, 
      percentage: 38,
      avgDays: 3.2,
      dropOffReason: 'Debt-to-income ratio'
    },
    { 
      name: 'Loan Funded', 
      count: 160, 
      percentage: 32,
      avgDays: 2.5,
      dropOffReason: 'Last-minute credit changes'
    }
  ];

  const getBarColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getDropOffPercentage = (currentStage: number, previousStage: number) => {
    if (previousStage === 0) return 0;
    return Math.round(((previousStage - currentStage) / previousStage) * 100);
  };

  // Collapsed Summary View
  if (!isExpanded) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conversion Funnel Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-600">Overall Conversion</span>
                <div className="text-xl font-bold text-gray-900">32%</div>
                <div className="text-xs text-green-600">↑ 3% vs last month</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Biggest Bottleneck</span>
                <div className="text-xl font-bold text-orange-600">Appraisal</div>
                <div className="text-xs text-gray-600">23% drop rate</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Time to Close</span>
                <div className="text-xl font-bold text-gray-900">14.8 days</div>
                <div className="text-xs text-green-600">↓ 2.1 days faster</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Applications</span>
                <div className="text-xl font-bold text-gray-900">500</div>
                <div className="text-xs text-gray-600">160 funded</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Conversion Funnel Analytics</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Expanded Detailed View
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Conversion Funnel Analytics</h2>
          <p className="text-gray-600">Track loan progression through each stage</p>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
        >
          <span>Collapse</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-4 mb-8">
        {funnelStages.map((stage, index) => {
          const dropOff = index > 0 ? 
            getDropOffPercentage(stage.count, funnelStages[index - 1].count) : 0;
          
          return (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-40">
                    {stage.name}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {stage.count}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({stage.percentage}%)
                  </span>
                  {stage.avgDays !== undefined && stage.avgDays > 0 && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Avg: {stage.avgDays} days
                    </span>
                  )}
                </div>
                {dropOff > 0 && (
                  <span className="text-sm text-red-600">
                    -{ dropOff}% drop
                  </span>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div 
                    className={`${getBarColor(stage.percentage)} h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500`}
                    style={{ width: `${stage.percentage}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {stage.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Drop-off Reason */}
              {dropOff > 10 && stage.dropOffReason && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs text-red-500">⚠️</span>
                  <span className="text-xs text-gray-600">
                    Main drop reason: {stage.dropOffReason}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Overall Conversion</div>
          <div className="text-2xl font-bold text-gray-900">32%</div>
          <div className="text-xs text-green-600 mt-1">↑ 3% vs last month</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Avg Time to Close</div>
          <div className="text-2xl font-bold text-gray-900">14.8 days</div>
          <div className="text-xs text-green-600 mt-1">↓ 2.1 days improvement</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Biggest Bottleneck</div>
          <div className="text-xl font-bold text-orange-600">Appraisal</div>
          <div className="text-xs text-gray-600 mt-1">23% drop at this stage</div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          🎯 Recommended Actions
        </h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Focus on appraisal stage - largest drop-off point (23%)</li>
          <li>• Reduce underwriting time from 3.2 to 2.0 days</li>
          <li>• Implement pre-appraisal property checks to reduce failures</li>
        </ul>
      </div>
    </div>
  );
};

export default ConversionAnalytics;

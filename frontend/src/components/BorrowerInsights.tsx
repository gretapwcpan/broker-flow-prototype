import React from 'react';

interface BorrowerInsightsProps {
  insights: any;
}

const BorrowerInsights: React.FC<BorrowerInsightsProps> = ({ insights }) => {
  if (!insights) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">👥 Borrower Analysis</h3>
        <p className="text-gray-500">No borrower data available</p>
      </div>
    );
  }

  const incomeAnalysis = insights.income_analysis || {};
  const creditAnalysis = insights.credit_score_analysis || {};
  const opportunities = insights.opportunities || [];

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">👥 Borrower Analysis</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {insights.total_borrowers} Profiles
          </span>
        </div>

        {/* Income Analysis */}
        {incomeAnalysis.average_income && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">💰 Income Distribution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Average Income</div>
                <div className="text-2xl font-bold text-green-600">
                  ${incomeAnalysis.average_income.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Income Range</div>
                <div className="text-lg font-semibold text-gray-700">
                  {incomeAnalysis.income_range}
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {incomeAnalysis.high_income_borrowers || 0}
                </div>
                <div className="text-xs text-gray-500">High Income (&gt;$100K)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {incomeAnalysis.moderate_income_borrowers || 0}
                </div>
                <div className="text-xs text-gray-500">Moderate ($50K-$100K)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {incomeAnalysis.low_income_borrowers || 0}
                </div>
                <div className="text-xs text-gray-500">Low Income (&lt;$50K)</div>
              </div>
            </div>
          </div>
        )}

        {/* Credit Analysis */}
        {creditAnalysis.average_score && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">📊 Credit Score Analysis</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Average Score</div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(creditAnalysis.average_score)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Median Score</div>
                <div className="text-2xl font-bold text-blue-600">
                  {creditAnalysis.median_score}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {creditAnalysis.excellent_credit || 0}
                </div>
                <div className="text-xs text-gray-500">Excellent (750+)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {creditAnalysis.good_credit || 0}
                </div>
                <div className="text-xs text-gray-500">Good (700-749)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {creditAnalysis.fair_credit || 0}
                </div>
                <div className="text-xs text-gray-500">Fair (650-699)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {creditAnalysis.poor_credit || 0}
                </div>
                <div className="text-xs text-gray-500">Poor (&lt;650)</div>
              </div>
            </div>
          </div>
        )}

        {/* Opportunities */}
        {opportunities.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">🎯 Opportunities</h4>
            <div className="space-y-2">
              {opportunities.slice(0, 3).map((opportunity: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">{opportunity}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowerInsights;
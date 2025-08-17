import React from 'react';

interface PortfolioInsightsProps {
  insights: any;
}

const PortfolioInsights: React.FC<PortfolioInsightsProps> = ({ insights }) => {
  if (!insights) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Portfolio Insights</h3>
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  const riskAssessment = insights.risk_assessment || {};
  const growthOpportunities = insights.growth_opportunities || [];
  const actionItems = insights.action_items || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Risk Assessment</h3>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Risk Level</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              riskAssessment.overall_risk_level === 'Low' ? 'bg-green-100 text-green-800' :
              riskAssessment.overall_risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {riskAssessment.overall_risk_level || 'Unknown'}
            </span>
          </div>
        </div>

        {riskAssessment.risk_factors?.length > 0 ? (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Risk Factors:</h4>
            <div className="space-y-1">
              {riskAssessment.risk_factors.map((factor: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-600">{factor}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-4 text-sm text-green-600">
            ✅ No significant risk factors identified
          </div>
        )}

        {riskAssessment.mitigation_strategies?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Mitigation Strategies:</h4>
            <div className="space-y-1">
              {riskAssessment.mitigation_strategies.slice(0, 3).map((strategy: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-600">{strategy}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Growth Opportunities */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Growth Opportunities</h3>
        
        {growthOpportunities.length > 0 ? (
          <div className="space-y-3">
            {growthOpportunities.slice(0, 6).map((opportunity: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">{opportunity}</div>
              </div>
            ))}
            
            {growthOpportunities.length > 6 && (
              <div className="text-sm text-gray-500 italic">
                +{growthOpportunities.length - 6} more opportunities available
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Continue analyzing data to identify growth opportunities
          </div>
        )}
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Action Items</h3>
        
        {actionItems.length > 0 ? (
          <div className="space-y-4">
            {actionItems.map((item: any, index: number) => (
              <div key={index} className="border-l-4 border-l-blue-500 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-xs text-gray-500">{item.timeline}</span>
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            No action items available
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioInsights;
import React from 'react';

interface PropertyInsightsProps {
  insights: any;
}

const PropertyInsights: React.FC<PropertyInsightsProps> = ({ insights }) => {
  if (!insights || insights.error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🏠 Property Market</h3>
        <p className="text-gray-500">No property data available</p>
      </div>
    );
  }

  const marketOverview = insights.market_overview || {};
  const propertyTrends = insights.property_trends || {};
  const opportunities = insights.investment_opportunities || [];

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">🏠 Property Market</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {marketOverview.total_properties_analyzed || 0} Properties
          </span>
        </div>

        {/* Market Overview */}
        {marketOverview.average_property_value && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">📈 Market Overview</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Average Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ${marketOverview.average_property_value.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Median Value</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${marketOverview.median_property_value?.toLocaleString() || 'N/A'}
                </div>
              </div>
            </div>
            
            {marketOverview.value_range && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Value Range</div>
                <div className="text-lg font-semibold text-gray-700">
                  {marketOverview.value_range}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Property Trends */}
        {propertyTrends.average_price_per_sqft && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">📊 Property Trends</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Price per Sq Ft</div>
                <div className="text-xl font-bold text-purple-600">
                  ${propertyTrends.average_price_per_sqft.toFixed(0)}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Avg Square Footage</div>
                <div className="text-xl font-bold text-indigo-600">
                  {propertyTrends.average_square_footage?.toLocaleString() || 'N/A'}
                </div>
              </div>
            </div>

            {propertyTrends.popular_bedroom_count && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Most Popular</div>
                <div className="text-lg font-semibold text-gray-700">
                  {propertyTrends.popular_bedroom_count} Bedroom Properties
                </div>
              </div>
            )}
          </div>
        )}

        {/* Investment Opportunities */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">💡 Market Insights</h4>
          {opportunities.length > 0 ? (
            <div className="space-y-2">
              {opportunities.map((opportunity: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-gray-700">{opportunity}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">
              Continue analyzing property data to identify market opportunities
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyInsights;
import React from 'react';

interface ExecutiveSummaryProps {
  summary?: string;
  keyMetrics?: any;
  totalDocuments: number;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ 
  summary, 
  keyMetrics, 
  totalDocuments 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg text-white">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Portfolio Overview</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100">Live Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Portfolio Value</div>
            <div className="text-3xl font-bold">$2.1M</div>
            <div className="text-green-300 text-xs mt-1">↑ 12% MoM</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Avg Deal Size</div>
            <div className="text-3xl font-bold">$352K</div>
            <div className="text-green-300 text-xs mt-1">↑ 8% vs target</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Risk Level</div>
            <div className="text-3xl font-bold text-green-300">Low</div>
            <div className="text-blue-200 text-xs mt-1">749 avg FICO</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Conversion Rate</div>
            <div className="text-3xl font-bold">68%</div>
            <div className="text-green-300 text-xs mt-1">↑ 5% QoQ</div>
          </div>
        </div>

        {summary && (
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Executive Summary</h3>
            <p className="text-blue-100 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveSummary;

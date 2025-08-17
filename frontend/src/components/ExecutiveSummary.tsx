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
            <div className="text-blue-100 text-sm font-medium">Documents Processed</div>
            <div className="text-3xl font-bold">{totalDocuments}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Document Types</div>
            <div className="text-3xl font-bold">{keyMetrics?.document_types || 0}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Success Rate</div>
            <div className="text-3xl font-bold">{keyMetrics?.processing_success_rate || '0%'}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-blue-100 text-sm font-medium">Last Updated</div>
            <div className="text-sm font-medium">
              {keyMetrics?.last_updated 
                ? new Date(keyMetrics.last_updated).toLocaleTimeString()
                : 'N/A'
              }
            </div>
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
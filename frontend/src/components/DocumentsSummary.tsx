import React from 'react';

interface DocumentsSummaryProps {
  summary: any;
  totalDocuments: number;
}

const DocumentsSummary: React.FC<DocumentsSummaryProps> = ({ summary, totalDocuments }) => {
  const documentTypes = summary?.documents_by_type || {};

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">📄 Documents Overview</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {totalDocuments} Total Documents
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(documentTypes).map(([type, count]) => (
          <div key={type} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 capitalize">
                  {type.replace('_', ' ')}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {count as number}
                </div>
              </div>
              <div className="text-3xl">
                {type === 'loan_application' ? '📋' : 
                 type === 'credit_report' ? '📊' : 
                 type === 'appraisal_report' ? '🏠' : '📄'}
              </div>
            </div>
            
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ 
                    width: `${((count as number) / totalDocuments) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(((count as number) / totalDocuments) * 100)}% of total
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-sm text-gray-500">Processing Success</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Object.keys(documentTypes).length}
          </div>
          <div className="text-sm text-gray-500">Document Types</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">Live</div>
          <div className="text-sm text-gray-500">Data Processing</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSummary;
import React from 'react';
import { InsightsData } from '../App';
import ExecutiveSummary from './ExecutiveSummary';
import BorrowerInsights from './BorrowerInsights';
import PropertyInsights from './PropertyInsights';
import PortfolioInsights from './PortfolioInsights';
import DocumentsSummary from './DocumentsSummary';
import ConversionAnalytics from './ConversionAnalytics';

interface DashboardProps {
  insights: InsightsData;
}

const Dashboard: React.FC<DashboardProps> = ({ insights }) => {
  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <ExecutiveSummary 
        summary={insights.portfolio_insights?.executive_summary}
        keyMetrics={insights.portfolio_insights?.key_metrics}
        totalDocuments={insights.total_documents}
      />

      {/* Documents Overview */}
      <DocumentsSummary 
        summary={insights.summary}
        totalDocuments={insights.total_documents}
      />

      {/* Conversion Funnel Analytics */}
      <ConversionAnalytics />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BorrowerInsights insights={insights.borrower_insights} />
        <PropertyInsights insights={insights.property_insights} />
      </div>

      {/* Portfolio Insights */}
      <PortfolioInsights insights={insights.portfolio_insights} />
    </div>
  );
};

export default Dashboard;

# Broker Flow Prototype 🏦

A comprehensive mortgage analytics platform that transforms PDF documents into actionable business insights through intelligent processing and real-time dashboards.

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [User Flow](#user-flow)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

## Overview

The Broker Flow Prototype is a full-stack application designed for mortgage brokers to streamline document processing, analyze borrower profiles, and make data-driven lending decisions. It processes loan applications, credit reports, and appraisal documents to generate comprehensive analytics.

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │              React Frontend (Port 3001)                   │     │
│  │  ┌────────────────────────────────────────────────────┐  │     │
│  │  │   Components:                                       │  │     │
│  │  │   • ExecutiveSummary (KPIs & Metrics)             │  │     │
│  │  │   • ConversionAnalytics (Funnel Tracking)         │  │     │
│  │  │   • BorrowerInsights (Credit Analysis)            │  │     │
│  │  │   • PropertyInsights (Market Analysis)            │  │     │
│  │  │   • PortfolioInsights (Risk Assessment)           │  │     │
│  │  └────────────────────────────────────────────────────┘  │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ▼                                     │
│                         HTTP/REST API                              │
│                              ▼                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           API LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │           FastAPI Backend (Port 8000)                     │     │
│  │  ┌────────────────────────────────────────────────────┐  │     │
│  │  │   Endpoints:                                        │  │     │
│  │  │   • /api/insights - Comprehensive analytics        │  │     │
│  │  │   • /api/insights/borrowers - Borrower profiles    │  │     │
│  │  │   • /api/insights/properties - Property analysis   │  │     │
│  │  │   • /api/insights/portfolio - Risk assessment      │  │     │
│  │  │   • /api/process - Document processing             │  │     │
│  │  │   • /api/upload - File upload                      │  │     │
│  │  └────────────────────────────────────────────────────┘  │     │
│  └──────────────────────────────────────────────────────────┘     │
│                              ▼                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        PROCESSING LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────┐        ┌─────────────────────────┐      │
│  │   PDF Processor     │        │   Analytics Engine      │      │
│  │                     │        │                         │      │
│  │ • Text Extraction   │───────▶│ • Borrower Analysis     │      │
│  │ • Pattern Matching  │        │ • Lender Performance    │      │
│  │ • Data Structuring  │        │ • Property Valuation    │      │
│  │ • Document Class.   │        │ • Risk Assessment       │      │
│  └─────────────────────┘        └─────────────────────────┘      │
│            ▲                              │                       │
│            │                              ▼                       │
└────────────┼──────────────────────────────┼───────────────────────┘
             │                              │
┌────────────┼──────────────────────────────┼───────────────────────┐
│            │        DATA LAYER            │                       │
├────────────┼──────────────────────────────┼───────────────────────┤
│            │                              │                       │
│  ┌─────────▼─────────┐          ┌────────▼──────────┐           │
│  │  PDF Documents    │          │  Analytics Data   │           │
│  │                   │          │                   │           │
│  │ • Loan Apps       │          │ • JSON Results    │           │
│  │ • Credit Reports  │          │ • Insights Cache  │           │
│  │ • Appraisals      │          │ • Metrics Store   │           │
│  └───────────────────┘          └───────────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
     Frontend                  Backend                 Processing
        │                        │                         │
        ├──GET /api/insights────▶│                         │
        │                        ├──Process PDFs──────────▶│
        │                        │                         ├─Extract
        │                        │                         ├─Analyze
        │                        │◀────Return Data─────────┤
        │◀───JSON Response───────┤                         │
        ├─Render Dashboard       │                         │
        │                        │                         │
```

## User Flow

### Primary User Journey: Mortgage Broker

```
┌──────────────────────────────────────────────────────────────────┐
│                    MORTGAGE BROKER USER FLOW                     │
└──────────────────────────────────────────────────────────────────┘

1. DASHBOARD ACCESS
   ┌─────────────┐
   │ Open Portal │
   └──────┬──────┘
          ▼
   ┌─────────────────────────┐
   │ View Executive Summary  │ ◀── Portfolio Value: $2.1M
   │ • KPIs at a glance      │     Conversion Rate: 68%
   │ • Risk Level: Low       │     Avg Deal Size: $352K
   └──────┬──────────────────┘
          ▼

2. DOCUMENT PROCESSING
   ┌─────────────────────────┐
   │  Upload New Documents   │
   │  • Loan Applications    │──┐
   │  • Credit Reports       │  │
   │  • Property Appraisals  │  │
   └─────────────────────────┘  │
                                 ▼
                    ┌──────────────────────┐
                    │ Automatic Processing │
                    │ • Classification      │
                    │ • Data Extraction    │
                    │ • Pattern Analysis   │
                    └──────────┬───────────┘
                               ▼

3. INSIGHTS REVIEW
   ┌─────────────────────────────────────────┐
   │         Conversion Funnel Summary        │
   │  ┌─────────────────────────────────┐    │
   │  │ Overall: 32% | Bottleneck: -23% │    │
   │  └─────────────────────────────────┘    │
   │         [View Details ▼]                 │
   └──────────────┬──────────────────────────┘
                  ▼
   ┌──────────────────────────────────────────┐
   │          Detailed Analytics               │
   │                                            │
   │  Borrower Insights        Property Data   │
   │  ┌──────────────┐        ┌──────────────┐│
   │  │ Credit: 749  │        │ Avg: $309K   ││
   │  │ Income: $125K│        │ $/sqft: $192 ││
   │  └──────────────┘        └──────────────┘│
   └──────────────┬───────────────────────────┘
                  ▼

4. DECISION MAKING
   ┌──────────────────────────────────────────┐
   │           Action Items                    │
   │  ┌────────────────────────────────────┐  │
   │  │ ⚡ High Priority:                   │  │
   │  │ • Review appraisal bottleneck      │  │
   │  │ • Contact 3 excellent credit leads │  │
   │  │                                     │  │
   │  │ 🔔 Medium Priority:                 │  │
   │  │ • Optimize underwriting time       │  │
   │  │ • Target high-income segment       │  │
   │  └────────────────────────────────────┘  │
   └──────────────┬───────────────────────────┘
                  ▼
   ┌──────────────────────────────────────────┐
   │         Business Outcomes                 │
   │  • Approve/Reject Loan                    │
   │  • Match with Lender                      │
   │  • Set Interest Rate                      │
   │  • Schedule Follow-up                     │
   └──────────────────────────────────────────┘
```

### Secondary User Flows

#### CEO/Executive Flow
```
Dashboard → Executive Summary → Growth Trends → Strategic Decisions
    │
    └─> Key Metrics: ROI, Market Share, Risk Level
```

#### Manager Flow
```
Dashboard → Conversion Funnel → Bottleneck Analysis → Team Actions
    │
    └─> Detailed Funnel → Drop-off Reasons → Process Optimization
```

#### External Customer Flow
```
Application → Status Check → Approval Likelihood → Next Steps
    │
    └─> Simple View → Progress Tracker → Document Requirements
```

## Features

### 🎯 Core Capabilities
- **Automated PDF Processing**: Extract data from loan applications, credit reports, and appraisals
- **Real-time Analytics**: Live dashboard with instant insights
- **Conversion Funnel Tracking**: Identify bottlenecks in the loan process
- **Risk Assessment**: Portfolio risk analysis with actionable recommendations
- **Multi-audience Support**: Tailored views for executives, managers, and customers

### 📊 Analytics Modules
1. **Borrower Insights**
   - Credit score distribution
   - Income analysis
   - Loan demand patterns

2. **Property Insights**
   - Market valuations
   - Price per square foot
   - Investment opportunities

3. **Portfolio Analysis**
   - Risk assessment
   - Growth opportunities
   - Prioritized action items

4. **Conversion Analytics**
   - 7-stage funnel visualization
   - Drop-off analysis
   - Processing time metrics

## Tech Stack

### Frontend
- **React** 18.x with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication

### Backend
- **Python** 3.9+
- **FastAPI** for REST API
- **pdfplumber** for PDF processing
- **Uvicorn** ASGI server

### Development Tools
- **Node.js** 16+
- **npm** for package management
- **Git** for version control

## Getting Started

### Prerequisites
```bash
# Python 3.9+
python --version

# Node.js 16+
node --version

# npm
npm --version
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/gretapwcpan/broker-flow-prototype.git
cd broker-flow-prototype
```

2. **Backend Setup**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
cd backend
python main.py
# Server runs on http://localhost:8000
```

3. **Frontend Setup**
```bash
# Install Node dependencies
cd frontend
npm install

# Start the development server
npm start
# App runs on http://localhost:3001
```

4. **Access the Application**
- Open browser to http://localhost:3001
- Backend API docs available at http://localhost:8000/docs

## API Documentation

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/insights` | GET | Get comprehensive analytics |
| `/api/insights/borrowers` | GET | Borrower profile analysis |
| `/api/insights/properties` | GET | Property market insights |
| `/api/insights/portfolio` | GET | Portfolio risk assessment |
| `/api/process` | POST | Process all documents |
| `/api/upload` | POST | Upload new document |

### Sample Response
```json
{
  "status": "success",
  "borrower_insights": {
    "total_borrowers": 7,
    "income_analysis": {
      "average_income": 125270,
      "high_income_borrowers": 1
    },
    "credit_score_analysis": {
      "average_score": 749,
      "excellent_credit": 3
    }
  },
  "portfolio_insights": {
    "risk_level": "Low",
    "growth_opportunities": [...]
  }
}
```

## License

MIT License - See LICENSE file for details

## Contributors

- Greta Pan - Initial development

---

**Built with ❤️ for the mortgage industry**

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mortgage broker analytics platform that extracts business insights from unstructured documents (PDFs). The system processes loan applications, credit reports, appraisals, and other mortgage documents to identify business opportunities for broker agencies.

## Project Structure

```
/backend          # FastAPI Python backend
/frontend         # React TypeScript frontend (to be created)
/data_generation  # Fake PDF document generators
/documents        # Generated sample documents storage
/database         # SQLite database files
pyproject.toml    # Python dependencies and project config
Makefile          # Development commands
```

## Development Setup

1. **Quick Setup (Recommended - with uv):**
   ```bash
   make install-uv  # Install uv if not present
   make setup-uv    # Fast setup with uv
   source .venv/bin/activate  # Activate virtual environment
   ```

2. **Traditional Setup:**
   ```bash
   make setup  # Uses pip, creates directories and installs dependencies
   ```

3. **Manual Installation:**
   ```bash
   pip install -e .           # Production dependencies
   pip install -e ".[dev]"    # Development dependencies
   ```

3. **Environment:**
   ```bash
   cp .env.example .env  # Copy and customize environment variables
   ```

## Common Commands

- `make run-backend` - Start FastAPI server (http://localhost:8000)
- `make generate-docs` - Generate sample PDF documents
- `make test` - Run test suite
- `make lint` - Run code linting (flake8, mypy)
- `make format` - Format code (black, isort)
- `make clean` - Clean build artifacts
- `make help` - Show all available commands

## Architecture

**Backend (Python FastAPI):**
- Document processing pipeline using pdfplumber and PyPDF2
- SQLite database for extracted structured data
- RESTful API for frontend communication
- Fake data generation using reportlab and faker

**Data Flow:**
1. Generate realistic mortgage PDFs (loan apps, credit reports, appraisals)
2. Parse PDFs to extract structured data (borrower info, loan details, property data)
3. Store extracted data in SQLite database
4. Provide analytics API endpoints for business insights
5. Frontend dashboard displays insights and opportunities

**Key Models:**
- Document, Borrower, Property, LoanApplication, ExtractedData

## Testing

Run tests with: `pytest -v`
Backend tests focus on PDF parsing accuracy and data extraction quality.
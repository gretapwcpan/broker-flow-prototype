import pdfplumber
import re
from pathlib import Path
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MortgagePDFProcessor:
    """Extract structured data from mortgage-related PDFs"""
    
    def __init__(self):
        self.patterns = {
            'ssn': r'\b\d{3}-\d{2}-\d{4}\b',
            'phone': r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
            'email': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'currency': r'\$[\d,]+\.?\d*',
            'percentage': r'\d+\.?\d*%',
            'zip_code': r'\b\d{5}(-\d{4})?\b',
            'date': r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',
            'credit_score': r'\b[4-8]\d{2}\b',  # 400-899 range
        }
    
    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract all text content from PDF"""
        try:
            with pdfplumber.open(pdf_path) as pdf:
                text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                return text
        except Exception as e:
            logger.error(f"Error extracting text from {pdf_path}: {e}")
            return ""
    
    def extract_patterns(self, text: str) -> Dict[str, List[str]]:
        """Extract common patterns from text"""
        results = {}
        for pattern_name, pattern in self.patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            results[pattern_name] = list(set(matches))  # Remove duplicates
        return results
    
    def classify_document_type(self, text: str) -> str:
        """Determine document type based on content"""
        text_lower = text.lower()
        
        if any(keyword in text_lower for keyword in ['loan application', 'uniform residential', '1003']):
            return 'loan_application'
        elif any(keyword in text_lower for keyword in ['credit report', 'fico', 'experian', 'equifax']):
            return 'credit_report'
        elif any(keyword in text_lower for keyword in ['appraisal', 'property value', 'comparable sales']):
            return 'appraisal_report'
        elif any(keyword in text_lower for keyword in ['bank statement', 'account summary', 'balance']):
            return 'bank_statement'
        else:
            return 'unknown'
    
    def extract_loan_application_data(self, text: str) -> Dict[str, Any]:
        """Extract specific data from loan application"""
        data = {}
        
        # Extract borrower name (look for patterns like "Name: John Doe")
        name_match = re.search(r'Name:\s*([A-Za-z\s]+)', text)
        if name_match:
            data['borrower_name'] = name_match.group(1).strip()
        
        # Extract annual income
        income_match = re.search(r'Annual Income:\s*\$?([\d,]+)', text)
        if income_match:
            data['annual_income'] = int(income_match.group(1).replace(',', ''))
        
        # Extract loan amount
        loan_match = re.search(r'Loan Amount:\s*\$?([\d,]+)', text)
        if loan_match:
            data['loan_amount'] = int(loan_match.group(1).replace(',', ''))
        
        # Extract property address
        address_match = re.search(r'Property Address:\s*([^\n]+)', text)
        if address_match:
            data['property_address'] = address_match.group(1).strip()
        
        # Extract loan type
        loan_type_match = re.search(r'Loan Type:\s*([^\n]+)', text)
        if loan_type_match:
            data['loan_type'] = loan_type_match.group(1).strip()
        
        return data
    
    def extract_credit_report_data(self, text: str) -> Dict[str, Any]:
        """Extract specific data from credit report"""
        data = {}
        
        # Extract FICO score
        fico_match = re.search(r'FICO Score:\s*(\d+)', text)
        if fico_match:
            data['fico_score'] = int(fico_match.group(1))
        
        # Extract credit scores
        scores = re.findall(r'Score:\s*(\d+)', text)
        if scores:
            data['credit_scores'] = [int(score) for score in scores]
        
        # Extract account balances
        balances = re.findall(r'\$(\d{1,3}(?:,\d{3})*)', text)
        if balances:
            data['account_balances'] = [int(balance.replace(',', '')) for balance in balances]
        
        return data
    
    def extract_appraisal_data(self, text: str) -> Dict[str, Any]:
        """Extract specific data from appraisal report"""
        data = {}
        
        # Extract appraised value
        value_match = re.search(r'Appraised Value:\s*\$?([\d,]+)', text)
        if value_match:
            data['appraised_value'] = int(value_match.group(1).replace(',', ''))
        
        # Extract property details
        sqft_match = re.search(r'Square Feet:\s*([\d,]+)', text)
        if sqft_match:
            data['square_feet'] = int(sqft_match.group(1).replace(',', ''))
        
        bedrooms_match = re.search(r'Bedrooms:\s*(\d+)', text)
        if bedrooms_match:
            data['bedrooms'] = int(bedrooms_match.group(1))
        
        # Extract comparable sales
        comp_sales = re.findall(r'\$(\d{1,3}(?:,\d{3})*)', text)
        if comp_sales:
            data['comparable_sales'] = [int(sale.replace(',', '')) for sale in comp_sales]
        
        return data
    
    def process_document(self, pdf_path: str) -> Dict[str, Any]:
        """Process a single PDF document and extract all relevant data"""
        logger.info(f"Processing document: {pdf_path}")
        
        # Extract text
        text = self.extract_text_from_pdf(pdf_path)
        if not text:
            return {"error": "Could not extract text from PDF"}
        
        # Classify document
        doc_type = self.classify_document_type(text)
        
        # Extract patterns
        patterns = self.extract_patterns(text)
        
        # Extract specific data based on document type
        specific_data = {}
        if doc_type == 'loan_application':
            specific_data = self.extract_loan_application_data(text)
        elif doc_type == 'credit_report':
            specific_data = self.extract_credit_report_data(text)
        elif doc_type == 'appraisal_report':
            specific_data = self.extract_appraisal_data(text)
        
        result = {
            'filename': Path(pdf_path).name,
            'document_type': doc_type,
            'text_length': len(text),
            'patterns': patterns,
            'specific_data': specific_data,
            'processed_at': datetime.utcnow().isoformat()
        }
        
        logger.info(f"Processed {doc_type} document with {len(text)} characters")
        return result
    
    def process_directory(self, directory_path: str) -> List[Dict[str, Any]]:
        """Process all PDF files in a directory"""
        directory = Path(directory_path)
        results = []
        
        for pdf_file in directory.glob("*.pdf"):
            result = self.process_document(str(pdf_file))
            results.append(result)
        
        return results

if __name__ == "__main__":
    # Test the processor
    processor = MortgagePDFProcessor()
    results = processor.process_directory("./documents")
    
    for result in results:
        print(f"\n--- {result['filename']} ---")
        print(f"Type: {result['document_type']}")
        print(f"Text length: {result['text_length']}")
        if result['specific_data']:
            print("Extracted data:")
            for key, value in result['specific_data'].items():
                print(f"  {key}: {value}")
        print(f"Patterns found: {list(result['patterns'].keys())}")
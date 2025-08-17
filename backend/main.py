from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from pathlib import Path
import os
import logging
from pdf_processor import MortgagePDFProcessor
from analytics_engine import MortgageAnalyticsEngine

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Broker Flow Analytics",
    description="Mortgage broker analytics platform for extracting business insights from documents",
    version="1.0.0"
)

# Initialize processors
pdf_processor = MortgagePDFProcessor()
analytics_engine = MortgageAnalyticsEngine()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001", 
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001", 
        "http://0.0.0.0:3000",
        "http://0.0.0.0:3001", 
        "http://192.168.50.170:3001"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Broker Flow Analytics API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/documents")
async def list_documents():
    """List all processed documents"""
    documents_dir = Path("../documents")
    if not documents_dir.exists():
        return {"documents": []}
    
    documents = []
    for file_path in documents_dir.glob("*.pdf"):
        documents.append({
            "filename": file_path.name,
            "size": file_path.stat().st_size,
            "created": file_path.stat().st_ctime
        })
    
    return {"documents": documents}

@app.post("/api/process")
async def process_all_documents():
    """Process all documents and return extracted data"""
    try:
        logger.info("Processing all documents...")
        processed_docs = pdf_processor.process_directory("../documents")
        
        if not processed_docs:
            raise HTTPException(status_code=404, detail="No documents found to process")
        
        logger.info(f"Successfully processed {len(processed_docs)} documents")
        return {
            "status": "success",
            "processed_count": len(processed_docs),
            "documents": processed_docs
        }
    except Exception as e:
        logger.error(f"Error processing documents: {e}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.get("/api/insights/borrowers")
async def get_borrower_insights():
    """Get borrower profile insights"""
    try:
        processed_docs = pdf_processor.process_directory("../documents")
        insights = analytics_engine.analyze_borrower_profiles(processed_docs)
        return insights
    except Exception as e:
        logger.error(f"Error generating borrower insights: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/insights/lenders")
async def get_lender_insights():
    """Get lender performance insights"""
    try:
        processed_docs = pdf_processor.process_directory("../documents")
        insights = analytics_engine.analyze_lender_performance(processed_docs)
        return insights
    except Exception as e:
        logger.error(f"Error generating lender insights: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/insights/properties")
async def get_property_insights():
    """Get property market insights"""
    try:
        processed_docs = pdf_processor.process_directory("../documents")
        insights = analytics_engine.analyze_property_market(processed_docs)
        return insights
    except Exception as e:
        logger.error(f"Error generating property insights: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/insights/portfolio")
async def get_portfolio_insights():
    """Get comprehensive portfolio insights"""
    try:
        processed_docs = pdf_processor.process_directory("../documents")
        insights = analytics_engine.generate_portfolio_insights(processed_docs)
        return insights
    except Exception as e:
        logger.error(f"Error generating portfolio insights: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/insights")
async def get_all_insights():
    """Get all business insights from processed documents"""
    try:
        processed_docs = pdf_processor.process_directory("../documents")
        
        if not processed_docs:
            return {
                "status": "no_data",
                "message": "No documents available for analysis"
            }
        
        # Generate all insights
        borrower_insights = analytics_engine.analyze_borrower_profiles(processed_docs)
        lender_insights = analytics_engine.analyze_lender_performance(processed_docs)
        property_insights = analytics_engine.analyze_property_market(processed_docs)
        portfolio_insights = analytics_engine.generate_portfolio_insights(processed_docs)
        
        return {
            "status": "success",
            "total_documents": len(processed_docs),
            "borrower_insights": borrower_insights,
            "lender_insights": lender_insights,
            "property_insights": property_insights,
            "portfolio_insights": portfolio_insights,
            "summary": {
                "documents_by_type": {
                    doc_type: len([d for d in processed_docs if d['document_type'] == doc_type])
                    for doc_type in set(d['document_type'] for d in processed_docs)
                }
            }
        }
    except Exception as e:
        logger.error(f"Error generating insights: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    try:
        # Save uploaded file
        documents_dir = Path("../documents")
        documents_dir.mkdir(exist_ok=True)
        
        file_path = documents_dir / file.filename
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process the uploaded document
        result = pdf_processor.process_document(str(file_path))
        
        return {
            "status": "success",
            "message": f"Document {file.filename} uploaded and processed successfully",
            "processing_result": result
        }
    except Exception as e:
        logger.error(f"Error uploading document: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

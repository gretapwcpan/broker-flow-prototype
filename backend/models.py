from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./database/broker_flow.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    document_type = Column(String)  # loan_application, credit_report, appraisal, etc.
    file_path = Column(String)
    processed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Borrower(Base):
    __tablename__ = "borrowers"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    ssn = Column(String)  # encrypted/hashed in real implementation
    email = Column(String)
    phone = Column(String)
    annual_income = Column(Float)
    credit_score = Column(Integer)
    employment_status = Column(String)
    employer = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    property_type = Column(String)  # single_family, condo, townhouse, etc.
    appraised_value = Column(Float)
    square_feet = Column(Integer)
    bedrooms = Column(Integer)
    bathrooms = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class LoanApplication(Base):
    __tablename__ = "loan_applications"
    
    id = Column(Integer, primary_key=True, index=True)
    borrower_id = Column(Integer)
    property_id = Column(Integer)
    loan_amount = Column(Float)
    loan_type = Column(String)  # conventional, fha, va, jumbo, etc.
    loan_purpose = Column(String)  # purchase, refinance, cash_out
    down_payment = Column(Float)
    interest_rate = Column(Float)
    loan_term = Column(Integer)  # in months
    status = Column(String)  # pending, approved, denied, closed
    lender = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ExtractedData(Base):
    __tablename__ = "extracted_data"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer)
    entity_type = Column(String)  # name, amount, date, address, etc.
    entity_value = Column(Text)
    confidence_score = Column(Float)
    page_number = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
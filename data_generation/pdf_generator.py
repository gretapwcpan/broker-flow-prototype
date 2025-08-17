from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from faker import Faker
import random
from datetime import datetime, timedelta
import os

fake = Faker()

class MortgagePDFGenerator:
    def __init__(self, output_dir="../documents"):
        self.output_dir = output_dir
        self.styles = getSampleStyleSheet()
        os.makedirs(output_dir, exist_ok=True)
    
    def generate_loan_application(self, filename=None):
        """Generate a fake loan application (1003 form)"""
        if not filename:
            filename = f"loan_application_{fake.uuid4()[:8]}.pdf"
        
        filepath = os.path.join(self.output_dir, filename)
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        story = []
        
        # Header
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=16,
            spaceAfter=30,
            alignment=1  # Center
        )
        
        story.append(Paragraph("UNIFORM RESIDENTIAL LOAN APPLICATION", title_style))
        story.append(Spacer(1, 20))
        
        # Borrower Information
        borrower_data = {
            "Name": f"{fake.first_name()} {fake.last_name()}",
            "SSN": fake.ssn(),
            "Date of Birth": fake.date_of_birth(minimum_age=25, maximum_age=65).strftime("%m/%d/%Y"),
            "Email": fake.email(),
            "Phone": fake.phone_number(),
            "Present Address": fake.address(),
            "Annual Income": f"${fake.random_int(min=40000, max=200000):,}",
            "Employment Status": random.choice(["Employed", "Self-Employed", "Retired"]),
            "Employer": fake.company(),
            "Credit Score": fake.random_int(min=580, max=850)
        }
        
        story.append(Paragraph("<b>BORROWER INFORMATION</b>", self.styles['Heading2']))
        for key, value in borrower_data.items():
            story.append(Paragraph(f"<b>{key}:</b> {value}", self.styles['Normal']))
        
        story.append(Spacer(1, 20))
        
        # Property Information
        property_data = {
            "Property Address": fake.address(),
            "Property Type": random.choice(["Single Family", "Condominium", "Townhouse", "2-4 Family"]),
            "Occupancy": random.choice(["Primary Residence", "Investment Property", "Second Home"]),
            "Property Value": f"${fake.random_int(min=200000, max=800000):,}",
            "Square Feet": f"{fake.random_int(min=1000, max=4000):,}",
            "Year Built": fake.random_int(min=1950, max=2020),
            "Bedrooms": fake.random_int(min=2, max=5),
            "Bathrooms": random.choice([1.5, 2, 2.5, 3, 3.5, 4])
        }
        
        story.append(Paragraph("<b>PROPERTY INFORMATION</b>", self.styles['Heading2']))
        for key, value in property_data.items():
            story.append(Paragraph(f"<b>{key}:</b> {value}", self.styles['Normal']))
        
        story.append(Spacer(1, 20))
        
        # Loan Information
        loan_amount = fake.random_int(min=150000, max=600000)
        down_payment = fake.random_int(min=10000, max=120000)
        
        loan_data = {
            "Loan Amount": f"${loan_amount:,}",
            "Down Payment": f"${down_payment:,}",
            "Loan Type": random.choice(["Conventional", "FHA", "VA", "USDA", "Jumbo"]),
            "Loan Purpose": random.choice(["Purchase", "Refinance", "Cash-Out Refinance"]),
            "Loan Term": random.choice(["30 Year Fixed", "15 Year Fixed", "5/1 ARM", "7/1 ARM"]),
            "Interest Rate": f"{fake.random_int(min=300, max=750)/100:.3f}%",
            "Application Date": fake.date_between(start_date='-30d', end_date='today').strftime("%m/%d/%Y")
        }
        
        story.append(Paragraph("<b>LOAN DETAILS</b>", self.styles['Heading2']))
        for key, value in loan_data.items():
            story.append(Paragraph(f"<b>{key}:</b> {value}", self.styles['Normal']))
        
        doc.build(story)
        return filepath
    
    def generate_credit_report(self, filename=None):
        """Generate a fake credit report"""
        if not filename:
            filename = f"credit_report_{fake.uuid4()[:8]}.pdf"
        
        filepath = os.path.join(self.output_dir, filename)
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        story = []
        
        # Header
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=16,
            spaceAfter=30,
            alignment=1
        )
        
        story.append(Paragraph("CREDIT REPORT", title_style))
        story.append(Spacer(1, 20))
        
        # Personal Information
        personal_info = {
            "Name": f"{fake.first_name()} {fake.last_name()}",
            "SSN": fake.ssn(),
            "Date of Birth": fake.date_of_birth(minimum_age=25, maximum_age=65).strftime("%m/%d/%Y"),
            "Address": fake.address(),
            "Report Date": datetime.now().strftime("%m/%d/%Y")
        }
        
        story.append(Paragraph("<b>PERSONAL INFORMATION</b>", self.styles['Heading2']))
        for key, value in personal_info.items():
            story.append(Paragraph(f"<b>{key}:</b> {value}", self.styles['Normal']))
        
        story.append(Spacer(1, 20))
        
        # Credit Scores
        fico_score = fake.random_int(min=580, max=850)
        story.append(Paragraph("<b>CREDIT SCORES</b>", self.styles['Heading2']))
        story.append(Paragraph(f"<b>FICO Score:</b> {fico_score}", self.styles['Normal']))
        story.append(Paragraph(f"<b>Experian Score:</b> {fico_score + fake.random_int(-15, 15)}", self.styles['Normal']))
        story.append(Paragraph(f"<b>Equifax Score:</b> {fico_score + fake.random_int(-10, 10)}", self.styles['Normal']))
        story.append(Paragraph(f"<b>TransUnion Score:</b> {fico_score + fake.random_int(-12, 12)}", self.styles['Normal']))
        
        story.append(Spacer(1, 20))
        
        # Credit Accounts
        story.append(Paragraph("<b>CREDIT ACCOUNTS</b>", self.styles['Heading2']))
        
        accounts_data = []
        accounts_data.append(['Account Type', 'Creditor', 'Balance', 'Credit Limit', 'Payment Status'])
        
        for _ in range(fake.random_int(3, 8)):
            account_type = random.choice(['Credit Card', 'Auto Loan', 'Mortgage', 'Personal Loan'])
            creditor = fake.company()
            balance = fake.random_int(0, 25000)
            credit_limit = balance + fake.random_int(1000, 15000) if account_type == 'Credit Card' else 'N/A'
            status = random.choice(['Current', 'Current', 'Current', '30 Days Late'])
            
            accounts_data.append([
                account_type,
                creditor,
                f"${balance:,}",
                f"${credit_limit:,}" if credit_limit != 'N/A' else 'N/A',
                status
            ])
        
        accounts_table = Table(accounts_data)
        accounts_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(accounts_table)
        
        doc.build(story)
        return filepath
    
    def generate_appraisal_report(self, filename=None):
        """Generate a fake property appraisal report"""
        if not filename:
            filename = f"appraisal_report_{fake.uuid4()[:8]}.pdf"
        
        filepath = os.path.join(self.output_dir, filename)
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        story = []
        
        # Header
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=16,
            spaceAfter=30,
            alignment=1
        )
        
        story.append(Paragraph("PROPERTY APPRAISAL REPORT", title_style))
        story.append(Spacer(1, 20))
        
        # Property Details
        appraised_value = fake.random_int(min=200000, max=800000)
        property_info = {
            "Property Address": fake.address(),
            "Appraised Value": f"${appraised_value:,}",
            "Appraisal Date": fake.date_between(start_date='-90d', end_date='today').strftime("%m/%d/%Y"),
            "Appraiser": f"{fake.first_name()} {fake.last_name()}, MAI",
            "Property Type": random.choice(["Single Family Residence", "Condominium", "Townhouse"]),
            "Square Feet": f"{fake.random_int(min=1000, max=4000):,}",
            "Lot Size": f"{fake.random_int(min=5000, max=20000):,} sq ft",
            "Year Built": fake.random_int(min=1950, max=2020),
            "Bedrooms": fake.random_int(min=2, max=5),
            "Bathrooms": random.choice([1.5, 2, 2.5, 3, 3.5, 4]),
            "Garage": random.choice(["2-Car Attached", "1-Car Attached", "2-Car Detached", "None"])
        }
        
        story.append(Paragraph("<b>PROPERTY INFORMATION</b>", self.styles['Heading2']))
        for key, value in property_info.items():
            story.append(Paragraph(f"<b>{key}:</b> {value}", self.styles['Normal']))
        
        story.append(Spacer(1, 20))
        
        # Comparable Sales
        story.append(Paragraph("<b>COMPARABLE SALES</b>", self.styles['Heading2']))
        
        comp_data = []
        comp_data.append(['Address', 'Sale Date', 'Sale Price', 'Sq Ft', 'Price/Sq Ft'])
        
        for i in range(3):
            sale_price = appraised_value + fake.random_int(-50000, 50000)
            sq_ft = fake.random_int(min=900, max=4200)
            price_per_sqft = round(sale_price / sq_ft, 2)
            
            comp_data.append([
                fake.address(),
                fake.date_between(start_date='-180d', end_date='-30d').strftime("%m/%d/%Y"),
                f"${sale_price:,}",
                f"{sq_ft:,}",
                f"${price_per_sqft}"
            ])
        
        comp_table = Table(comp_data)
        comp_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(comp_table)
        
        doc.build(story)
        return filepath
    
    def generate_sample_documents(self, count=5):
        """Generate a mix of sample documents"""
        generated_files = []
        
        for i in range(count):
            doc_type = random.choice(['loan_application', 'credit_report', 'appraisal_report'])
            
            if doc_type == 'loan_application':
                filepath = self.generate_loan_application()
            elif doc_type == 'credit_report':
                filepath = self.generate_credit_report()
            else:
                filepath = self.generate_appraisal_report()
            
            generated_files.append(filepath)
            print(f"Generated: {filepath}")
        
        return generated_files

if __name__ == "__main__":
    generator = MortgagePDFGenerator()
    files = generator.generate_sample_documents(10)
    print(f"Generated {len(files)} sample documents")
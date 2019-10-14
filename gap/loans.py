import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import datetime
import string,random



class LoanConstant(ndb.Expando):    
    loan_id = ndb.StringProperty()
    uid = ndb.StringProperty()    
    company_id = ndb.StringProperty()
    employee_code = ndb.StringProperty()
    active_loan = ndb.BooleanProperty(default=False)

    def create_loan_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def retriveActiveLoan(self,uid):
        loan_constant_instance = LoanConstant.query(LoanConstant.uid == uid , LoanConstant.active_loan == True)
        loan_constant_list = loan_constant_instance.fetch()

        return loan_constant_list

class Loan(LoanConstant):
    loaned_amount = ndb.StringProperty(default='0')
    date_loaned = ndb.StringProperty()
    payment_amount = ndb.IntegerProperty(default='0')
    balance = ndb.IntegerProperty(default='0')
    payment_date = ndb.StringProperty()
    


class LoanApplicantDetails(LoanConstant):        
    title = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()
    id = ndb.StringProperty()
    dob = ndb.StringProperty()
    nationality = ndb.StringProperty()

    house_number = ndb.StringProperty()
    street_name = ndb.StringProperty()
    city = ndb.StringProperty()
    province = ndb.StringProperty()
    country = ndb.StringProperty()
    postal_code = ndb.StringProperty()

    box_number = ndb.StringProperty()
    postal_city = ndb.StringProperty()
    postal_province = ndb.StringProperty()
    postal_country = ndb.StringProperty()
    postal_postal_code = ndb.StringProperty()


    tel = ndb.StringProperty()
    cell = ndb.StringProperty()
    email = ndb.StringProperty()

    nok_names = ndb.StringProperty()
    nok_address = ndb.StringProperty()
    nok_cell = ndb.StringProperty()

    allps = ndb.StringProperty()

    def addLoanApplication(self,applicant_details):
            id = applicant_details['id']

            applicant_request = LoanApplicantDetails.query( LoanApplicantDetails.id == id)
            applicant_list = applicant_request.fetch()

            if len(applicant_list) > 0:
                return ''
            else:
                this_applicant = LoanApplicantDetails()
                this_applicant.id = id
                this_applicant.uid = applicant_details['uid']
                this_applicant.employee_code = applicant_details['employee_code']
                this_applicant.company_id = applicant_details['company_id']

                this_applicant.loan_id = applicant_details['loan_id']
                this_applicant.title = applicant_details['title']
                this_applicant.surname = applicant_details['surname']
                this_applicant.names = applicant_details['names']
                this_applicant.dob = applicant_details['dob']
                this_applicant.nationality = applicant_details['nationality']              

                this_applicant.put()

                return this_applicant

    def returnPersonalDetailsByCompanyID(self,company_id):

        application_details_query = LoanApplicantDetails.query(LoanApplicantDetails.company_id == company_id)
        applicant_details_list = application_details_query.fetch()

        return applicant_details_list

    def returnPersonalDetailsByEmployeeCode(self,employee_code):

        application_details_query = LoanApplicantDetails.query(LoanApplicantDetails.employee_code == employee_code)
        applicant_details_list = application_details_query.fetch()

        return applicant_details_list

    def returnPersonalDetailsByUser(self,uid):
        application_details_query = LoanApplicantDetails.query(LoanApplicantDetails.uid == uid)
        applicant_details_list = application_details_query.fetch()

        return applicant_details_list

    def removePersonalDetailsByLoanID(self,loan_id):
        application_details_query = LoanApplicantDetails.query(LoanApplicantDetails.loan_id == loan_id)
        applicant_details_list = application_details_query.fetch()

        for loan in applicant_details_list:
            loan.key.delete() 

        return True



class LoanEmploymentDetails(LoanConstant):

    employer = ndb.StringProperty()
    employee_number = ndb.StringProperty()
    employee_kind =ndb.StringProperty()
    department = ndb.StringProperty()
    contract = ndb.StringProperty()
    date_employed = ndb.StringProperty()
    stand_number = ndb.StringProperty()
    street_name = ndb.StringProperty()
    city = ndb.StringProperty()
    province = ndb.StringProperty()
    country = ndb.StringProperty()
    postal_code = ndb.StringProperty()
    tel = ndb.StringProperty()


class CreditProvider(LoanConstant):

    credit_provider = ndb.StringProperty(default="Midey Financial Solutions")
    address = ndb.StringProperty(default=""" Mashapa Complex, 1st Floor, Office No. B12 &amp; 14 , Thohoyandou, 0950,
    Tel : 015 962 0976""")
    ncr = ndb.StringProperty(default="NCRCP5905")
    branch_name = ndb.StringProperty()
    loan_officer = ndb.StringProperty() # Reference Number of the Employee Who created the Loan
    date_signed = ndb.StringProperty()

class IncomeExpense(LoanConstant):


    income_after_deduction = ndb.IntegerProperty()
    overtime = ndb.IntegerProperty()
    commission = ndb.IntegerProperty()
    other_income = ndb.IntegerProperty()
    total_income = ndb.IntegerProperty()

    bond_repayments = ndb.IntegerProperty()
    loan_installments = ndb.IntegerProperty()
    electricity = ndb.IntegerProperty()
    insurance = ndb.IntegerProperty()
    maintenance = ndb.IntegerProperty()
    transport = ndb.IntegerProperty()
    necessities = ndb.IntegerProperty()
    domestic_wages = ndb.IntegerProperty()
    education = ndb.IntegerProperty()
    other_expenses = ndb.IntegerProperty()
    total_expenses = ndb.IntegerProperty()
    affordable = ndb.IntegerProperty()


class PayTO(LoanConstant):
    
    bank_name = ndb.StringProperty()
    account_holder = ndb.StringProperty()
    account_number = ndb.StringProperty()
    account_type = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    branch_name = ndb.StringProperty()
    notes = ndb.StringProperty()

 
class PaymentTOClient(LoanConstant):
    amount_requested = ndb.IntegerProperty()
    amount_paid = ndb.IntegerProperty()
    balance = ndb.IntegerProperty()
    datetime_paid = ndb.StringProperty()

class PaymentFromClient(LoanConstant):
    strAmountOwed = ndb.IntegerProperty()
    amount_paid = ndb.IntegerProperty()
    balance = ndb.IntegerProperty()

    
class AdvancedAmount(LoanConstant):
    
    credit_advanced_capital = ndb.IntegerProperty()
    initiation_fee = ndb.IntegerProperty()
    monthly_service_fee = ndb.IntegerProperty()
    monthly_interest = ndb.IntegerProperty()
    freequency = ndb.StringProperty()
    number_installments = ndb.IntegerProperty()
    loan_terms = ndb.StringProperty()
    amount_advanced_to_client = ndb.IntegerProperty()
    monthly_installments = ndb.IntegerProperty()
    total_installments = ndb.IntegerProperty()
    date_taken = ndb.StringProperty()
    advance_reference = ndb.IntegerProperty()
    loan_paid_status = ndb.BooleanProperty(default=False) # If True it means the loan amount has been paid to client

    payment_date = ndb.IntegerProperty(default=30)

    total_amount_repaid = ndb.IntegerProperty()
    advanced_index = ndb.IntegerProperty()

    installments_paid = ndb.BooleanProperty(default=False)
    outstanding = ndb.BooleanProperty(default=False)
    account_change = ndb.BooleanProperty(default=False)





class LoanBankingDetails(LoanConstant):
    account_holder = ndb.StringProperty()
    account_number = ndb.StringProperty()
    bank = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    account_type = ndb.StringProperty()
    commencement_date = ndb.StringProperty()

class LoanReceiver(LoanConstant):
    credit_receiver = ndb.StringProperty()
    stand_number = ndb.StringProperty()
    street_name = ndb.StringProperty()
    city = ndb.StringProperty()
    province = ndb.StringProperty()
    country = ndb.StringProperty()
    postal_code = ndb.StringProperty()

    work_tel = ndb.StringProperty()
    home_tel = ndb.StringProperty()
    cell = ndb.StringProperty()

    id = ndb.StringProperty()
    employer = ndb.StringProperty()
    date_received = ndb.StringProperty()

class LoanNotes(LoanConstant):
    notes = ndb.StringProperty()
    subject = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()

    date_taken = ndb.StringProperty()

 
########################################################################################################################
############ Handlers
########################################################################################################################

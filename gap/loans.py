import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))


class LoanConstant(ndb.Expando):
    
    account_number = ndb.StringProperty()
    uid = ndb.StringProperty()
    employee_code = ndb.StringProperty()


    def writeAccountNumber(self, strinput):
        try:

            strinput = str(strinput)

            if not (strinput == None):
                self.account_number = strinput
                return True
            else:
                return False
        except:
            return False

    def writeReference(self, strinput):
        try:
            strinput = str(strinput)
            if not (strinput == None):
                self.uid = strinput
                return True
            else:
                return False
        except:
            return False
    def writeEmployeeCode(self, strinput):
        try:
            strinput = str(strinput)
            if not (strinput == None):
                self.employee_code = strinput
                return True
            else:
                return False
        except:
            return False
class ActiveLoan(LoanConstant):
    active_loan = ndb.BooleanProperty(default=False)
    def setActiveLoan(self,uid,account_number):
        try:

            findRequest = ActiveLoan.query(ActiveLoan.uid == uid,ActiveLoan.active_loan == True)
            ActiveLoansList = findRequest.fetch()

            for Active in ActiveLoansList:
                Active.key.delete()

            self.account_number = account_number
            self.uid = uid
            self.active_loan = True
            self.put()
            return True
        except:
            return False
class Loan(LoanConstant):
    loaned_amount = ndb.StringProperty()
    date_loaned = ndb.DateProperty()
    payment_amount = ndb.IntegerProperty()
    balance = ndb.IntegerProperty()
    payment_date = ndb.StringProperty()
    active_loan = ndb.BooleanProperty(default=False)

    def writeLoanedAmount(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.loaned_amount = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeDateLoaned(self,strinput):
        try:

            if not(strinput == None):
                self.date_loaned = strinput
                return True
            else:
                return False
        except:
            return False
    def writePaymentAmount(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.payment_amount = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeBalance(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.balance = strinput
                return True
            else:
                return False
        except:
            return False
    def writePaymentDate(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.payment_date = int(strinput)
                return True
            else:
                return False
        except:
            return False

class LoanApplicantDetails(LoanConstant):

    title = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()
    id = ndb.StringProperty()
    dob = ndb.DateProperty()
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


    def writeTitle(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.title = strinput
                return True
            else:
                return False
        except:
            return False
    def writeBoxNumber(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.box_number = strinput
                return True
            else:
                return False
        except:
            return False
    def writePostalCityTown(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.postal_city = strinput
                return True
            else:
                return False
        except:
            return False
    def writePostalProvince(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.postal_province = strinput
                return True
            else:
                return False

        except:
            return False
    def writePostalCountry(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.postal_country = strinput
                return True
            else:
                return False

        except:
            return False
    def writePostalPostalCode(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.postal_postal_code = strinput
                return True
            else:
                return False
        except:
            return False
    def writeFullNames(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.names = strinput
                return True
            else:
                return False
        except:
            return False
    def writeSurname(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.surname = strinput
                return True
            else:
                return False
        except:
            return False
    def writeIDNumber(self,strinput):
        try:
            strinput  = str(strinput)

            if not(strinput == None):
                self.id = strinput
                return True
            else:
                return False
        except:
            return False
    def writeDateOfBirth(self,strinput):
        try:
            if not(strinput == None):
                self.dob = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNationality(self,strinput):
        try:
            strinput = str(strinput)


            if not(strinput == None):
                self.nationality = strinput
                return True
            else:
                return False
        except:
            return False
    def writeHouseNumber(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.house_number = strinput
                return True
            else:
                return False
        except:
            return False
    def writeStreetName(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.street_name = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCityTown(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.city = strinput
                return True
            else:
                return False
        except:
            return False
    def writeProvince(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.province = strinput
                return True
            else:
                return False

        except:
            return False
    def writeCountry(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.country = strinput
                return True
            else:
                return False
        except:
            return False
    def writePostalCode(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.postal_code = strinput
                return True
            else:
                return False
        except:
            return False
    def writeTel(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.tel = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCell(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.cell = strinput
                return True
            else:
                return False
        except:
            return False
    def writeEmail(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.email = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNextOfKinNames(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.nok_names = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNextOfKinAddress(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.nok_address = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNextOfKinCell(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.nok_cell = strinput
                return True
            else:
                return False
        except:
            return False
    def writeALLPS(self, strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.allps = strinput
                return True
            else:
                return False
        except:
            return False
class LoanEmploymentDetails(LoanConstant):

    employer = ndb.StringProperty()
    employee_number = ndb.StringProperty()
    employee_kind =ndb.StringProperty()
    department = ndb.StringProperty()
    contract = ndb.StringProperty()
    date_employed = ndb.DateProperty()
    stand_number = ndb.StringProperty()
    street_name = ndb.StringProperty()
    city = ndb.StringProperty()
    province = ndb.StringProperty()
    country = ndb.StringProperty()
    postal_code = ndb.StringProperty()
    tel = ndb.StringProperty()

    def writeEmployeeKind(self,strinput):
        try:
            strinput = str(strinput)
            if strinput == "government" or strinput == "private" or strinput== "pension" or strinput == "grant":
                self.employee_kind = strinput
                return True
            else:
                return False
        except:
            return False

    def writeNameOfEmployer(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.employer = strinput
                return True
            else:
                return False
        except:
            return False

    def writeEmployeeNumber(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.employee_number = strinput
                return True
            else:
                return False
        except:
            return False

    def writeDepartment(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.department = strinput
                return True
            else:
                return False
        except:
            return False

    def writeContract(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.contract = strinput
                return True
            else:
                return False
        except:
            return False

    def writeDateJoined(self,strinput):
        try:
            if not(strinput == None):
                self.date_employed = strinput
                return True
            else:
                return False
        except:
            return False

    def writeStandNumber(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.stand_number = strinput
                return True
            else:
                return False
        except:
            return False

    def writeStreetName(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.street_name = strinput
                return True
            else:
                return False
        except:
            return False

    def writeTownCity(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.city = strinput
                return True
            else:
                return False
        except:
            return False

    def writeProvince(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.province = strinput
                return True
            else:
                return False
        except:
            return False

    def writeCountry(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.country = strinput
                return True
            else:
                return False
        except:
            return False

    def writePostalCode(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.postal_code = strinput
                return True
            else:
                return False
        except:
            return False

class CreditProvider(LoanConstant):

    credit_provider = ndb.StringProperty(default="Midey Financial Solutions")
    address = ndb.StringProperty(default=""" Mashapa Complex, 1st Floor, Office No. B12 &amp; 14 , Thohoyandou, 0950,
    Tel : 015 962 0976""")
    ncr = ndb.StringProperty(default="NCRCP5905")
    branch_name = ndb.StringProperty()
    loan_officer = ndb.StringProperty() # Reference Number of the Employee Who created the Loan
    date_signed = ndb.StringProperty()

    def writeBranchName(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.branch_name = strinput
                return True
            else:
                return False
        except:
            return False

    def writeLoanOfficer(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.loan_officer = strinput
                return True
            else:
                return False
        except:
            return False
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


    def writeIncomeAfterDeduction(self,strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.income_after_deduction = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeOverTime(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.overtime = int(strinput)
                return True
            else:
                return False

        except:
            return False
    def writeCommission(self,strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.commission = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeOtherIncome(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.other_income = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeTotalIncome(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.total_income = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeChildrenMaintanance(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.maintenance = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeBondRepayments(self,strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.bond_repayments = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeLoanInstallements(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.loan_installments = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeWaterElectricity(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.electricity = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeInsurance(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.insurance = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeVehicleMaintenance(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.transport = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeBasicNecessity(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.necessities = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeDomesticWages(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.domestic_wages = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeEducation(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.education = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeOtherExpenses(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.other_expenses = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeTotalExpenses(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.total_expenses = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeAffordability(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.affordable = int(strinput)
                return True
            else:
                return False
        except:
            return False
class PayTO(LoanConstant):
    
    bank_name = ndb.StringProperty()
    account_holder = ndb.StringProperty()
    account_number = ndb.StringProperty()
    account_type = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    branch_name = ndb.StringProperty()
    notes = ndb.StringProperty()

    def writeBankName(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.bank_name = strinput
                return True
            else:
                return False
        except:
            return False

    def writeAccountHolder(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.account_holder = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBankAccountNumber(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.account_number = strinput
                return True
            else:
                return False
        except:
            return False

    def writeAccountType(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.account_type = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBranchCode(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.branch_code = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBranchName(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.branch_name = strinput
                return True
            else:
                return False
        except:
            return False

    def writeNotes(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.notes = strinput
                return True
            else:
                return False

        except:
            return False
class CompanyCoffers(ndb.Expando):
    uid = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    cash_available = ndb.IntegerProperty()
    cash_in_bank = ndb.IntegerProperty()

    def writeReference(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.uid = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBranchCode(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.branch_code = strinput
                return True
            else:
                return False
        except:
            return False

    def writeCashAvailable(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.cash_available = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def writeCashInBank(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.cash_in_bank = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def depositCashInBank(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_in_bank = self.cash_in_bank + int(strinput)
                return True
            else:
                return False
        except:
            return False

    def withdrawCashFromBank(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_in_bank = self.cash_in_bank - int(strinput)
                return True
            else:
                return False
        except:
            return False

    def depositCashAvailable(self,strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.cash_available = self.cash_available + int(strinput)
                return True
            else:
                return False
        except:
            return False

    def withDrawCashAvailable(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_available = self.cash_available - int(strinput)
                return True
            else:
                return False
        except:
            return False
class PaymentTOClient(LoanConstant):
    amount_requested = ndb.IntegerProperty()
    amount_paid = ndb.IntegerProperty()
    balance = ndb.IntegerProperty()
    datetime_paid = ndb.StringProperty()

    def writeAmountRequested(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.amount_requested = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def writeAmountPaid(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.amount_paid = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def writeBalance(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.balance = int(strinput)
                return True
            else:
                return False
        except:
            return False
class PaymentFromClient(LoanConstant):
    strAmountOwed = ndb.IntegerProperty()
    amount_paid = ndb.IntegerProperty()
    balance = ndb.IntegerProperty()

    def writeAmountOwed(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.strAmountOwed = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def writeAmountPaid(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.amount_paid = int(strinput)
                return True
            else:
                return False
        except:
            return False

    def writeBalance(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.balance = int(strinput)
                return True
            else:
                return False
        except:
            return False

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






    def setToPaid(self):
        try:
            self.loan_paid_status = True
            return True
        except:
            return False

    def setReference(self):
        try:
            findRequest = AdvancedAmount.query()
            AdvList = findRequest.fetch()

            self.advance_reference = len(AdvList)
            return True
        except:
            return False

    def writeCreditAdvancedCapital (self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.credit_advanced_capital = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeInitiationFee(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.initiation_fee = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeMonthlyServiceFee(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.monthly_service_fee = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeMonthlyInterest(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.monthly_interest = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeFrequency(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.freequency = strinput
                return True
            else:
                return False
        except:
            return False
    def writeNumberInstallments(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.number_installments = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeLoanTerm(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.loan_terms = strinput
                return True
            else:
                return False
        except:
            return False
    def writeAmountAdvancedToClient(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.amount_advanced_to_client = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeMonthlyInstallments(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.monthly_installments = int(strinput)
                return True
            else:
                return False
        except:
            return False
    def writeTotalInstallments(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.total_installments = int(strinput)
                return True
            else:
                return False
        except:
            return False
class LoanBankingDetails(LoanConstant):
    account_holder = ndb.StringProperty()
    account_number = ndb.StringProperty()
    bank = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    account_type = ndb.StringProperty()
    commencement_date = ndb.StringProperty()

    def writeAccountHolder(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.account_holder = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBankAccountNumber(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.account_number = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBankingInstitution(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.bank = strinput
                return True
            else:
                return False
        except:
            return False

    def writeBranchCode(self,strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.branch_code = strinput
                return True
            else:
                return False
        except:
            return False
    def writeAccountType(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.account_type = strinput
                return True
            else:
                return False
        except:
            return False

    def writeCommencementDate(self,strinput):
        try:
            if not(strinput == None):
                self.commencement_date = strinput
                return True
            else:
                return False
        except:
            return False
class LoanReceiver(LoanConstant):
    strNameCreditReceiver = ndb.StringProperty()
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

    def writeNameCreditProvider(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.strNameCreditReceiver = strinput
                return True
            else:
                return False
        except:
            return False
    def writeStandNumber(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.stand_number = strinput
                return True
            else:
                return False
        except:
            return False
    def writeStreetName(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.street_name = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCityTown(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.city = strinput
                return True
            else:
                return False
        except:
            return False
    def writePostalCode(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.postal_code = strinput
                return True
            else:
                return False
        except:
            return False
    def writeProvince(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.province = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCountry(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.country = strinput
                return True
            else:
                return False
        except:
            return False
    def writeWorkTel(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.work_tel = strinput
                return True
            else:
                return False
        except:
            return False
    def writeHomeTel(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.home_tel = strinput
                return True
            else:
                return False
        except:
            return False
    def writeCell(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.cell = strinput
                return True
            else:
                return False
        except:
            return False
    def writeIDNumber(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.id = strinput
                return True
            else:
                return False
        except:
            return False
    def writeEmployer(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.employer = strinput
                return True
            else:
                return False

        except:
            return False
class LoanNotes(LoanConstant):
    notes = ndb.StringProperty()
    subject = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()

    strDateTimeTaken = ndb.DateTimeProperty(auto_now_add=True)

    def writeNotes(self,strinput):
        try:
            strinput = str(strinput)

            if not(strinput == None):
                self.notes = strinput
                return True
            else:
                return False
        except:
            return False

    def writeSubject(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.subject = strinput
                return True
            else:
                return False
        except:
            return False

    def writeFullNames(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.names = strinput
                return True
            else:
                return False
        except:
            return False

    def writeSurname(self,strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.surname = strinput
                return True
            else:
                return False
        except:
            return False

########################################################################################################################
############ Handlers
########################################################################################################################

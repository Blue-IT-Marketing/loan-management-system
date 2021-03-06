import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import json
import logging
import string,random



class Company(ndb.Expando):
    company_id = ndb.StringProperty()
    uid = ndb.StringProperty()
    company = ndb.StringProperty()
    reg = ndb.StringProperty()
    fsp = ndb.StringProperty()
    ncr = ndb.StringProperty()
    physical = ndb.StringProperty()
    postal = ndb.StringProperty()

    def create_id(self,size=64,chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))
    
    def addCompany(self,company_details):

        company_query = Company.query(Company.uid == company_details['uid'])
        company_list = company_query.fetch()

        if len(company_list) > 0:
            this_company = company_list[0]
        else:
            this_company = Company()
            this_company.company_id = this_company.create_id()
        
        this_company.uid = company_details['uid']
        this_company.company = company_details['company']
        this_company.reg = company_details['reg']
        this_company.fsp = company_details['fsp']
        this_company.ncr = company_details['ncr']
        this_company.physical = company_details['physical']
        this_company.postal = company_details['postal']

        this_company.put()

        

        return this_company

    def getCompany(self,company_id):

        company_query = Company.query(Company.company_id == company_id)
        company_list = company_query.fetch()

        if len(company_list) > 0 :
            company = company_list[0]
            return company
        else:
            return ''

            
class CompanyCoffers(ndb.Expando):
    
    company_id = ndb.StringProperty()
    branch_code = ndb.StringProperty()
    cash_available = ndb.IntegerProperty()
    cash_in_bank = ndb.IntegerProperty()

    def depositCashInBank(self, strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_in_bank = self.cash_in_bank + int(strinput)
                return True
            else:
                return False
        except:
            return False

    def withdrawCashFromBank(self, strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_in_bank = self.cash_in_bank - int(strinput)
                return True
            else:
                return False
        except:
            return False

    def depositCashAvailable(self, strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.cash_available = self.cash_available + int(strinput)
                return True
            else:
                return False
        except:
            return False

    def withDrawCashAvailable(self, strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit():
                self.cash_available = self.cash_available - int(strinput)
                return True
            else:
                return False
        except:
            return False

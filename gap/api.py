import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging,json
from contact import Contact
from leads import Leads
from loans import LoanApplicantDetails
from user import User
from company import Company
class APIRouterHandler(webapp2.RequestHandler):

    def get(self):
        url_route = self.request.uri
        route = url_route.split("/")
        status_int = 200
        logging.info('api running')

        if 'leads' in route:
            leads_request = Leads.query(Leads.strConverted == False)
            leads_list = leads_request.fetch()

            response_data = []
            for lead in leads_list:
                response_data.append(lead.to_dict())

        elif 'loans' in route:
            loans_request = LoanApplicantDetails.query()
            loans_list = loans_request.fetch()

            response_data = []
            for loan in loans_list:
                response_data.append(loan.to_dict())

        elif 'user' in route:
            uid = route[len(route) - 1]

            user_instance = User()
            this_user = user_instance.getUser(uid=uid)
            response_data = {}
            if this_user != '':
                response_data = this_user.to_dict()

        else:
            response_data = {'message':'general error can not understand your request'}
            status_int = 501

        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)

    def post(self):
        url = self.request.uri
        route = url.split('/')
        status_int = 200

        logging.info('api running')

        if 'contact' in route:
            data = self.request.get('data')
            json_data = json.loads(data)
            logging.info(data)

            this_contact = Contact()

            this_contact.contact_id = ''
            this_contact.names = json_data['names']
            this_contact.cell = json_data['cell']
            this_contact.email = json_data['email']
            this_contact.subject = json_data['subject']
            this_contact.message = json_data['message']
            this_contact.put()

            response_data = this_contact.to_dict()

        elif 'leads' in route:
            data = self.request.get('data')
            json_data = json.loads(data)
            logging.info(data)
            uid = json_data['uid']
            title = json_data['title']
            surname = json_data['surname']
            names = json_data['names']
            id = json_data['id']
            dob = json_data['dob']
            nationality = json_data['nationality']
            cell = json_data['cell']
            email = json_data['email']
            notes = json_data['notes']

            leads_request = Leads.query(Leads.id == id)
            leads_list = leads_request.fetch()

            if len(leads_list) > 0:
                response_data = {'message':'lead already in the system'}
                status_int = 201
            else:

                this_lead = Leads()
                this_lead.writeTitle(strinput=title)
                this_lead.writeSurname(strinput=surname)
                this_lead.writeNames(strinput=names)
                this_lead.writeIDNumber(strinput=id)
                this_lead.writeDateOfBirth(strinput=dob)
                this_lead.writeCountry(strinput=nationality)
                this_lead.writeCell(strinput=cell)
                this_lead.writeEmail(strinput=email)
                this_lead.writeLeadNotes(strinput=notes)
                this_lead.writeReference(strinput=uid)
                this_lead.put()

                response_data = this_lead.to_dict()

        elif 'personal' in route:
            data = self.request.get('data')
            json_data = json.loads(data)
            uid = json_data['uid']
            loan_id = json_data['loan_id']
            title = json_data['title']
            surname = json_data['surname']
            names = json_data['names']
            id = json_data['id']
            dob = json_data['dob']
            nationality = json_data['nationality']

            applicant_request = LoanApplicantDetails.query(LoanApplicantDetails.id == id)
            applicant_list = applicant_request.fetch()

            if len(applicant_list) > 0:
                response_data = {'message': 'loan applicant aready exist'}
                status_int = 201
            else:
                this_applicant = LoanApplicantDetails()
                this_applicant.writeReference(strinput=uid)
                this_applicant.writeAccountNumber(strinput=loan_id)
                this_applicant.writeTitle(strinput=title)
                this_applicant.writeSurname(strinput=surname)
                this_applicant.writeFullNames(strinput=names)
                this_applicant.writeIDNumber(strinput=id)
                this_applicant.writeDateOfBirth(strinput=dob)
                this_applicant.writeNationality(strinput=nationality)

                response_data = this_applicant.to_dict()
                this_applicant.put()

        elif 'company' in route:
            uid = route[len(route) - 1]

            user_instance = User()
            this_user = user_instance.getUser(uid=uid)
            if this_user.is_admin: 
                company_details = json.loads(self.request.body)

                company_instance = Company()
                this_company = company_details.addCompany(company_details=company_details)

                response_data = {}
                if (this_company != ''):
                    response_data = this_company.to_dict()
                else:
                    status_int = 500
                    response_data = {'message': 'error could not create or update company'}
            else:
                status_int = 401
                response_data = {'message':'user not authorized'}


        else:
            response_data = {'message':'general error cannot understand request'}
            status_int = 501



        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)


    def put(self):
        url = self.request.uri
        route = url.split('/')
        status_int = 200

        logging.info('api running')

        if 'user' in route:
            user_details = json.loads(self.request.body)

            user_instance = User()
            this_user = user_instance.addUser(json_user=user_details)

            response_data = {}
            if this_user != '':
                response_data = this_user.to_dict()
            else:
                status_int = 500
                response_data = {'message': 'user not updated or created'}

        else:
            status_int = 404
            response_data = {'message': 'request not found'}

        self.response.headers['Content-Type'] = "application/json"
        self.response.status_int = status_int
        json_data = json.dumps(response_data)
        self.response.write(json_data)

app = webapp2.WSGIApplication([
    
    ('/api/.*', APIRouterHandler)


], debug=True)

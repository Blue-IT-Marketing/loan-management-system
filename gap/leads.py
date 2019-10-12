import os,webapp2,jinja2,logging,datetime,string,random
from google.appengine.ext import ndb
from google.appengine.api import users

template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

# TODO- write a utility to convert old leads records to new ones
class Leads(ndb.Expando):

    uid = ndb.StringProperty()
    employee_code = ndb.StringProperty()
    lead_date = ndb.StringProperty()
    # TODO- please make sure that lead_date is auto added
    notes = ndb.StringProperty()

    converted = ndb.BooleanProperty(default=False)
    convertion_date = ndb.StringProperty()
    #TODO- please make sure that convertion date is added
    # Employee Code of the Employee who made the conversion
    converted_by = ndb.StringProperty()

    title = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()
    id = ndb.StringProperty()

    dob = ndb.StringProperty()
    residential = ndb.StringProperty()
    city = ndb.StringProperty()
    country = ndb.StringProperty()
    province = ndb.StringProperty()
    postal_code = ndb.StringProperty()

    tel = ndb.StringProperty()
    cell = ndb.StringProperty()
    email = ndb.StringProperty()

    # Funeral Cover or Funeral Service or Other
    interests = ndb.StringProperty()

    notes = ndb.StringProperty()

    def create_id(self, size=64, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))

    def addLead(self, leads_data):

        uid = leads_data['uid']
        id = leads_data['id']
        title = leads_data['title']
        surname = leads_data['surname']
        names = leads_data['names']
        
        dob = leads_data['dob']
        country = leads_data['country']
        cell = leads_data['cell']
        email = leads_data['email']
        notes = leads_data['notes']

        leads_request = Leads.query(Leads.id == id)
        leads_list = leads_request.fetch()

        if len(leads_list) > 0:            
            return ''
        else:

            this_lead = Leads()
            this_lead.id = id
            this_lead.loan_id = this_lead.create_id()
            this_lead.uid = uid
            this_lead.title = title
            this_lead.surname = surname
            this_lead.names = names
            this_lead.dob = dob
            this_lead.country = country
            this_lead.cell = cell
            this_lead.email = email
            this_lead.notes = notes
            

            this_lead.put()

            return this_lead


    def convertLead(self,uid,lead_id):

        leads_request = Leads.query(Leads.loan_id == lead_id)
        leads_list = leads_request.fetch()
        today = datetime.datetime.now()
        for lead in leads_list:
            lead.converted = True
            lead.convertion_date = today
            lead.converted_by = uid

            lead.put()

        return True
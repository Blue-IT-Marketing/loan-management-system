
import os,logging,datetime,string,random
from google.appengine.ext import ndb

from google.appengine.api import urlfetch

email_api_base_url = 'https://sa-sms.herokuapp.com'
email_api_endpoint = '/api/send-mail'
# i need a method to obtain api_key
email_apiKey = ''

class User(ndb.Expando):
    # TODO implement this in every user
    company_id = ndb.StringProperty()
    uid = ndb.StringProperty() 
    employee_code = ndb.StringProperty()
    names = ndb.StringProperty()
    surname = ndb.StringProperty()
    email = ndb.StringProperty()
    cell = ndb.StringProperty()
    password = ndb.StringProperty() 
    repeatpassword = ndb.StringProperty() 
    is_admin = ndb.BooleanProperty(default=False)
    user_blocked = ndb.BooleanProperty(default=False)

    def blockUser(self,uid):

        user_requests = User.query(User.uid == uid)
        users_list = user_requests.fetch()

        if len(users_list) > 0 :
            user = users_list[0]
            user.user_blocked = True
            user.put()

            return user
        else:
            return ''


        

    def sendInvite(self,email_details):
        logging.info(email_details)
        # TODO- create a function to send emails via requests, through my sa-sms api
        request_url = email_api_base_url + email_api_endpoint        

        headers  = {'Content-Type' : 'application/json'}
        try:
            result = urlfetch.fetch(url=request_url,
                                    payload=email_details,
                                    method=urlfetch.POST,
                                    headers=headers,
                                    validate_certificate=True)

            if result.status_code == 200:
                response = json.loads(result.content)
            else:
                response = ''

        except urlfetch.Error:
            response = ''
        
        return response

    def create_employee_code(self, size=6, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for x in range(size))


    def addUser(self,json_user):

        try:
            uid = json_user['uid']
            user_request = User.query(User.uid == uid)
            user_list = user_request.fetch()

            if len(user_list) > 0:
                this_user = user_list[0]
            else:
                this_user = User()
                # this_user.employee_code = this_user.create_employee_code()

            this_user.uid = json_user['uid']            
            this_user.names = json_user['names']
            this_user.surname = json_user['surname']
            this_user.email = json_user['email']
            this_user.cell = json_user['cell']
            this_user.is_admin = json_user['is_admin'] == 'true'
            this_user.password = json_user['password']
            this_user.repeatpassword = json_user['repeatpassword']
            this_user.put()

            return this_user
        except:
            return ''

    

    def updateUser(self,json_user):
        try:
            uid = json_user['uid']
            user_request = User.query(User.uid == uid)
            user_list = user_request.fetch()

            if len(user_list) > 0:
                this_user = user_list[0]
            else:
                this_user = User()

            this_user.uid = json_user['uid']
            this_user.names = json_user['names']
            this_user.surname = json_user['surname']
            this_user.email = json_user['email']
            this_user.cell = json_user['cell']
            this_user.is_admin = json_user['is_admin'] == 'true'
            this_user.put()

            return this_user
        except:
            return ''

    def removeUser(self,uid):
        user_request = User.query(User.uid == uid)
        user_list = user_request.fetch()

        for user in user_list:
            user.key.delete()

        return True

    def getUser(self,uid):
        user_request = User.query(User.uid == uid)
        user_list = user_request.fetch()

        if len(user_list) > 0:
            this_user = user_list[0]
            # eliminating errors due to empty user records
            try:
                if this_user.uid == uid:
                    result = this_user
                else:
                    this_user.key.delete()
                    result = ""
            except:
                result = ""
        else:
            result = ""

        return result
    def fetchUsers(self):

        users_requests = User.query()
        users_list = users_requests.fetch()

        return users_list

    def fetchCompanyUsers(self,company_id):
        users_requests = User.query(User.company_id == company_id)
        users_list = users_requests.fetch()

        return users_list





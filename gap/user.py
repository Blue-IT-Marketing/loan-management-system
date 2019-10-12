
import os,logging,datetime
from google.appengine.ext import ndb


class User(ndb.Expando):
    uid = ndb.StringProperty() 
    names = ndb.StringProperty()
    surname = ndb.StringProperty()
    email = ndb.StringProperty()
    cell = ndb.StringProperty()
    password = ndb.StringProperty() 
    repeatpassword = ndb.StringProperty() 
    is_admin = ndb.BooleanProperty(default=False)


    def addUser(self,json_user):

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





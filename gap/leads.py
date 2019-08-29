import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import logging
import datetime
template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

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


    def writeReference(self,strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.uid = strinput
                return True
            else:
                return False
        except:
            return False



    def readEmployeeCode(self):
        try:
            strTemp = str(self.employee_code)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeEmployeeCode(self, strinput):
        try:

            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.employee_code = strinput
                return True
            else:
                return False
        except:
            return False

    def readLeadDate(self):
        try:
            return str(self.lead_date)
        except:
            return ""

    def readLeadNotes(self):
        try:
            strTemp = str(self.notes)
            return strTemp
        except:
            return ""

    def writeLeadNotes(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()
            if not (strinput == None):
                self.notes = strinput
                return True
            else:
                return False
        except:
            return False

    def readConversionDate(self):
        try:
            strTemp = str(self.convertion_date)

            return strTemp
        except:
            return ""

    def setConversionDate(self, strinput):
        try:
            thisDate = datetime.datetime.now()
            thisDate = thisDate.date()

            self.convertion_date = thisDate
            return True
        except:
            return True

    def readConvertedBy(self):
        try:
            strTemp = str(self.converted_by)
            return strTemp
        except:
            return ""

    def writeConvertedBy(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.converted_by = strinput
                return True
            else:
                return False

        except:
            return False

    def readTitle(self):
        try:
            strtemp = str(self.title)
            strtemp = strtemp.strip()

            if not (strtemp == None):
                return strtemp
            else:
                return ""

        except:
            return ""

    def writeTitle(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.title = strinput
                return True
            else:
                return False
        except:
            return False

    def writeNames(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.names = strinput
                return True
            else:
                return False
        except:
            return False

    def readNames(self):
        try:
            strTemp = str(self.names)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def readSurname(self):
        try:
            strTemp = str(self.surname)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeSurname(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.surname = strinput
                return True
            else:
                return False
        except:
            return False

    def readIDNumber(self):
        try:
            strTemp = str(self.id)

            if strTemp.isdigit():
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeIDNumber(self, strinput):
        try:
            strinput = str(strinput)

            if strinput.isdigit():
                self.id = strinput
                return True
            else:
                return False
        except:
            return False

    def readDateOfBirth(self):
        try:
            strtemp = str(self.dob)
            return strtemp
        except:
            return ""

    def writeDateOfBirth(self, strinput):
        """
            format yyyy-mm-dd
        """
        try:
            strinput = str(strinput)

            Datefields = strinput.split("-")
            if len(Datefields) == 3:
                tempDate = datetime.date(year=int(Datefields[0]), month=int(
                    Datefields[1]), day=int(Datefields[2]))
                self.dob = tempDate
                return True
            else:
                return False
        except:
            return False

    def readResAddress(self):
        try:
            strTemp = str(self.residential)

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeResAddress(self, strinput):
        try:
            strinput = str(strinput)

            if not (strinput == None):
                self.residential = strinput
                return True
            else:
                return False
        except:
            return False

    def readCityTown(self):
        try:
            strTemp = str(self.city)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeCityTown(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.city = strinput
                return True
            else:
                return False
        except:
            return False

    def readCountry(self):
        try:
            strTemp = str(self.country)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeCountry(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.country = strinput
                return True
            else:
                return False
        except:
            return False

    def readProvince(self):
        try:
            strTemp = str(self.province)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeProvince(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.province = strinput
                return True
            else:
                return False
        except:
            return False

    def readPostalCode(self):
        try:
            strTemp = str(self.postal_code)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writePostalCode(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.postal_code = strinput
                return True
            else:
                return False
        except:
            return False

    def readCell(self):
        try:
            strTemp = str(self.cell)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeCell(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.cell = strinput
                return True
            else:
                return False
        except:
            return False

    def readTell(self):
        try:
            strTemp = str(self.tel)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeTel(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.tel = strinput
                return True
            else:
                return False
        except:
            return False

    def readEmail(self):
        try:
            strTemp = str(self.email)
            strTemp = strTemp.strip()

            if not (strTemp == None):
                return strTemp
            else:
                return ""
        except:
            return ""

    def writeEmail(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.strip()

            if not (strinput == None):
                self.email = strinput
                return True
            else:
                return False
        except:
            return False

    def readLeadInterests(self):
        try:
            strTemp = str(self.interests)
            return strTemp
        except:
            return ""

    def writeLeadInterests(self, strinput):
        try:
            strinput = str(strinput)
            self.interests = strinput
            return True
        except:
            return False

class LeadResponses(ndb.Expando):
    # Reference of the User Using the System at the time
    uid = ndb.StringProperty()
    employee_name = ndb.StringProperty()
    employee_surname = ndb.StringProperty()
    employee_code = ndb.StringProperty()
    id = ndb.StringProperty()  # ID Number of the Lead
    response = ndb.StringProperty()
    status = ndb.StringProperty()
    datetime_response = ndb.DateTimeProperty(auto_now_add=True)
    next_schedule = ndb.DateTimeProperty()

    def readReference(self):
        try:
            strTemp = str(self.uid)
            return strTemp
        except:
            return None

    def writeReference(self, strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.uid = strinput
                return True
            else:
                return False

        except:
            return False

    def writeIDNumber(self, strinput):
        try:
            strinput = str(strinput)
            if strinput.isdigit() and (len(strinput) == 13):
                self.id = strinput
                return True
            else:
                return False
        except:
            return False

    def writeResponses(self, strinput):
        try:
            strinput = str(strinput)
            if not(strinput == None):
                self.response = strinput
                return True
            else:
                return False

        except:
            return False

    def writeStatus(self, strinput):
        try:
            strinput = str(strinput)
            strinput = strinput.lower()

            if (strinput == "calllater") or (strinput == "unreachable") or (strinput == "dontcall"):
                self.status = strinput
                return True
            else:
                return False
        except:
            return False

    def writeNextSchedule(self, strinput):
        try:

            if not(strinput == None):
                self.next_schedule = strinput
                return True
            else:
                return False
        except:
            return False



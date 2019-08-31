
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const auth = admin.auth();

/**
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 * @param {Object} req Express Request Object.
 * @param {Object} res Express Response Object
 */
const getAllUsers = (req, res) => {
  const maxResults = 1000; // optional arg.
  let result = [];

  auth.listUsers(maxResults).then(userRecords => {
    userRecords.users.forEach((user) => result.push(user.toJSON()));    
    console.log(result);
    return res.status(200).send(result);
  }).catch((error) => res.status(404).send(error));
};

const helloWorld = (req,res) => {
  res.status(200).send('hello world');
};

const sendEmail = (req,res) => {
  const{from,to,subject,body} = req;
  if ((from === null) || (to === null) || (subject === null) || (body === null)){
    res.status(401).send('request not formatted corrently');
  }

  // use nodemailer to send email with something like sendgrid
};

const sendSMS = (req,res) => {
  const{from,to,text} = req;
  if((from === null) || (to === null) || (text === null)){
    res.status(401).send('request not formatted correctly');
  }

  //TODO- use twilio and other api's to send sms messages
};



module.exports = {
  apigetusers: functions.https.onRequest(getAllUsers),
  hello: functions.https.onRequest(helloWorld),
};
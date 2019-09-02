
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const auth = admin.auth();

const chat = require('chat');
/**
 * enabling cors support
 */

const cors = require("cors")({
  origin: true
});

/**
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 * @param {Object} req Express Request Object.
 * @param {Object} res Express Response Object
 */

const getAllUsers = (req, res) => {
  cors(req, res, () => {});
  const maxResults = 1000; // optional arg.
  let result = [];

  auth.listUsers(maxResults).then(userRecords => {    
    userRecords.users.forEach((user) => result.push(user.toJSON()));    
    console.log(result);
    return res.status(200).send(result);
  }).catch((error) => res.status(404).send(error));
};

/**
 * hello world app
 * @param {*} req 
 * @param {*} res 
 */
const helloWorld = (req,res) => {
  cors(req, res, () => {});
  res.status(200).send('hello world');
};

/**
 * send Email
 * 
 */
const sendEmail = (req,res) => {
  cors(req, res, () => {});
  const{from,to,subject,body} = req;
  if ((from === null) || (to === null) || (subject === null) || (body === null)){
    res.status(401).send('request not formatted corrently');
  }

  // use nodemailer to send email with something like sendgrid
};

const sendSMS = (req,res) => {
  cors(req, res, () => {});
  const{from,to,text} = req;
  if((from === null) || (to === null) || (text === null)){
    res.status(401).send('request not formatted correctly');
  }

  //TODO- use twilio and other api's to send sms messages
};


/**
 * used to update user record once the record has been created
 * this function will be used to update all users
 * @param {uid,user} req 
 * @param {*user} res 
 */

const updateUserDetails = (req,res) => {
  cors(req, res, () => {});
  const{uid,user} = req;

  if ((uid === null) || (user === null)){
    return res.status(401).send('request not formatted correctly');
  }

  auth.updateUser(uid,user).then(userRecord => {
    return res.status(200).send(userRecord.toJSON());
  }).catch(error => {
    return res.status(401).send(error);
  });
  
};



/**
 * used to send email notification and or sms notification once the user has been created
 * 
 */

const onUserCreated = (user) => {
  // send email to user
  const {email} = user;
  console.log('USER CREATED',user);
};





module.exports = {
  apigetusers: functions.https.onRequest(getAllUsers),
  hello: functions.https.onRequest(helloWorld),
  sendEmail: functions.https.onRequest(sendEmail),
  sendSMS: functions.https.onRequest(sendSMS),
  updateUserDetails: functions.https.onRequest(updateUserDetails),
  onUserCreated : functions.auth.user().onCreate(onUserCreated)
};
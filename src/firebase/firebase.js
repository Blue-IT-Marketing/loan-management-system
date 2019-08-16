import firebase from 'firebase/app';
import {settings} from '../constants';
import 'firebase/auth';
const config = settings.firebase;


try{
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
}catch (e) {
	console.log('firebase app already configured');
}


const auth = firebase.auth();




export {auth,
	firebase
};
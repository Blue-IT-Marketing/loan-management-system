import firebase from 'firebase';
import {settings} from '../constants';
const config = settings.firebase;


try{
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
}catch (e) {
	console.log('firebase app already configured');
}



const auth = firebase.auth();
const storage = firebase.storage();




export {auth,
	firebase,
	storage	
};
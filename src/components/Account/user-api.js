

import axios from 'axios';
import { routes } from '../../constants';


export const fetchActiveUsers = async (uid, company_id) => {
	const results = {status:true,payload:[],error:{}};

	await axios.get(routes.company_api_url + `/users/${company_id}/${uid}`).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error fetching company users');
		}
	}).then(users => {
		results.status = true;
		results.payload = [...users];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});

	return results;
};


export const sendInvite = async (uid,user_detail) => {
	const results ={status:true,payload:{},error:{}};

	const email_parameters = {
		to : user_detail.email,
		from : 'no-response@loanmanagement@sa-loans.appspot.com',
		subject : 'user invitation',
		text : 
		`
		hi ${user_detail.names} we have sent you this email as 
		an invitation to start using our loan management
		web application, in order to accept this invitation
		please subscribe to our web application as an employee
		and use the following reference code



		
		`,
		html : `
		
		`
	};

	const params = JSON.stringify(email_parameters);

	await axios.post(routes.api_user_endpoint + `/send-invite/${uid}`, params).then(response => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('there was an error sending email invite');
		}
	})
		.then(user => {
			results.status = true;
			results.payload = { ...user };
			results.error = {};
		})
		.catch(error => {
			results.status = false;
			results.payload = {};
			results.error = { ...error };
		});

	return results;
};


export const blockUser = async (uid,user_detail) => {
	const results = { status: true, payload: {}, error: {} };

	await axios.put(routes.api_user_endpoint + `/block_user/${uid}`, user_detail).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('error blocking user');
		}
	}).then(user_detail => {
		results.status = true;
		results.payload = {...user_detail};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;
};
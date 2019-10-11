/**
 * 
 * 
 * 
 * 
 */

import axios from 'axios';
import {routes} from '../../constants';


export const UpdateCompany = async (uid, company_details) => {
	const results = {status:false,payload:{},error:{}};

	await axios.post(routes.company_api_url, company_details).then(response => {
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('There was an error creating company');
		}
	}).then(company_data => {
		results.payload = {...company_data};
		results.status = true;
		results.error = {};		
	}).catch(error => {					
		results.payload ={};
		results.status = false;
		results.error = {...error};
	});
	return results;
};


export const fetchCompany = async uid => {
	const results = { status: false, payload: {}, error: {} };

	await axios.get(routes.company_api_url+`${uid}`).then(response => {
		if(response.status == 200){
			return response.data;
		}else{
			throw new Error('Error fetching company data');
		}
	}).then(company_details => {
		results.status = true;
		results.payload= {...company_details};
		results.error = {}
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;
}


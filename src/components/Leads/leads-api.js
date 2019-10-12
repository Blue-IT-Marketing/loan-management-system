


/***
 * 
 * 
 * leads api 
 * insure that the old leads data is preserverd
 */

import axios from 'axios';
import {routes} from '../../constants';

export const fetchLeads = async converted => {
	const results = {status : true, payload : {},error:{}};
	const route = converted
    ? routes.leads_api_endpoint + `/converted`
	: routes.leads_api_endpoint + `/notconverted`; 
	
	await axios.get(route).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error fetching leads');
		}
	}).then(leads_list => {
		results.status = true;
		results.payload = [...leads_list];
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = [];
		results.error = {...error};
	});

	return results;
};




export const saveLeads = async (uid,leads_data) => {
	const results = { status: true, payload: {}, error: {} };

	await axios.post(routes.leads_api_endpoint + `/${uid}`,leads_data).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error fetching leads');
		}
	}).then(leads_data => {
		results.status = true;
		results.payload = {...leads_data};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});
	return results;
};
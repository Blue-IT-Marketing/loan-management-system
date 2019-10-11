


/***
 * 
 * 
 * leads api 
 * insure that the old leads data is preserverd
 */

import axios from 'axios';
import {routes} from '../../constants';

export const fetchLeads = async () => {
	const results = {status : true, payload : {},error:{}};

	await axios.get(routes.leads_api_endpoint).then(response => {
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
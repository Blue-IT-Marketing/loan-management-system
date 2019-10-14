import axios from 'axios';
import {routes} from '../../constants';

export const fetchUsers = async uid => {
	const results = {status : true, payload:{}, error:{}};

	await axios.get(routes.api_admin_endpoint + `/${uid}`).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error fetching users');
		}
	}).then(users => {
		results.status = true;
		results.payload = [...users];
		results.error = {};
	}).catch(error => {
		results.error = {...error};
		results.status = false;
		results.payload = [];
	});

	return results;

};
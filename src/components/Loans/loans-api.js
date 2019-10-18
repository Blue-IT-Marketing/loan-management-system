
/***
 * 
 * api used to access loans backend
 * 
 */
import axios from 'axios';
import { routes } from '../../constants';

export const savePersonalDetails = async personal_details => {
	const results = {status:true,payload:{},error:{}};

	await axios.post(routes.loan_personal_details_api_url,personal_details).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an saving client personal details');
		}
	}).then(personal_details => {
		results.status = true;
		results.payload = {...personal_details};
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload ={};
		results.error ={...error};

	});
	return results;
};

export const getApplicantPersonalDetails = async loan_id => {
	const results = {status : true,payload:{},error:{}};

	await axios.get(routes.loan_personal_details_api_url + `${loan_id}`).then(response => {
		if (response.status === 200){ 
			return response.data
		}else{
			throw new Error('there was an error fetching applicant details');
		}
	}).then(applicant_details => {
		results.status = true;
		results.payload = { ...applicant_details };
		results.error = {};
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});
	return results;
};


export const createLoanID = async (uid,employee_code) => {
	const results = { status: true, payload: {}, error: {} };

	await axios.get(routes.loans_api_endpoint + `/create-loan-id/${employee_code}/${uid}`).then(response => {
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error('there was an error creating new loan');
		}
	}).then(loan_details => {
		results.status = true;
		results.payload = {...loan_details};
		results.error = {}
	}).catch(error => {
		results.status = false;
		results.payload = {};
		results.error = {...error};
	});

	return results;
};
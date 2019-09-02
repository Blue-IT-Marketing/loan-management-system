export let personal_details_init = {
	uid: '',
	loan_id : '',
	title: '',
	surname: '',
	names: '',
	id: '',
	dob: '',
	nationality: '',
	allps : ''
};
export let personal_details_errors_init = {
	title_error: '',
	surname_error: '',
	names_error: '',
	id_error: '',
	dob_error: '',
	nationality_error: ''
};
export let physical_address_init = {
	id: '',
	stand: '',
	street_name: '',
	city: '',
	province: '',
	country: '',
	postal_code: ''
};
export let physical_address_errors_init = {
	stand_error: '',
	street_name_error: '',
	city_error: '',
	province_error: '',
	country_error: '',
	postal_code_error: ''
};
export let postal_address_init = {
	id: '',
	box: '',
	city: '',
	province: '',
	postal_code: '',
	country: ''
};
export let postal_address_error_init = {
	box_error: '',
	city_error: '',
	province_error: '',
	postal_code_error: '',
	country_error: ''
};
export let contact_details_init = {
	id: '',
	tel: '',
	cell: '',
	email: ''
};
export let contact_details_errors_init = {
	tel_error: '',
	cell_error: '',
	email_error: ''
};
export let next_of_kin_init = {
	client_id: '',
	names: '',
	address: '',
	cell: ''
};
export let next_of_kin_init_error = {
	id : '',
    names_error: '',
	address_error: '',
	cell_error: ''
};


	// uid: '',
	// loan_id : '',
	// title: '',
	// surname: '',
	// names: '',
	// id: '',
	// dob: '',
	// nationality: '',
	// allps : ''

export const mapToLoans = (loans) => {
	console.dir('Mapping this fileds : ', loans);
	let prepared_loans = [];
	loans.forEach(loan => {
		prepared_loans.push({
			uid: loan.uid,
			loan_id : loan.loan_id,
			title : loan.title,
			surname: loan.surname,
			names : loan.names,
			id:loan.id,
			dob:loan.dob,
			nationality:loan.nationality,
			allps:loan.allps
		});
	});
	
	return prepared_loans;
	
};
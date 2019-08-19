import {
	personal_details_init,
	personal_details_errors_init,
} from '../Loans/loans-constants';
export let leads_init = {
	...personal_details_init,
	cell: '',
	email: '',
	notes: ''
};
export let leads_init_error = {
	...personal_details_errors_init,
	cell_error: '',
	email_error: '',
	notes_error: ''
};

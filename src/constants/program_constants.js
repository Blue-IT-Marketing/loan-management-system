import axios from 'axios';

export let app_name = 'midey-finance';
export let app_long_name = 'midey finance';
export let app_descrition = 'a portal for small loan management, with Midey Loans';
export let cell = '0790471559';
export let email = 'mobiusndou@gmail.com';
export let fax = '086****786';
export let localStorageKey = 'saloans-';


export let small_logo_url = '../assets/logo/logo.PNG';

export let maps_url = '';
export let business_address = ``;
export let business_reg_number = '';
export let business_fax = '';
export let business_tel = '0790471559';
export let business_email = 'justice@justicendou.site';


export let firebase = {
	apiKey: "AIzaSyAyw734yKkdGsaplGmxyzKNa-bgR88v96Y",
	authDomain: "midey-finance.firebaseapp.com",
	databaseURL: "https://midey-finance.firebaseio.com",
	projectId: "midey-finance",
	storageBucket: "midey-finance.appspot.com",
	messagingSenderId: "246904445256",
	appId: "1:246904445256:web:324e8a3838eeddf9"

};


export const loadSettings = async () => {
	const settings_url = '/settings';
	axios.get(settings_url).then(result => {
		if (result.status === 200) {
			return result.data;
		} else {
			throw new Error('There was an error loading settings');
		}
	}).then(settings => {
		// app_name = settings.app_name;
		// app_long_name = settings.app_long_name;
		// app_descrition = settings.app_descrition;
		// cell = settings.cell;
		// email = settings.email;
		// fax = settings.fax;
		// small_logo_url = settings.small_logo_url;
		// maps_url = settings.maps_url;
		// business_address = settings.business_address;
		// business_reg_number = settings.business_reg_number;
		// business_fax = settings.business_fax;
		// business_tel = settings.business_tel;
		// business_email = settings.business_email;
	}).catch(e => {
		// eslint-disable-next-line no-console
		console.log('Error ', e);
	})
};
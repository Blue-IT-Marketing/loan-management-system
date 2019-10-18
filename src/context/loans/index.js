/***
 * 
 * 
 * 
 * 
 */

import React, { Component, useContext, createContext,useState,useEffect} from 'react';
import { UserAccountContext } from '../UserAccount/userAccountContext';
import { extended_user } from '../../components/Auth/auth-constants';


import * as loansAPI from '../../components/Loans/loans-api';

export const LoansConstantContext = createContext();

export const loans_constant_init = {
	loan_id : '',
	uid : '',
	employee_code : '',
	company_id : ''
};

const LoansConstantContextProvider = props => {
    
	const[loansConstant,setLoansConstant] = useState(loans_constant_init);

	const {user_account_state} = useContext(UserAccountContext);

	useEffect(() => {
		
		const uid = user_account_state.user_account.uid;

		loansAPI.createLoanID(uid).then(response => {
			if (response.status){
				setLoansConstant(response.payload);
			}else{
				setLoansConstant(loans_constant_init);
			}
		}).catch(error => {
			setLoansConstant(loans_constant_init);
		});
		return () => {
			setLoansConstant(loans_constant_init);
		};
	}, []);

	return(
		<LoansConstantContext.Provider value={
			{
				loans_constant : loansConstant       
			}
		}>
			{props.children}
		</LoansConstantContext.Provider>
	);
};


export default LoansConstantContextProvider;

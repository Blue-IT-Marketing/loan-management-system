/* eslint-disable no-unused-vars */
import React,{useState,useContext,useEffect} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { UserAccountContext } from "../../../context/UserAccount/userAccountContext";
import {routes} from '../../../constants';

const ProtectedRoute = ({Component:Component, ...rest}) => {
	const [redirect,setRedirect] = useState(false);
  	const { doLogin, user_account_state } = useContext(UserAccountContext);

	useEffect(() => {
		if (!user_account_state.user_account.uid){
			setRedirect(true);
			console.log("REDIRECT SET");		
		}
	}, []);
		
	return (							
		<Route {...rest} render=
			{
				props => {
					if(redirect){
						return <Redirect from={props.location} to={routes.login_page} />;						
					}else{
						return <Component {...props} />;
					}
				}
			} />
	);
					
};
		

export default ProtectedRoute;
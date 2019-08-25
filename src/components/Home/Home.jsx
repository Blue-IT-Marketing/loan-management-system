import React, { Fragment,useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import {UserAccountContext} from '../../context/UserAccount/userAccountContext';
import {settings, routes} from '../../constants';


import './Home.css';

export default function Home (){	
	const userContext = useContext(UserAccountContext);
	const { doLogin, user_account_state } = userContext;

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box-header">
					<h3 className="box-title">
						<strong>
							<i className={'fa fa-home'}> </i> {settings.app_name}{' '}
						</strong>
					</h3>
					<div className="box-tools"></div>
				</div>
				<div className="box box-footer">
					<div className="box-header">
						<h3 className="box-title">{settings.app_descrition}</h3>
					</div>
				</div>
				<form className="form-horizontal">
					<div className="form-group">
						<Link to={routes.login_page}>
							<button
								type="button"
								className="btn btn-success btn-lg"
								name="employees"
							>
								<strong>
									<i className="fa fa-sign-in"> </i> Employees Login
								</strong>
							</button>
						</Link>{' '}
						{user_account_state.user_account.uid ? (
							<Link to={routes.loans_page}>
								<button
									type="button"
									className="btn btn-success btn-lg"
									name="employees"
								>
									<strong>
										<i className="fa fa-sign-in"> </i> Create Loan
									</strong>
								</button>
							</Link>
						) : (
							''
						)}{' '}
						{user_account_state.user_account.uid ? (
							<Link to={routes.leads_page}>
								<button
									type="button"
									className="btn btn-success btn-lg"
									name="employees"
								>
									<strong>
										<i className="fa fa-users"> </i> Leads
									</strong>
								</button>
							</Link>
						) : (
							''
						)}{' '}
						{user_account_state.user_account.uid ? (
							<Link to={routes.chat_page}>
								<button
									type="button"
									className="btn btn-success btn-flat btn-lg"
									name="chat"
								>
									<strong>
										<i className="fa fa-comment"> </i> Chat{' '}
									</strong>
								</button>
							</Link>
						) : (
							''
						)}
					</div>
				</form>
			</div>
		</Fragment>
	);
}

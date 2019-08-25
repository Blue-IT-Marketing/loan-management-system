// eslint-disable-next-line no-unused-vars
import React, { Fragment,createContext,useReducer,useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {routes} from '../../constants';
// eslint-disable-next-line no-unused-vars
import Header from '../Layout/Header/Header';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Login from '../Auth/Login/Login';
import Logout from '../Auth/Logout/Logout';
import Signup from '../Auth/Signup/Signup';
// eslint-disable-next-line no-unused-vars
import SideBar from '../Layout/SideBar/SideBar';
// eslint-disable-next-line no-unused-vars
import Footer from '../Layout/Footer/Footer';
import Forget from '../Auth/Forget/Forget';



import Dashboard from '../Dashboard/Dashboard';
import Blog from '../Blog/Blog';
import Account from '../Account/Account';
import Profiles from '../Profile/Profiles';
import Loans from '../Loans/Loans';
import Chat from '../Chat/Chat';
import Leads from '../Leads/Leads';
import ActiveLoans from '../Loans/ActiveLoans';

import ProtectedRoute from '../Auth/ProtectedRoute/ProtectedRoute';

export default function App () {
	return (
		
		<Fragment>
			<Router>
				{/* Header  Component*/}
				<Header />
				{/* Sidebar Component */}
				<SideBar />
				{/* Body and Main Page Routes */}
				<div className="content-wrapper">
					<section className="content-header">
						<section className="content">
							<Switch>
								<Route exact path={routes.home_page} component={Home} />
								<Route exact path={routes.about_page} component={About} />
								<Route exact path={routes.contact_page} component={Contact} />
								<Route path={routes.login_page} component={Login} />
								<ProtectedRoute path={routes.logout_page} component={Logout} />
								<Route path={routes.signup_page} component={Signup} />
								<Route path={routes.forget_password_page} component={Forget} />

								<Route path={routes.blog_page} component={Blog} />
								<ProtectedRoute path={routes.dashboard_page} component={Dashboard} />

								<ProtectedRoute path={routes.profiles} component={Profiles} />

								<ProtectedRoute path={routes.loans_page} component={Loans} />
								<ProtectedRoute path={routes.active_loans_page} component={ActiveLoans} />
								<ProtectedRoute path={routes.chat_page} component={Chat} />
								<ProtectedRoute path={routes.leads_page} component={Leads} />
								<ProtectedRoute exact path={routes.admin_page} component={Account} />
							</Switch>
						</section>
					</section>
				</div>
				{/* Footer Component  */}
				<Footer />
			</Router>
		</Fragment>
		
	);
}

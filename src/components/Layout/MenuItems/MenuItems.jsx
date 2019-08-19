// eslint-disable-next-line no-unused-vars
import React, {Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {routes,settings} from '../../../constants';
import {firebase,auth} from '../../../firebase';
import { UserAccountContext } from '../../../context/UserAccount/userAccountContext';

const SideBarMenuAuth = () => {
	return (
		<ul className="sidebar-menu">
			<li className="header">{settings.app_name}</li>
			<li>
				<Link to={routes.home_page} title={settings.app_name}>
					<i className="fa fa-home" /> <strong>Home</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.about_page} title="About">
					<i className="fa fa-info" /> <strong>About</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.contact_page} title="Contact Us">
					<i className="fa fa-envelope" /> <strong>Contact</strong>
				</Link>
			</li>
			<li className="active treeview">
				<Link to="#">
					<i className="fa fa-user-md" /> <span>Client Area</span>
					<span className="pull-right-container">
						<i className="fa fa-angle-left pull-right" />
					</span>
				</Link>
				<ul className="treeview-menu">
					<li>
						<Link to={routes.admin_page} title="manage your Account">
							<i className="fa fa-sign-in"> </i> <strong> Account</strong>{' '}
						</Link>{' '}
					</li>
					<li>
						<Link to={routes.leads_page}>
							<i className="fa fa-compass"> </i>
							<strong>Leads </strong>
						</Link>
					</li>

					<li>
						<Link to={routes.loans_page}>
							<i className="fa fa-dollar"> </i>
							<strong>Create Loans</strong>
						</Link>
					</li>
					<li>
						<Link to={routes.active_loans_page}>
							<i className="fa fa-archive"> </i>
							<strong>Active Loans </strong>
						</Link>
					</li>
					<li>
						<Link to={routes.chat_page}>
							<i className="fa fa-comment"> </i>
							<strong>Chat </strong>
						</Link>
					</li>
				</ul>
			</li>
			<li>
				<Link to={routes.blog_page} title="Blog">
					<i className="fa fa-book"> </i> <strong>Blog</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.dashboard_page} title="Dashboard">
					<i className="fa fa-dashboard"> </i> <strong>Dashboard</strong>
				</Link>
			</li>
			<li>
				<Link to={routes.logout_page} title="Logout">
					<i className="fa fa-sign-out"> </i> <strong> Logout </strong>
				</Link>
			</li>
		</ul>
	);
};

const SideBarMenuNonAuth = () => {
	return (
		<ul className="sidebar-menu">
			<li className="header">{settings.app_name}</li>
			<li className="active treeview">
				<ul className="treeview-menu">
					<li><Link to={routes.home_page} title={settings.app_name}><i className="fa fa-home"> </i> Home</Link></li>
					<li><Link to={routes.about_page} title="About Us"><i className="fa fa-info"> </i> About</Link></li>
					<li><Link to={routes.contact_page} title="Contact Us"><i className="fa fa-envelope"> </i> Contact</Link></li>					
					<li><Link to={routes.blog_page} title="Blog"><i className="fa fa-book"> </i> <strong>Blog</strong></Link></li>
					<li><Link to={routes.login_page} title="Login"><i className="fa fa-sign-in"> </i> Login </Link></li>
				</ul>
			</li>
		</ul>   
	); 
};



export default class MenuItems extends Component {
	constructor(props){
		super(props);
		this.state = {
			user_logged_in : false
		};
	}

	componentDidMount(){
		let isUserLoggedIN = () => {					
			return !!auth.currentUser;
		};
		if (isUserLoggedIN()){
			this.setState({user_logged_in : true});
		}
	}
	render() {
		return (
			<UserAccountContext.Consumer>{(context) =>
			{
				// eslint-disable-next-line no-unused-vars
				const { doLogin, user_account_state } = context;
				// eslint-disable-next-line no-console
				console.log('SIDEBAR',user_account_state.user_account);

				return (
					<div>
						{user_account_state.user_account.uid ? (
							<SideBarMenuAuth />
						) : (
							<SideBarMenuNonAuth />
						)}
					</div>
				);
			}}
			</UserAccountContext.Consumer>
		);
	}
}



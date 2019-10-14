

import React, { Fragment, useState, useEffect, useContext } from 'react';
import * as adminAPI from './admin-api';
import DataTable from '../Tables/Tables';
import {UserAccountContext} from '../../context/UserAccount/userAccountContext';
import {extended_user} from '../Auth/auth-constants';
import './Admin.css';

const ManageUsers = () => {
	const [users,setUsers] = useState([]);
	const [data,setData] = useState({});
	const [manageUser,setUser] = useState(extended_user);
	const [inline,setInline] = useState({message:'',message_type:'info'});
	const {user_account_state} = useContext(UserAccountContext);
    
	const ManageUser = uid => {
		console.log('Manage this User',uid);

	};

	const createDataTable = () => {
        
		let user_rows = [];

		users.forEach(user => {        
			user_rows.push({
				names: <span
					className='admin-list'
					onClick={e => ManageUser(user.uid)}
				> user.names</span>,
				surname: user.surname,
				cell: user.cell,
				email: user.email,
				is_admin: user.is_admin ? 'Yes' : 'No'
			});
		});

	    let data = {
			columns: [
				{
					label: 'Names',
					field: 'names',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Surname',
					field: 'surname',
					sort: 'asc',
					width: 270
				},
				{
					label: 'cell',
					field: 'cell',
					sort: 'asc',
					width: 200
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
					width: 100
				},
				{
					label: 'is Admin',
					field: 'is_admin',
					sort: 'asc',
					width: 150
				}
			],
			rows:  user_rows
		};  
          
		return data;

	};


	useEffect(() => {
		const uid = user_account_state.user_account.uid;
		adminAPI.fetchUsers(uid).then(response => {
			if(response.status){
				setUsers(response.payload);
			}else{
				setInline({message:response.error.message,message_type:'error'});
			}

		});
		return () => {
			setUsers([]);
		};
	}, []);
    
	useEffect(() => {
		setData(createDataTable());
		return () => {
			setData({});
		};
	}, [users]);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box box-title">
						<i className="fa fa-dashboard"> </i> Users
					</h3>
				</div>

				<DataTable data={data} />
			</div>
		</Fragment>
	);

};

const Admin = () => {
	const[display,setDisplay] = useState('users');
	const [adminMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

		

	return(
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-cogs"> </i>
                        Admin
					</h3>

					<div className="box-tools">
						<div className="dropdown">
							<button
								type="button"
								className="btn btn-box-tool dropdown"
								onClick={e => showDropdownMenu(e)}
							>
								<i className='fa fa-bars'> </i>{' '}
							</button>
							{adminMenu.menu ? (
								<ul className="dropmenu">
									<li className="btn btn-block droplink"
										name="users"
										onClick={() => setDisplay('users')}
									>
										<i className="fa fa-users"> </i>
									Users
									</li>
									<li className="btn btn-block droplink"
										name="chat"
										onClick={() => setDisplay('chat')}
									>
										<i className="fa fa-comment"> </i>
											Chat
									</li>


								</ul>
							): null 
							}
						</div>
					</div>
				</div>

				{
					display === 'users' ? (<ManageUsers />) : ('')
				}

			</div>
		</Fragment>
	);


};


export default Admin;
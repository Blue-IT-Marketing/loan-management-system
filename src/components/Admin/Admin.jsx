

import React, { Fragment, useState, useEffect, useContext } from 'react';
import * as adminAPI from './admin-api';
import DataTable from '../Tables/Tables';
import {UserAccountContext} from '../../context/UserAccount/userAccountContext';
import {extended_user, extended_user_error} from '../Auth/auth-constants';
import './Admin.css';
import InlineError from '../Forms/InlineError';
import { updateUser } from '../Auth/auth-api';
import { Utils } from '../../utilities';


const UserManager = ({manage_user}) => {
	const [user,setUser] = useState(extended_user);
	const [errors,setError] = useState(extended_user_error);

	const checkErrors = async e => {
        e.preventDefault();
		let isError = false;

		const check_names = () => {
			if(Utils.isEmpty(user.names)){
				setError({...errors,names_error : 'names field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_surname = () => {
			if (Utils.isEmpty(user.surname)){
				setError({...errors, surname_error : 'surname field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_cell = () => {
			if (!Utils.isCell(user.cell)){
				setError({...errors,cell_error : 'cell number is invalid'});
				return true;
			}
			return false;
		};
		const check_email = () => {
			if(!Utils.validateEmail(user.email)){
				setError({...errors,email_error : 'email field is invalid'});
				return true;                 
			}
			return false;
		};
        
		check_names() ? isError = true : isError = isError;
		check_surname() ? isError = true : isError = isError;
		check_cell() ? isError = true : isError = isError;
		check_email() ? isError = true : isError = isError;
        

		return isError;
	};
    
    const updateUser = async e => {
        
        
    }

	useEffect(() => {
		setUser(manage_user);
		return () => {
        
		};
	}, [manage_user]);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">Manage User</h3>
				</div>

				<form className="form-horizontal">
					<div className="form-group">
						<label>Names</label>
						<input
							type="text"
							className="form-control"
							name="names"
							value={user.names}
							onChange={e =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
						/>
						{errors.names_error ? (
							<InlineError message={errors.names_error} />
						) : null}
					</div>
					<div className="form-group">
						<label>Surname</label>
						<input
							type="text"
							className="form-control"
							name="surname"
							value={user.surname}
							onChange={e =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
						/>
						{errors.surname_error ? (
							<InlineError message={errors.surname_error} />
						) : null}
					</div>
					<div className="form-group">
						<label>Cell</label>
						<input
							type="tel"
							className="form-control"
							name="cell"
							value={user.cell}
							onChange={e =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
						/>
						{errors.cell_error ? (
							<InlineError message={errors.cell_error} />
						) : null}
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							name="email"
							value={user.email}
							onChange={e =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
						/>
						{errors.email_error ? (
							<InlineError message={errors.email_error} />
						) : null}
					</div>
					<div className="form-group">
						<label>Is Admin</label>
						<select
							className="form-control"
							name="is_admin"
							value={user.is_admin}
							onChange={e =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
					</div>

					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success'
							name='save-user'
							onClick={e => updateUser(e)}
						>
							<strong>
                                Update User
							</strong>

						</button>
					</div>

				</form>
			</div>
		</Fragment>
	);
};

const ManageUsers = () => {
	const [users,setUsers] = useState([]);
	const [data,setData] = useState({});
	const [manageUser,setUser] = useState(extended_user);
	const [inline,setInline] = useState({message:'',message_type:'info'});
	const {user_account_state} = useContext(UserAccountContext);
    
	const ManageUser = uid => {
		console.log('Manage this User',uid);
		setUser(users.find(user => user.uid === uid));
	};

	const createDataTable = () => {
        
		let user_rows = [];

		users.forEach(user => {        
			user_rows.push({
				names: <span
					className='admin-list'
					onClick={e => ManageUser(user.uid)}
				> {user.names} </span>,
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
				{
					manageUser.uid ?
						<UserManager manage_user={manageUser} /> 
						: <DataTable data={data} />
				}
				
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
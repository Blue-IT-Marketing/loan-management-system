/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React,{Fragment,useState,useEffect,useContext} from 'react';
import axios from 'axios';
import {Utils} from '../../utilities';
import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { routes } from '../../constants';
import CompanyDetails from './CompanyDetails';
import {settings} from '../../constants';
import {extended_user, extended_user_error} from '../Auth/auth-constants';

import * as authAPI from '../Auth/auth-api';
import * as usersAPI from './user-api';
import * as companyAPI from './company-api';
import DataTable from '../Tables/Tables';


let user_errors_init = {
	names_error: '',
	surname_error: '',
	cell_error: '',
	email_error: '',
};
let inline_init ={
	message : '',
	message_type : 'INFO',
};

function ManageUser({user}){
	const [display,setDisplay] = useState('manage-user');
	const[localUser,setLocalUser] = useState(extended_user);
	const[errors,setError] = useState(extended_user_error);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const { user_account_state } = useContext(UserAccountContext);


	const onBlockUser = e => {
		const user_detail = localUser;
		const uid = user_account_state.user_account.uid;
		
		usersAPI.blockUser(uid,user_detail).then(response => {
			if(response.status){
				setInline({message:'user successfully blocked',message_type:'info'})
			}else{
				setInline({message:response.error.message,message_type:'error'});
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});

	}
	const onInviteUser = e => {
		console.log(e.target);
		const user_detail = localUser;
		const uid = user_account_state.user_account.uid;
		usersAPI.sendInvite(uid,user_detail).then(response => {
			if(response.status){
				setInline({message:'invitation email was successfully sent',message_type:'info'});
			}{
				setInline({message:response.error.message,message_type:'error'});
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});
	};


	useEffect(() => {
		setLocalUser(user);
		return () => {
			setLocalUser(extended_user);
		};
	}, [user]);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">Manage User</h3>

					<div className='box-tools'>
						<button
							type='button'
							className='btn btn-box-tool'
							name='blockuser'
							onClick={e => setDisplay('block-user')}
						>
							<i className='fa fa-cut'> </i>{' '}Block User		
						</button>
					</div>
				</div>
				{
					display === 'manage-user' ?

				
						<form className="form-horizontal">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									name="names"
									value={localUser.names}
									onChange={e =>
										setLocalUser({ ...localUser, [e.target.name]: e.target.value })
									}
								/>
								{errors.names_error ? (
									<InlineError message={errors.names_error} />
								) : (
									''
								)}
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									name="surname"
									value={localUser.surname}
									onChange={e =>
										setLocalUser({ ...localUser, [e.target.name]: e.target.value })
									}
								/>
								{errors.surname_error ? (
									<InlineError message={errors.surname_error} />
								) : (
									''
								)}
							</div>

							<div className="form-group">
								<input
									type="text"
									className="form-control"
									name="cell"
									value={localUser.cell}
									onChange={e =>
										setLocalUser({ ...localUser, [e.target.name]: e.target.value })
									}
								/>
								{errors.cell_error ? (
									<InlineError message={errors.cell_error} />
								) : (
									''
								)}
							</div>

							<div className="form-group">
								<input
									type="text"
									className="form-control"
									name="email"
									value={localUser.email}
									onChange={e =>
										setLocalUser({ ...localUser, [e.target.name]: e.target.value })
									}
								/>
								{errors.email_error ? (
									<InlineError message={errors.email_error} />
								) : (
									''
								)}
							</div>

							<div className="form-group">
								<button
									type="button"
									className="btn btn-success btn-lg"
									name="save"
									onClick={e => onInviteUser(e)}
								>
									<strong>
										<i className="fa fa-send-o"> </i> Invite
									</strong>
								</button>

							</div>
						</form>
						: null}
				{
					display === 'block-user' ?
						<form className='form-horizontal'>
							<div className='form-group'>
								<input 
									type='text' 
									className='form-control'
									name='names'
									value={localUser.names}
								/>
							</div>
							<div className='form-group'>
								<input 
									type='text' 
									className='form-control'
									name='surname'
									value={localUser.surname}
								/>
							</div>
							<div className='form-group'>
								<input 
									type='text' 
									className='form-control'
									name='cell'
									value={localUser.cell}
								/>
							</div>

							<div className='form-group'>
								<button
									type='button'
									className='btn btn-danger btn-lg'
									onClick={e => onBlockUser(e)}

								><i className='fa fa-cut'> </i> {' '} Block User
								</button>
							</div>

						</form>: null
				}
			</div>
		</Fragment>
	);
}

function PersonalDetails({user_account}){
	
	const [personalDetails, setPersonalDetails] = useState(extended_user);	
	const [errors,setErrors] = useState(user_errors_init);
	const[inline,setInline] = useState(inline_init);


	const onCheckErrors = async e => {
		let isError = false;

		const check_names = () => {
			if(Utils.isEmpty(personalDetails.names)){
				setErrors({...errors,names_error:'names field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_surname = () => {
			if(Utils.isEmpty(personalDetails.surname)){
				setErrors({...errors,surname_error:'surname field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_cell = () => {
			if(Utils.isCell(personalDetails.cell) === false){
				setErrors({...errors,cell_error:'cell number field is invalid'});
				return true;
			}
			return false;
		};
		const check_email = () => {
			if(Utils.validateEmail(personalDetails.email) === false){
				setErrors({...errors,email_error:'email field is invalid'});
				return true;
			}
			return false;
		};

		if(await check_names()){
			isError = true;
		}
		if(await check_surname()){
			isError = true;
		}
		if(await check_cell()){
			isError = true;
		}
		if(await check_email()){
			isError = true;
		}

		return isError;
	};

	const onUpdatePersonalDetails = async e => {
		console.log('Updating personal details');
		// check for errors if found indicate the errors and exit
		// save personal details on localStorage. then save on backend
		//  setState = async(seed, stateKey, state);

		const sent_user = JSON.stringify(personalDetails);
		
		console.dir('this is what i am sending', sent_user);

		authAPI.updateUser(sent_user).then(response => {
			if(response.status){
				setPersonalDetails(response.payload);
				setInline({ message: 'successfully update user personal details' });				
			}else{
				setInline({message:response.error.message,message_type:'error'});
			}

		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});

	};

	
	useEffect(() => {

		const uid = user_account.uid;

		authAPI.fetchUser(uid).then(response => {

			if(response.status){
				setPersonalDetails(response.payload);
			}else
			{
				setPersonalDetails({...personalDetails,
					uid : user_account.uid,
					email : user_account.email,
					cell : user_account.phoneNumber
				});
			}	
		}).catch(error => {
			console.error(error);
		});

		return () => {
			setPersonalDetails(extended_user);
		};
	}, []);

	return (
		<div className="box box-body">
			<div className="box-header">
				<h3 className="box-title">
					<strong>
						<small>
							{' '}
							<i className="fa fa-user"> </i> Personal Details{' '}
						</small>
					</strong>
				</h3>
			</div>

			<div className="box-footer col-lg-8">
				<form className="form-horizontal">
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="names"
							placeholder="Names..."
							value={personalDetails.names}
							onChange={e => setPersonalDetails({...personalDetails,[e.target.name]:e.target.value})}
						/>
						{errors.names_error ? <InlineError message={errors.names_error}/> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="surname"
							placeholder="Surname..."
							value={personalDetails.surname}
							onChange={e => setPersonalDetails({...personalDetails,[e.target.name]:e.target.value})}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error}/> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cell"
							placeholder="Cell..."
							value={personalDetails.cell}
							onChange={e => setPersonalDetails({...personalDetails,[e.target.name]:e.target.value})}
						/>
						{errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="email"
							placeholder="Email..."
							value={personalDetails.email}
							onChange={e => setPersonalDetails({...personalDetails,[e.target.name]:e.target.value})}
						/>
						{errors.email_error ? <InlineError message={errors.email_error}/> : ''}
					</div>
					<div className="form-group">
						<button
							type="button"
							className="btn btn-success btn-lg"
							name="update"
							onClick={e => onCheckErrors(e).then(isError => {
								if(isError){
									throw new Error('error processing form');
								}else{
									onUpdatePersonalDetails(e).then(result => {
										console.log(result);
									});
								}
							}).catch(error => {
								setInline({message:error.message,message_type:'error'});
							})								
							}
						>
							<strong>
								<i className="fa fa-save"> </i> Update
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-warning btn-lg"
							name="reset"
							onClick={() => {
								setInline({message:'',message_type:'INFO'});
								setErrors({...user_errors_init});
								setPersonalDetails({...extended_user});
							}}
						>
							<strong>
								<i className="fa fa-eraser"> </i> Reset
							</strong>
						</button>
					</div>
					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : '' }
					</div>
				</form>
			</div>
		</div>
	);
}

function ActiveUsers(){

	const [users,setUsers] = useState([]);
	const [datatable,setDataTable] = useState({});
	const {user_account_state} = useContext(UserAccountContext);
	const [user,setUser] = useState(extended_user);
	
	const OpenUser = async uid => {		
		setUser(users.find(user => user.uid === uid));
	};

	const prepareDataTable = async () => {
		let rowdata = [];
		
		users.forEach(user => {

			rowdata.push({
				names : 
				<span 					
					className='lead-list'					
					onClick={e => OpenUser(user.uid)}
				> {user.names} </span>,
				surname: user.surname,
				cell: user.cell,
				email: user.email,												
			});
		});		
	
		const data = {
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
				}

			],
			rows: rowdata
		};

		return data;

	};

	const onSendInvite = async => {
		const user_detail = user;
		usersAPI.sendInvite(user_detail).then(response => {

		});


	};


	useEffect(() => {
		
		const uid = user_account_state.user_account.uid;

		companyAPI.fetchCompany(uid).then(response => {

			if (response.status){

				const company_id = response.payload.company_id;

				usersAPI.fetchActiveUsers(uid,company_id).then(response => {
					if(response.status){
						setUsers(response.payload);
					}else{
						setUsers([]);
					}
				}).catch(error => {
					setUsers([]);
				});
			}else{
				console.log(response.error.message);
			}
		}).catch(error => {
			console.log(error.message);
		});
		
	  return () => {
		
	  };
	}, []);

	useEffect(() => {
		prepareDataTable().then(results => {
			setDataTable(results);
		}).catch(error => {
			console.log(error.message);
		});

		return () => {
			setDataTable({});
		};
	}, [users]);
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-users"> </i> Active Users
					</h3>
				</div>
				{user.uid ? <ManageUser user={user} /> : <DataTable data={datatable} />}
			</div>
		</Fragment>
	);
}


function AddUsers(){
	
     
	const[user,setUser] = useState(extended_user);

	const [errors,setErrors] = useState(user_errors_init);

	const[inline,setInline] = useState(inline_init);

	function onChangeHandler(e){
		setUser({
			...user,
			[e.target.name]:e.target.value
		});

	}

	async function onCheckErrors(e){
		
		let do_check_errors =async () => {
			
			let isError = false;


			const check_names = () => {
				if (Utils.isEmpty(user.names) === true){
					setErrors({
						...errors,
						names_error : 'Names field cannot be empty'
					});
					return true;
				}
				return false;

			};

			const check_surname = () => {
				if (Utils.isEmpty(user.surname) === true){
					setErrors({
						...errors,
						surname_error : 'Surname field cannot be empty'
					});
					return true;
				}
				return false;
			};

			const check_cell = () => {
				if (Utils.isCell(user.cell) === false){
					setErrors({
						...errors,
						cell_error : 'Cell number field is invalid'
					});
					return true;
				}
				return false;
			};

			const check_email = () => {
				if (Utils.validateEmail(user.email) === false){
					setErrors({
						...errors,
						email_error: 'Email field is invalid'
					});
					return true;
				}
				return false;
			};

			if(await check_names()){
				isError = true;
			}

			if(await check_surname()){
				isError = true;
			}
			if(await check_cell()){
				isError = true;
			}
			if(await check_email()){
				isError = true;
			}

			return isError;
		};

		return await do_check_errors();
	}

	async function onAddUser(e){
		
		try{
			axios.post(routes.user_api_url,JSON.stringify(user)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('There was an error creating a new user');
				}
			}).then(user_data => {				
				setUser(user_data);
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});

		}catch(error){
			setInline({ message: error.message, message_type: 'error' });
		}
	}

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-user-plus"> </i> Add Users
					</h3>
				</div>

				<div className="box box-footer">
					<form className="form-horizontal">
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="names"
								value={user.names}
								onChange={e => onChangeHandler(e)}
								placeholder="Names..."
							/>
							{errors.names_error ? 
								<InlineError message={errors.names_error} /> : ''
							}
							
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="surname"
								onChange={e => onChangeHandler(e)}
								value={user.surname}
								placeholder="Surname..."
							/>
							{errors.surname_error ?
								<InlineError message={errors.surname_error} /> : ''
							}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="cell"
								onChange={e => onChangeHandler(e)}
								value={user.cell}
								placeholder="Cell..."
							/>
							{errors.cell_error ?
								<InlineError message={errors.cell_error} /> : ''
							}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="email"
								onChange={e => onChangeHandler(e)}
								value={user.email}
								placeholder="Email..."
							/>
							{errors.email_error ?
								<InlineError message={errors.email_error} /> :''
							}
						</div>
						<div className="form-group">
							<button
								type="button"
								className="btn btn-success btn-lg"
								name="adduser"
								onClick={e => {
									onCheckErrors().then(result =>{
										if (result === true){
											// there where errors
											throw new Error('There where errors processing form');
										}else{
										  onAddUser(e).then(result => {
											  console.log(result);
										  }).catch(error => {
												setInline({
													message:'There where errors adding user : ' + error,
													message_type : 'Error'
												});
										  });
										}										
									}).catch(error => {
										setInline({
											message:'There where errors adding user : ' + error,
											message_type : 'Error'
										});

										console.log('Error sending form',error);
									});
								}}
							>
								<i className="fa fa-user-plus"> </i> Add User
							</button>


							<button
								type={'button'}
								className='btn btn-warning btn-lg'
								name='reset'
								onClick={e => {
									setUser(extended_user);
									setErrors(user_errors_init);
									setInline(inline_init);
								}}
							><strong><i className='fa fa-eraser'> </i> Reset</strong>

							</button>
						</div>
						<div className='form-group'>
							{inline.message ?
								<InlineMessage 
									message={inline.message} 
									message_type={inline.message_type}  /> 
								: ''
							}							
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
}

function UserDetails(){
	const [display, setDisplay] = useState('active-users');
	const [userDetailsMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};
		

	
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-users"> </i>
            Users
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
							{userDetailsMenu.menu ? (
								<ul className="dropmenu">
									<li className="btn btn-block droplink"
										name="active-users"
										onClick={() => setDisplay('active-users')}
									>
										<i className="fa fa-user"> </i>
											Active Users
									</li>
									<li className="btn btn-block droplink"
										name="add-users"
										onClick={() => setDisplay('add-users')}
									>
										<i className="fa fa-user-plus"> </i>
									Add Users
									</li>
									<li className="btn btn-block droplink"
										name="blocked-users"
										onClick={() => setDisplay('blocked-users')}
									>
										<i className="fa fa-user-secret"> </i>
										Blocked Users
									</li>


								</ul>
							): null 
							}
						</div>
					</div>
				</div>

				{
					display === 'add-users' ? (<AddUsers />) : ('')
				}
				{
					display === 'active-users' ? (<ActiveUsers />) : ('')
				}

			</div>
		</Fragment>
	);
}


export default function Account (){
	const [display, setDisplay] = useState('personaldetails');
	const [accountMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};
    

	useEffect(() => {
		console.log(display);
	}, []);

	return (
		<UserAccountContext.Consumer>{(context) => {
			const { doSendEmailVerification, user_account_state } = context;
			return (
				<Fragment>
					<div className="box box-body">
						<div className="box-header">
							<h3 className="box-title">
								<strong>
									<i className="fa fa-sign-in"> </i> Account
								</strong>
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
									{accountMenu.menu ? (
										<ul className="dropmenu">
											<li className="btn btn-block droplink"
												name="personaldetails"
												onClick={e => setDisplay('personaldetails')}
											>
												<i className="fa fa-user"> </i> Personal Details
											</li>

											<li className="btn btn-block droplink"
												name="companydetails"
												onClick={e => setDisplay('companydetails')}
											>
												<i className="fa fa-registered"> </i> Company Details
											</li>

											<li className="btn btn-block droplink"
												name="users"
												onClick={e => setDisplay('users')}
											>
												<i className="fa fa-users"> </i> Users
											</li>

										</ul>
									):null}
								</div>
							</div>
						</div>

						{display === 'personaldetails' ? (
							<PersonalDetails
								user_account={user_account_state.user_account}
							/>
						) : (
							''
						)}
						{display === 'companydetails' ? <CompanyDetails /> : ''}

						{display === 'users' ? <UserDetails /> : ''}
					</div>
				</Fragment>
			);
		}}
		</UserAccountContext.Consumer>
	);
}

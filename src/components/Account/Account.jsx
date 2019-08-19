/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React,{Fragment,useState,useEffect,useContext} from 'react';
import Switch from 'react-switch';
import axios from 'axios';
import {Utils} from '../../utilities';

import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { routes } from '../../constants';
import CompanyDetails from './CompanyDetails';
import {myStore} from '../../localstorage';
import {settings} from '../../constants';

let user_init = {
	uid: '',
	names: '',
	surname: '',
	cell: '',
	email: '',
};
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



function PersonalDetails({user_account}){
	
	const [personalDetails, setPersonalDetails] = useState({
		uid: user_account.uid,
		names: '',
		surname: '',
		cell: user_account.phoneNumber,
		email: user_account.email
	});
	const { uid, names, surname, cell, email } = personalDetails;

	const [errors,setErrors] = useState(user_errors_init);

	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	let onChangeHandler = e => {
		setPersonalDetails({
			...personalDetails,
			[e.target.name]:e.target.value
		});
	};

	let onCheckErrors = async e => {
		let isError = false;

		const check_names = () => {
			if(Utils.isEmpty(names)){
				setErrors({...errors,names_error:'names field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_surname = () => {
			if(Utils.isEmpty(surname)){
				setErrors({...errors,surname_error:'surname field cannot be empty'});
				return true;
			}
			return false;
		};
		const check_cell = () => {
			if(Utils.isCell(cell) === false){
				setErrors({...errors,cell_error:'cell number field is invalid'});
				return true;
			}
			return false;
		};
		const check_email = () => {
			if(Utils.validateEmail(email) === false){
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

	let onUpdatePersonalDetails = async e => {
		console.log('Updating personal details');
		// check for errors if found indicate the errors and exit
		// save personal details on localStorage. then save on backend
		//  setState = async(seed, stateKey, state);
		try{
			let stateKey = settings.localStorageKey + '-' + uid + '-' + 'user-personal-details';
			
			myStore.setState(uid,stateKey,personalDetails).then(result => {
				console.log(result);
			}).catch(error => {
				console.log(error);
			});

			await axios.put(routes.user_api_url,JSON.stringify(personalDetails)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('error updating user personal details');
				}
			}).then(personalDetails => {
				setPersonalDetails({personalDetails});				
				setInline({message:'successfully update user personal details'});				
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});
		}catch(error){
			setInline({ message: error.message, message_type: 'error' });
		}
	};

	console.log('USER ACCOUNT',uid);

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
							value={names}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.names_error ? <InlineError message={errors.names_error}/> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="surname"
							placeholder="Surname..."
							value={surname}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error}/> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cell"
							placeholder="Cell..."
							value={cell}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="email"
							placeholder="Email..."
							value={email}
							onChange={e => onChangeHandler(e)}
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
								setPersonalDetails({...user_init});
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
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>						
						<i className='fa fa-users'> </i> {' '}
							Active Users						
					</h3>
				</div>
			</div>
		</Fragment>
	);
}


function AddUsers(){
	
     
	const[user,setUser] = useState(user_init);

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
		e.preventDefault();
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
									setUser(user_init);
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
	const [display, setDisplay] = useState('add-users');
	
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-users"> </i>
            Users
					</h3>

					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool"
							name="add-users"
							onClick={() => setDisplay('add-users')}
						>
							<i className="fa fa-user-plus"> </i>
              Add Users
						</button>

						<button
							type="button"
							className="btn btn-box-tool"
							name="active-users"
							onClick={() => setDisplay('active-users')}
						>
							<i className="fa fa-user"> </i>
              Active Users
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="blocked-users"
							onClick={() => setDisplay('blocked-users')}
						>
							<i className="fa fa-user-secret"> </i>
              Blocked Users
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="remove-users"
							onClick={() => setDisplay('remove-users')}
						>
							<i className="fa fa-user-times"> </i>
              Remove Users
						</button>
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
    
	let onSwitchScreen = (e) => {
		setDisplay(e.target.name);
		console.log(display);        
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
								<button
									type="button"
									className="btn btn-box-tool"
									name="personaldetails"
									onClick={e => onSwitchScreen(e)}
								>
									<i className="fa fa-user"> </i> Personal Details
								</button>
								<button
									type="button"
									className="btn btn-box-tool"
									name="companydetails"
									onClick={e => onSwitchScreen(e)}
								>
									<i className="fa fa-registered"> </i> Company Details
								</button>
								<button
									type="button"
									className="btn btn-box-tool"
									name="users"
									onClick={e => onSwitchScreen(e)}
								>
									<i className="fa fa-users"> </i> Users
								</button>
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

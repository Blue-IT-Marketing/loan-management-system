/* eslint-disable no-console */
import React,{Fragment,useState,useEffect,useContext} from 'react';
import Switch from 'react-switch';
import axios from 'axios';
import {Utils} from '../../utilities';

import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { routes } from '../../constants';

let user_init = {
	uid: '',
	names: '',
	surname: '',
	cell: '',
	email: '',
};
let errors_init = {
	names_error: '',
	surname_error: '',
	cell_error: '',
	email_error: '',
};
let inline_init ={
	message : '',
	message_type : 'INFO',
};

let company_init = {
  company_id: "",
  uid: "",
  company: "",
  reg: "",
  fsp: "",
  ncr: "",
  physical: "",
  postal: ""
};

let company_errors = {
  uid_error: "",
  company_error: "",
  reg_error: "",
  fsp_error: "",
  ncr_error: "",
  physical_error: "",
  postal_error: ""
};


function PersonalDetails({user_account}){
	
	const [personalDetails, setPersonalDetails] = useState({
		userid: user_account.uid,
		names: '',
		surname: '',
		cell: user_account.phoneNumber,
		email: user_account.email
	});
	const { userid, names, surname, cell, email } = personalDetails;

	const [errors,setErrors] = useState({
		names_error : '',
		surname_error : '',
		cell_error : '',
		email_error : '',
	});


	let onChangeHandler = e => {
		setPersonalDetails({
			...personalDetails,
			[e.target.name]:e.target.value
		});
	};

	let onCheckErrors = () => {

	}

	let onUpdatePersonalDetails = e => {
		console.log('Updating personal details');
		// check for errors if found indicate the errors and exit
		// save personal details on localStorage. then save on backend
	};

	console.log('USER ACCOUNT',userid);

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
					</div>
					<div className="form-group">
						<button
							type="button"
							className="btn btn-success btn-lg"
							name="update"
							onClick={e => onUpdatePersonalDetails(e)}
						>
							<strong>
								<i className="fa fa-cloud-upload"> </i> Update
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-warning btn-lg"
							name="cancel"
						>
							<strong>
								<i className="fa fa-cut"> </i> Cancel
							</strong>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}


function CompanyDetails(){
	
	const [company, setCompany] = useState(company_init);
	const[errors,setErrors] = useState(company_errors);
	const[inline,setInline] = useState(inline_init);

	async function onCheckErrors(){
		let isError = false;

		const check_uid = () => {
			if(Utils.isEmpty(company.uid)){
				setErrors({
					...errors,
					uid_error:'Company is not attached to a valid account'
				});
				return true;
			}
			return false;
		};

		const check_company = () => {
			if(Utils.isEmpty(company.company)){
				setErrors({
					...errors,
					company_error:'Company name field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_reg = () => {
			if(Utils.isCompanyReg(company.reg) === false){
				setErrors({
					...errors,
					reg_error:'Company registration number not valid'
				});
				return true;
			}
			return false;
		};

		const check_fsp = () => {
			if(Utils.isFSP(company.fsp) === false){
				setErrors({
					...errors,
					fsp_error:'FSP number not valid'
				});
				return true;
			}
			return false;
		};

		const check_ncr = () => {
			if (Utils.isNCR(company.ncr) === false){
				setErrors({
					...errors,
					ncr_error:'NCR number is not valid'
				});
				return true;
			}
			return false;
		};

		const check_physical = () => {
			if (Utils.isEmpty(company.physical)){
				setErrors({
					...errors,
					physical_error:'physical address cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_postal = () => {
			if(Utils.isEmpty(company.postal)){
				setErrors({
					...errors,
					postal_error:'postal address cannot be empty'
				});
				return true;
			}
			return false;
		};

		if (await check_uid()){
			isError = true;
		}
		if ( await check_company()){
			isError = true;
		}
		if( await check_reg()){
			isError = true;
		}
		if(await check_ncr()){
			isError = true;
		}
		if(await check_fsp()){
			isError = true;
		}
		if(await check_physical()){
			isError = true;
		}
		if(await check_postal()){
			isError = true;
		}

		return isError;

	}
	
	function onChangeHandler (e){
		setCompany({
			...company,
			[e.target.name]: e.target.value
		});
	}

	async function onUpdateCompany(e){
		e.preventDefault();
		axios.post(routes.company_api_url,JSON.stringify(company)).then(result => {
			if(result.status === 200){
				return result.data;
			}else{
				throw new Error('There was creating company');
			}
		}).then(company_data => {
			setCompany(JSON.parse(company_data));
			setInline({message:'a new company was successfully created'});
		}).catch(error => {
			console.log('Error :',error);
			setInline({message:error.message,message_type:'error'});
		});
	}


	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-registered"> </i> Company Details
					</h3>
				</div>

				<div className="box box-footer">
					<form className="form-horizontal">
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="company"
								value={company.company}
								onChange={e => onChangeHandler(e)}
								placeholder="Company Name..."
							/>
							{errors.company_error ?
								<InlineError 
									message={errors.company_error} /> 
								: ''							
							}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="reg"
								value={company.reg}
								onChange={e => onChangeHandler(e)}
								placeholder="Reg Number..."
							/>
							{errors.reg_error ?
								<InlineError 
									message={errors.reg_error} />
								:''
							}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="fsp"
								value={company.fsp}
								onChange={e => onChangeHandler(e)}
								placeholder="FSP..."
							/>
							{errors.fsp_error ?
								<InlineError
									message={errors.fsp_error} />
								:''
							}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="ncr"
								value={company.ncr}
								onChange={e => onChangeHandler(e)}
								placeholder="NCR..."
							/>
							{errors.ncr_error ? 
								<InlineError
									message={errors.ncr_error} />
								:''
							}
						</div>

						<div className="form-group">
							<textarea
								className="form-control"
								name="physical"
								value={company.physical}
								onChange={e => onChangeHandler(e)}
								placeholder="Physical Address..."
							/>
							{errors.physical_error ?
								<InlineError
									message={errors.physical_error} />
								:''
							}
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								name="postal"
								value={company.postal}
								onChange={e => onChangeHandler(e)}
								placeholder="Postal Address..."
							/>
							{errors.postal_error ?
								<InlineError
									message={errors.postal_error} />
								:''
							}
						</div>
						<div className="form-group">
							<button
								type="button"
								className="btn btn-success btn-lg"
								name="update"
								onClick={e => {
									onCheckErrors(e).then(result => {
										if (result){
											throw new Error('There was an error processing form');
										}else{
											onUpdateCompany(e);

										}
									}).catch(error => {
										console.log(error);										

										setInline({
											message:error.message,
											message_type:'error'
										});
									});
								}}
							><i className="fa fa-cloud-upload"> </i> Update								
							</button>
							<button
								type={'button'}
								className='btn btn-warning btn-lg'
								name='reset'
								onClick={e => {
									setInline(inline_init);
									setErrors(company_errors);
									setCompany(company_init);
								}}
							><i className='fa fa-eraser'> </i> Reset
							</button>
						</div>
						<div className='form-group'>
							{
								inline.message ?
									<InlineMessage 
										message={inline.message} 
										message_type={inline.message_type}/> 
									: ''
							}
							
						</div>
					</form>
				</div>
			</div>
		</Fragment>
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

	const [errors,setErrors] = useState(errors_init);

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

	function onAddUser(e){
		e.preventDefault();
		
		axios.post(routes.user_api_url,JSON.stringify(user)).then(result => {
			if(result.status === 200){
				return result.data;
			}else{
				throw new Error('There was an error creating a new user');
			}
		}).then(user_data => {
			setUser(JSON.parse(user_data));
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});
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
										  onAddUser();
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
									setErrors(errors_init);
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

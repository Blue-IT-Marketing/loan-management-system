/* eslint-disable no-unused-vars */
import React,{Fragment,useState} from 'react';
import { Utils } from '../../utilities';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';
import axios from 'axios';
import {routes} from '../../constants';


let employment_details_init = {
	client_id: '',
	employer_name: '',
	employee_number: '',
	department: '',
	employee_kind: '',
	contract: '',
	date_employed : ''
};

let employment_details_error_init = {
	employer_name_error : '',
	employee_number_error : '',
	department_error : '',
	employee_kind_error : '',
	contract_error : '',
	date_employed_error : ''
};

let employer_address_init = {
	client_id : '',
	stand_number: '',
	street_name: '',
	city: '',
	province: '',
	country: '',
	postal_code: '',
};

let employer_address_error_init = {
	stand_number_error: '',
	street_name_error: '',
	city_error: '',
	province_error: '',
	country_error: '',
	postal_code_error: '',
};

function EmployerAddress () {

	const[employer_address,setEmployerAddress] = useState(employer_address_init);
	const[errors,setErrors] = useState(employer_address_error_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	const{
		client_id,
		stand_number,
		street_name,
		city,
		province,
		country,
		postal_code
	} = employer_address;
    
	const onHandleChange = (e) => {
		setEmployerAddress({
			...employer_address,
			[e.target.name]:e.target.value
		});
	};
    
	const onCheckErrors = async e => {
		console.log(e);
		let isError = false;
		const check_stand_number = () => {
			if(Utils.isEmpty(stand_number)){
				setErrors({
					...errors,
					stand_number_error: 'stand number field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_street_name = () => {
			if(Utils.isEmpty(street_name)){
				setErrors({
					...errors,
					street_name_error: 'street name field cannot be empty'
				});
				return true;
			}
			return false;
		};        
		const check_city = () => {
			if(Utils.isEmpty(city)){
				setErrors({
					...errors,
					city_error : 'city field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_province = () => {
			if(Utils.isProvince(province) === false){
				setErrors({
					...errors,
					province_error: 'please select province'
				});
				return true;
			}
			return false;
		};
		const check_country = () => {
			if(Utils.isEmpty(country)){
				setErrors({
					...errors,
					country_error: 'country field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_postal_code = () => {
			if(Utils.isEmpty(postal_code)){
				setErrors({
					...errors,
					postal_code_error: 'postal code field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if(await check_stand_number()){
			isError = true;
		}
		if(await check_street_name()){
			isError = true;
		}
		if(await check_city()){
			isError = true;
		}
		if(await check_province()){
			isError = true;
		}
		if(await check_country()){
			isError = true;
		}
		if(await check_postal_code()){
			isError = true;
		}

		return isError;

	};

	const onSaveEmployerAddress = async e => {
		try{
			await axios.post(routes.loan_employer_address_api_url,JSON.stringify(employer_address)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('error saving employer address');
				}
			}).then(employer_address => {
				setEmployerAddress({employer_address});
				setInline({message:'successfully saved employer address'});
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});
		}catch(error){
			setInline({
				message: error.message,
				message_type: 'error'
			});
		}
	};

	return (
		<Fragment>
			<div className="box box-footer">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-building"> </i> Employer Address
						</strong>
					</h3>
				</div>

				<form className="form-horizontal">
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="stand_number"
							placeholder="Stand Number"
							onChange={e => onHandleChange(e)}
							value={stand_number}
						/>
						{errors.stand_number_error ? (
							<InlineError message={errors.stand_number_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="street_name"
							placeholder="Street Name"
							onChange={e => onHandleChange(e)}
							value={street_name}
						/>
						{errors.street_name_error ? (
							<InlineError message={errors.street_name_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="city"
							placeholder="City"
							onChange={e => onHandleChange(e)}
							value={city}
						/>
						{errors.city_error ? (
							<InlineError message={errors.city_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<select
							className="form-control"
							name="province"
							placeholder="Province"
							onChange={e => onHandleChange(e)}
							value={province}
						>
							{/* ['limpopo', 'mpumalanga', 'north west', 'gauteng', 'kwazulu
              natal', 'eastern cape', 'western cape', 'northern cape', 'orange
              free state']; */}
							<option value={'limpopo'}>Limpopo</option>
							<option value={'north west'}>North West</option>
							<option value={'mpumalanga'}>Mpumalanga</option>
							<option value={'gauteng'}>Gauteng</option>
							<option value={'free state'}>Free State</option>
							<option value={'kwazulu natal'}>Kwazulu Natal</option>
							<option value={'eastern cape'}>Eastern Cape</option>
							<option value={'western cape'}>Western Cape</option>
							<option value={'northern cape'}>Northern Cape</option>
						</select>
						{errors.province_error ? (
							<InlineError message={errors.province_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country"
							onChange={e => onHandleChange(e)}
							value={country}
						/>
						{errors.country_error ? (
							<InlineError message={errors.country_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="postal_code"
							placeholder="Postal Code"
							onChange={e => onHandleChange(e)}
							value={postal_code}
						/>
						{errors.postal_code_error ? (
							<InlineError message={errors.postal_code_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<button
							type="button"
							className="btn btn-success btn-lg"
							name="save"
							onClick={e =>
								onCheckErrors(e)
									.then(isError => {
										if (isError) {
											throw new Error('there was an error processing form');
										} else {
											onSaveEmployerAddress(e).then(result => {});
										}
									})
									.catch(error => {
										setInline({
											message: error.message,
											message_type: 'error'
										});
									})
							}
						>
							<strong>
								<i className="fa fa-save"> </i> Save
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-warning btn-lg"
							name="reset"
							onClick={() => {
								setInline({ message: '', message_type: 'INFO' });
								setErrors(employer_address_error_init);
								setEmployerAddress(employer_address_error_init);
							}}
						>
							<strong>
								<i className="fa fa-eraser"> </i> Reset
							</strong>
						</button>
					</div>
					<div className="form-group">
						{inline.message ? (
							<InlineMessage
								message={inline.message}
								message_type={inline.message_type}
							/>
						) : (
							''
						)}
					</div>
				</form>
			</div>
		</Fragment>
	);
}


function EmployerDetails () {
	const [employment_details, setEmploymentDetails] = useState(
		employment_details_init
	);
	const [errors, setErrors] = useState(employment_details_error_init);
	const [inline, setInline] = useState({ message: '', message_type: 'INFO' });

	const {
		client_id,
		employer_name,
		employee_number,
		department,
		employee_kind,
		contract,
		date_employed
	} = employment_details;

	const onHandleChange = e => {
		setEmploymentDetails({
			...employment_details,
			[e.target.name]: e.target.value
		});
	};
    
	const onCheckErrors = async e => {
		let isError = false;
        
		const check_employer_name = () => {
			if(Utils.isEmpty(employer_name)){
				setErrors({
					...errors,
					employer_name_error: 'Employer Name field cannot be empty'
				});
				return true;
			}
			return false;
		};        
		const check_employee_number = () => {
			if(Utils.isEmpty(employee_number)){
				setErrors({
					...errors,
					employee_number_error: 'Employee Number field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_department = () => {
			if(Utils.isEmpty(department)){
				setErrors({
					...errors,
					department_error: 'Please select department'
				});
				return true;
			}
			return false;
		};        
		const check_employee_kind = () => {
			if(Utils.isEmpty(employee_kind)){
				setErrors({
					...errors,
					employee_kind_error: 'please select employee kind'
				});
				return true;
			}
			return false;
		};        
		const check_contract = () => {
			if(Utils.isEmpty(contract)){
				setErrors({
					...errors,
					contract_error:'please select contract'
				});
				return true;
			}
			return false;
		};        
		const check_date_employed = () => {
			if(Utils.isEmpty(date_employed)){
				setErrors({
					...errors,
					date_employed_error:'date employed cannot be empty' 
				});
				return true;
			}
			return false;
		};

		if(await check_employer_name()){
			isError = true;
		}
		if(await check_employee_number()){
			isError = true;
		}
		if(await check_department()){
			isError = true;
		}
		if(await check_employee_kind()){
			isError = true;
		}
		if(await check_contract()){
			isError = true;
		}
		if(await check_date_employed()){
			isError = true;
		}

		return isError;
	};

	const onSaveEmployerDetails = async e => {
		try{
			await axios.post(routes.loan_employer_details_api_url,JSON.stringify(employment_details)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('there was an error saving employer details');
				}
			}).then(employer_details => {
				setEmploymentDetails({employer_details});
				setInline({message:'Successfully saved employer details'});
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
			});
		}catch(error){
			setInline({
				message: error.message,
				message_type: 'error'
			});
		}
	};

	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								{' '}
								<i className="fa fa-amazon"> </i> Employer Details
							</strong>
						</h3>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="employer_name"
							value={employer_name}
							onChange={e => onHandleChange(e)}
							placeholder="Employer Name"
						/>
						{errors.employer_name_error ? (
							<InlineError message={errors.employer_name_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="employee_number"
							value={employee_number}
							onChange={e => onHandleChange(e)}
							placeholder="Employee Number"
						/>
						{errors.employee_number_error ? (
							<InlineError message={errors.employee_number_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="department"
							value={department}
							onChange={e => onHandleChange(e)}
							placeholder="Department"
						/>
						{errors.department_error ? (
							<InlineError message={errors.department_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<select
							name="employee_kind"
							className="form-control"
							value={employee_kind}
							onChange={e => onHandleChange(e)}
							placeholder="Employee Kind"
						>
							<option value="department">Government Department</option>
							<option value="private">Private</option>
							<option value="pension">Pension</option>
							<option value="grant">Grant</option>
						</select>
						{errors.employee_kind_error ? (
							<InlineError message={errors.employee_kind_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<select
							name="contract"
							className="form-control"
							value={contract}
							onChange={e => onHandleChange(e)}
						>
							<option value="permanent">Permanent</option>
							<option value="temporary">Temporary</option>
							<option value="freelance">Freelance</option>
							<option value="agent">Agent</option>
						</select>
						{errors.contract_error ? <InlineError message={errors.contract_error} /> : ''}
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="date_employed"
							value={date_employed}
							onChange={e => onHandleChange(e)}
							placeholder="Date Employed"
						/>
						{errors.date_employed_error ? <InlineError message={errors.date_employed_error} /> : ''}
					</div>

					<div className="form-group">
						<button
							type="button"
							className="btn btn-success btn-lg"
							name="save"
							onClick={e => onCheckErrors(e).then(isError => {
								if(isError){
									throw new Error('there was an error processing form');
								}else{
									onSaveEmployerDetails(e).then(result => {

									});
								}
							}).catch(error => {
								setInline({message:error.message,message_type:'error'});
							})}
						>
							<strong>
								<i className="fa fa-save"> </i> Save
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-warning btn-lg"
							name="reset"
							onClick={() => {
								setInline({message:'',message_type:'INFO'});
								setErrors(employment_details_error_init);
								setEmploymentDetails(employment_details_init);
							}}
						>
							<strong>
								<i className="fa fa-eraser"> </i> Reset
							</strong>
						</button>
					</div>
					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type}/> :''}
					</div>
				</div>
			</form>
		</Fragment>
	);
}


export default function EmploymentDetails () {
	const[display,setDisplay] = useState('employer-details');
	const [loansMenu, setMenu] = useState({ menu: false });

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
						<strong>
							<i className="fa fa-amazon"> </i> Employment Details
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
							{loansMenu.menu ? (
								<ul className="dropmenu">
									<li className="btn btn-block droplink"
										name="employer-details"
										onClick={() => setDisplay('employer-details')}
									><strong>
											<i className="fa fa-user"> </i>
											Employer Details
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="employer-address"
										onClick={() => setDisplay('employer-address')}
									>
										<strong>
											<i className="fa fa-building"> </i>
													Employer Address
										</strong>
									</li>

								</ul>
							):null}
						</div>

					</div>
				</div>
			
            
				{(display === 'employer-details')? <EmployerDetails /> : ''}
				{(display === 'employer-address')? <EmployerAddress /> : ''}
			</div>
		</Fragment>
	);
}

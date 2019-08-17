/* eslint-disable no-console */
import React, { Fragment, useState } from 'react';
import {Utils} from '../../utilities';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';
import axios from 'axios';
import { routes } from '../../constants';

let personal_details_init = {
	client_id : '',
	title : '',
	surname : '',
	names : '',
	id : '',
	dob : '',
	nationality : ''
};
let personal_details_errors_init = {
	title_error : '',
	surname_error : '',
	names_error : '',
	id_error : '',
	dob_error : '',
	nationality_error : ''
};

let physical_address_init = {
	client_id: '',
	stand: '',
	street_name: '',
	city: '',
	province: '',
	country : '',
	postal_code : ''
};
let physical_address_errors_init = {
	stand_error : '',
	street_name_error : '',
	city_error : '',
	province_error : '',
	country_error : '',
	postal_code_error : ''
};


let postal_address_init = {
	client_id : '',
	box : '',
	city : '',
	province : '',
	postal_code : '',
	country : ''
};

let postal_address_error_init = {
	box_error : '',
	city_error : '',
	province_error : '',
	postal_code_error : '',
	country_error : ''
};

let contact_details_init = {
	client_id : '',
	tel : '',
	cell :'',
	email : ''
};

let contact_details_errors_init = {
	tel_error : '',
	cell_error : '',
	email_error : ''
};

let next_of_kin_init = {
	client_id : '',
	names : '',
	address : '',
	cell : ''
};
let next_of_kin_init_error = {
	names_error : '',
	address_error : '',
	cell_error : ''
};

const PersonalDetails = () => {
	const [personal_details,setPersonalDetails] = useState(personal_details_init);
	const[errors,setErrors] = useState(personal_details_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});
    

	const onChangeHandler = e =>{
		setPersonalDetails({
			...personal_details,
			[e.target.name]:e.target.value
		});
	};

	const onCheckErrors = async e => {
		console.log(e.target);
		let isError = false;
		const {
			title,
			surname,
			names,
			id,
			dob,
			nationality
		} = personal_details;

		const check_title = () =>{
			if(Utils.isEmpty(title)){
				setErrors({
					...errors,
					title_error : 'Please select title'
				});
				return true;
			}
			return false;            
		};
        
		const check_surname = () => {
			if (Utils.isEmpty(personal_details.surname)){
				setErrors({
					...errors,
					surname_error:'Surname field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_names = () => {
			if (Utils.isEmpty(names)){
				setErrors({
					...errors,
					names_error:'Names field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_id = () => {
			if (Utils.isIDNumber(id) === false){
				setErrors({
					...errors,
					id_error:'ID Number is invalid'
				});
				return true;
			}
			return false;
		};
		const check_dob = () => {
			if(Utils.isEmpty(dob)){
				setErrors({
					...errors,
					dob_error:' Date of birth field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_nationality = () => {
			if(Utils.isEmpty(nationality)){
				setErrors({
					...errors,
					nationality_error : 'Nationality field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if(await check_title()){
			isError = true;
		}
		if(await check_surname()){
			isError = true;
		}
		if(await check_names()){
			isError = true;
		}
		if(await check_id()){
			isError = true;
		}
		if(await check_dob()){
			isError = true;
		}
		if(await check_nationality()){
			isError = true;
		}
		return isError;
	};

	const onSavePersonalDetails = async e => {
		axios.post(routes.loan_personal_details_api_url,JSON.stringify(personal_details)).then(result => {
			if(result.status === 200){
				return result.data;
			}else{
				throw new Error('There was an error saving personal details');
			}
		}).then(personal_details => {
			setPersonalDetails({personal_details});
			setInline({message:'Successfully saved personal details, continue adding more client data'});
		}).catch(error => {
			console.log(error);
			setInline({message:error.message,message_type:'error'});
		});
	};

	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<i className="fa fa-user"> </i> Personal Details
						</h3>
					</div>
					<div className="form-group">
						<select
							className="form-control"
							name="title"
							value={personal_details.title}
							onChange={e => onChangeHandler(e)}
						>
							<option value={'mr'}>MR</option>
							<option value={'mrs'}>Mrs</option>
							<option value={'miss'}>Miss</option>
						</select>
						{errors.title_error ? (
							<InlineError message={errors.title_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="names"
							placeholder="Names..."
							value={personal_details.names}
							onChange={e => onChangeHandler(e)}
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
							placeholder="Surname..."
							value={personal_details.surname}
							onChange={e => onChangeHandler(e)}
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
							name="id"
							placeholder="ID / Passport Number"
							value={personal_details.id}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.id_error ? <InlineError message={errors.id_error} /> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="dob"
							placeholder="Date of Birth..."
							value={personal_details.dob}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.dob_error ? (
							<InlineError message={errors.dob_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="nationality"
							placeholder="Nationality..."
							value={personal_details.nationality}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.nationality_error ? (
							<InlineError message={errors.nationality_error} />
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<button
							type="button"
							className="btn btn-success btn-lg"
							name="save"
							onClick={e => {
								onCheckErrors(e)
									.then(result => {
										if (result) {
											throw new Error('there was an error processing form');
										} else {
											onSavePersonalDetails(e);
										}
									})
									.catch(error => {
										// eslint-disable-next-line no-console
										console.log(error);
										setInline({
											message: error.message,
											message_type: 'error'
										});
									});
							}}
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
								setPersonalDetails(personal_details_init);
								setErrors(personal_details_errors_init);
								setInline({ message: '', message_type: 'INFO' });
							}}
						>
							<strong>
								<i className="fa fa-eraser"> </i> Reset
							</strong>
						</button>
					</div>
					<div className="form-group">
						{inline.message ?
							<InlineMessage
								message={inline.message}
								message_type={inline.message_type}
							/>:''			
						}
					</div>
				</div>
			</form>
		</Fragment>
	);
};

const PhysicalAddress = () => {
	const[physical_address,setPhysicalAddress] = useState(physical_address_init);
	const[errors,setErrors] = useState(physical_address_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	const onChangeHandler = e => {
		setPhysicalAddress({
			...physical_address,
			[e.target.name]:e.target.value
		});
	};
	const {
		client_id,
		stand,
		street_name,
		city,
		province,
		country,
		postal_code
	} = physical_address;

	const onCheckErrors = async e => {
		let isError = false;
		console.log(e);
		const check_stand = () => {		
			if(Utils.isEmpty(stand)){
				setErrors({
					...errors,
					stand_error:'stand field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_street = () => {
			if(Utils.isEmpty(street_name)){
				setErrors({
					...errors,
					street_name_error : 'street name field cannot be empty'
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
					province_error:'please select a province'
				});
				return true;
			}
			return false;
		};
		const check_postal_code = () => {
			if(Utils.isEmpty(postal_code)){
				setErrors({
					...errors,
					postal_code_error:'postal code field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if(await check_stand()){
			isError = true;
		}
		if(await check_street()){
			isError = true;
		}
		if(await check_city()){
			isError = true;
		}
		if(await check_province()){
			isError = true;
		}
		if(await check_postal_code()){
			isError = true;
		}

		return isError;

	};

	const onSavePhysicalAddress = async e => {
		axios.post(routes.loan_physical_address_api_url,JSON.stringify(physical_address)).then(result => {
			if(result.status === 200){
				return result.data;
			}else{
				throw new Error('There was an error saving physical address');
			}
		}).then(physical_address => {
			setPhysicalAddress({physical_address});
			setInline({message:'Successfully saved client physical address'});
		}).catch(error => {
			console.log(error);
			setInline({message:error.message,message_type:'error'});
		});		
	};

	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								<i className="fa fa-building"> </i> Physical Address
							</strong>
						</h3>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="stand"
							placeholder="House/Stand Number"
							value={stand}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.stand_error ? <InlineError message={errors.stand_error} /> :'' }
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="street_name"
							placeholder="Street Name"
							value={street_name}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.street_name_error ? <InlineError message={errors.street_name_error}/> :''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="city"
							placeholder="City/Town"
							value={city}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.city_error ? <InlineError message={errors.city_error}/> :''}
					</div>
					<div className="form-group">
						<select
							className="form-control"
							name="province"
							value={province}
							onChange={e => onChangeHandler(e)}
						>
							<option value="limpopo">Limpopo</option>
							<option value="gauteng">Gauteng</option>
							<option value="northwest">North West</option>
							<option value="mpumalanga">Mpumalanga</option>
							<option value="kzn">KZN</option>
							<option value="easterncape">Eastern Cape</option>
							<option value="westerncape">Western Cape</option>
							<option value="northerncape">Northern Cape</option>
							<option value="freestate">Free State</option>
						</select>
						{errors.province_error ? <InlineError message={errors.province_error}/> :''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country"
							value={country}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.country_error ? <InlineError message={errors.country_error}/> :''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="postal_code"
							placeholder="Postal Code"
							value={postal_code}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.postal_code_error ? <InlineError message={errors.postal_code_error}/> :''}
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='save'
							onClick={e => {
								onCheckErrors().then(result => {
									if(result){
										throw new Error('there was an error processing form');
									}else{
										onSavePhysicalAddress(e);
									}
								}).catch(error => {
									console.log(error);
									setInline({message:error.message,message_type:'error'});
								});
							}}
						>
							<strong>
								<i className='fa fa-save'> </i> {' '}
								Save
							</strong>

						</button>

						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={() => {
								setInline({message:'',message_type:'INFO'});
								setErrors(physical_address_errors_init);
								setPhysicalAddress(physical_address_init);
							}}
						>
							<strong>
								<i className='fa fa-eraser'> </i>
								{' '} Reset
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
};

const PostalAddress = () => {
	const[postal_address,setPostalAddress] = useState(postal_address_init);
	const{
		client_id,
		box,
		city,
		province,
		country,
		postal_code
	} = postal_address;
	const[errors,setErrors] = useState(postal_address_error_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	const handleChange = e => {
		setPostalAddress({
			...postal_address,
			[e.target.name]:e.target.value
		});
	};

	const onCheckErrors = async e => {
		let isError = false;

		const check_box = () => {
			if(Utils.isEmpty(box)){
				setErrors({
					...errors,
					box_error : 'Box number field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_city = () => {
			if(Utils.isEmpty(city)){
				setErrors({
					...errors,
					city_error: 'City field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_province = () => {
			if(Utils.isProvince(province) === false){
				setErrors({
					...errors,
					province_error: 'please select a province'
				});
				return true;
			}
			return false;
		};

		const check_country = () => {
			if(Utils.isEmpty(country)){
				setErrors({
					...errors,
					country_error: 'Country field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_postal_code = () => {
			if(Utils.isEmpty(postal_code)){
				setErrors({
					...errors,
					postal_code_error:'Postal code cannot be empty'
				});
				return true;
			}
			return false;
		};
		
		if(await check_box()) { isError = true;}
		if(await check_city()) { isError = true;}
		if(await check_province()) { isError = true;}
		if(await check_country()) { isError = true;}
		if(await check_postal_code()) { isError = true;}

		return isError;
	};

	const onSavePostalAddress = e => {

	};

	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								<i className="fa fa-envelope"> </i> Postal Address
							</strong>
						</h3>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="box"
							placeholder="Box"
							onChange={e => handleChange(e)}
							value={box}
						/>
						{errors.box_error ? <InlineError message={errors.box_error}/> :''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="city"
							placeholder="City/Town"
							onChange={e => handleChange(e)}
							value={city}
						/>
						{errors.city_error ? <InlineError message={errors.city_error}/>:''}
					</div>
					<div className="form-group">
						<select
							className="form-control"
							name="province"
							onChange={e => handleChange(e)}
							value={province}

						>
							<option value="limpopo">Limpopo</option>
							<option value="gauteng">Gauteng</option>
							<option value="northwest">North West</option>
							<option value="mpumalanga">Mpumalanga</option>
							<option value="kzn">KZN</option>
							<option value="easterncape">Eastern Cape</option>
							<option value="westerncape">Western Cape</option>
							<option value="northerncape">Northern Cape</option>
							<option value="freestate">Free State</option>
						</select>
						{errors.province_error ? <InlineError message={errors.province_error}/> : ''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country"
							onChange={e => handleChange(e)}
							value={country}
						/>
						{errors.country_error ? <InlineError message={errors.country_error}/> :''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="postal_code"
							placeholder="Postal Code"
							onChange={e => handleChange(e)}
							value={postal_code}
						/>
						{errors.postal_code_error ? <InlineError message={errors.postal_code_error}/> :''}
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							onClick={e => {
								onCheckErrors(e).then(result => {
									if(result){
										throw new Error('there where errors processing form');
									}else{
										onSavePostalAddress(e);
									}
								}).catch(error => {
									console.log(error);
									setInline({message:error.message,message_type:'error'});
								});
							}}
						>
							<strong>
								<i className='fa fa-save'> </i>
								{' '} Save
							</strong>
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							onClick={() => {
								setPostalAddress(postal_address_init);
								setErrors(postal_address_error_init);
								setInline({message:'',message_type:'INFO'});
							}}
						>
							<strong>
								<i className='fa fa-eraser'> </i> {' '}
								Reset
							</strong>
						</button>
					</div>
					<div className='form-group'>
						{inline.message ? 
							<InlineMessage 
								message={inline.message}
								message_type={inline.message_type}
							/>: ''
						}
					</div>
				</div>
			</form>
		</Fragment>
	);
};

const ContactDetails = () => {
	const[contact_details,setContactDetails] = useState(contact_details_init);
	const[errors,setErrors] = useState(contact_details_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});
	const{
		client_id,
		tel,
		cell,
		email,
	}=contact_details;
	const onChangeHandler = e => {
		setContactDetails({
			...contact_details,
			[e.target.name]:e.target.value
		});
	};

	const onCheckErrors = async e => {
		console.log(e);
		let isError = false;
		const check_tel = () => {
			if(Utils.isTel(tel) === false){
				setErrors({
					...errors,
					tel_error:'Telephone number is invalid'
				});
				return true;
			}
			return false;
		};

		const check_cell = () => {
			if(Utils.isCell(cell) === false){
				setErrors({
					...errors,
					cell_error:'Cell number is invalid'
				});
				return true;
			}
			return false;
		};

		const check_email = () => {
			if(Utils.validateEmail(email) === false){
				setErrors({
					...errors,
					email_error:'Email is invalid'
				});
				return true;
			}
			return false;
		};

		if(await check_tel()){
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

	const onSaveContactDetails = e => {
	

		try {
			axios
				.post(
					routes.loan_contact_details_api_url,
					JSON.stringify(contact_details)
				)
				.then(result => {
					if (result.status === 200) {
						return result.data;
					} else {
						throw new Error('There where errors saving contact details');
					}
				})
				.then(contact_details => {
					setContactDetails({
						contact_details
					});
					setInline({ message: 'Successfully saved contact details' });
				})
				.catch(error => {
					console.log(error.message);
					setInline({ message: error.message, message_type: 'error' });
				});
		} catch (error) {
			setInline({ message: error.response.data, message_type: 'error' });
		}
	
	};

	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								<i className="fa fa-mobile-phone"> </i> Contact Details
							</strong>
						</h3>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="tel"
							placeholder="Tel"
							value={tel}
							onChange={e => onChangeHandler(e)}
						/>
						{errors.tel_error ? (
							<InlineError message={errors.tel_error} />
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cell"
							placeholder="Cell"
							value={cell}
							onChange={e => onChangeHandler(e)}
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
							placeholder="Email"
							value={email}
							onChange={e => onChangeHandler(e)}
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
							onClick={e =>
								onCheckErrors(e)
									.then(result => {
										if (result) {
											throw new Error('there where errors processing form');
										} else {
											onSaveContactDetails(e);
										}
									})
									.catch(error => {
										console.log(error);
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
								setErrors(contact_details_errors_init);
								setContactDetails(contact_details_init);
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
				</div>
			</form>
		</Fragment>
	);
};


// eslint-disable-next-line no-unused-vars
const NextOfKin = () => {
	const[nextofkin,setNextOfKin] = useState(next_of_kin_init);
	const[errors,setErrors] = useState(next_of_kin_init_error);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	const {
		client_id,
		names,
		address,
		cell
	} = nextofkin;

	const onHandleChange = e => {
		setNextOfKin({
			...nextofkin,
			[e.target.name]:e.target.value
		});
	};

	const onCheckErrors = async () => {
		let isError = false;

		const check_names = () => {
			if(Utils.isEmpty(names)){
				setErrors({
					...errors,
					names_error:'Names field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_address = () => {
			if(Utils.isEmpty(address)){
				setErrors({
					...errors,
					address_error: 'Address field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_cell = () => {
			if(Utils.isCell(cell) === false){
				setErrors({
					...errors,
					cell_error:'Cell number field is invalid'
				});
				return true;
			}
			return false;
		};

		if(await check_names()){
			isError = true;
		}
		if(await check_address()){
			isError = true;
		}
		if(await check_cell()){
			isError = true;
		}

		return isError;
	};

	const onSaveNextofKin = async () => {

	};
	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								<i className="fa fa-user" />{' '}
                				Next of Kin
							</strong>
						</h3>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="names"
							placeholder="Names"
							value={names}
							onChange={e => onHandleChange(e)}
						/>
						{errors.names_error ? <InlineError message={errors.names_error}/> :''}
					</div>
					<div className="form-group">
						<textarea
							type="text"
							className="form-control"
							name="address"
							placeholder="address"
							value={address}
							onChange={e => onHandleChange(e)}
						/>
						{errors.address_error ? <InlineError message={errors.address_error}/>:''}
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cell"
							placeholder="cell"
							value={cell}
							onChange={e => onHandleChange(e)}
						/>
						{errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
					</div>

					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success btn-lg'
							name='save'
							onClick={e => onCheckErrors(e).then(isError => {
								if(isError){
									throw new Error('there was an error processing form');
								}else{
									onSaveNextofKin(e);
								}
							}).catch(error => {
								console.log(error.message);
								setInline({message:error.message,message_type:'error'});
							})}
						><strong>
								<i className='fa fa-save'> </i> {' '}
							Save
							</strong>
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={() => {
								setInline({message:'',message_type:'INFO'});
								setErrors(next_of_kin_init_error);
								setNextOfKin(next_of_kin_init);
							}}
						><strong>
								<i className='fa fa-eraser'> </i> {' '}
							Reset
							</strong>

						</button>
					</div>
					<div className='form-group'>
						{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type}/> : ''}
					</div>
				</div>
			</form>
		</Fragment>
	);
};

const ApplicantDetails = () => {
	const[display,setDisplay] = useState('personal-details');
	return (
		<Fragment>
			<div className="box box-footer">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							{' '}
							<i className="fa fa-user"> </i> Applicant Details
						</strong>
					</h3>

					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool"
							name="personal-details"
							onClick={e => setDisplay('personal-details')}
						>
							<i className="fa fa-user"> </i> Personal Details
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="physical-address"
							onClick={e => setDisplay('physical-address')}
						>
							<i className="fa fa-building"> </i> Physical Address
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="postal-address"
							onClick={e => setDisplay('postal-address')}
						>
							<i className="fa fa-envelope"> </i> Postal Address
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="contact-details"
							onClick={e => setDisplay('contact-details')}
						>
							<i className="fa fa-mobile-phone"> </i> Contact Details
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="nextofkin"
							onClick={e => setDisplay('nextofkin')}
						>
							<i className="fa fa-user"> </i> Next of Kin
						</button>
					</div>
				</div>
				{
					(display === 'personal-details') ? 
						<PersonalDetails /> 
						:''
				}
				{
					(display === 'physical-address') ? 
						<PhysicalAddress />
						:''
				}
				{
					(display === 'postal-address') ? 
						<PostalAddress />
						:''
				}
				{
					(display === 'contact-details') ?
						<ContactDetails />
						:''
				}
				{
					(display === 'nextofkin') ?
						<NextOfKin />
						:''
				}
			</div>
		</Fragment>
	);
};



export default ApplicantDetails;
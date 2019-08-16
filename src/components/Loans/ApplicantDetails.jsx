import React, { Fragment, useState } from 'react';
import {Utils} from '../../utilities';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';

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
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success'
							name='save'
							onClick={e => {
								onCheckErrors().then(result => {
									if(result){
										throw new Error('there was an error processing form');
									}else{

									}
								})
							}}
						>

						</button>
					</div>
							</div>
			</form>
	</Fragment>
	);
};

const PostalAddress = () => {
	return (
		<Fragment>
			<form className="form-horizontal">
				<div className='box box-footer'>
					<div className='box box-header'>
						<h3 className='box-title'>
							<strong>
								<i className='fa fa-envelope'> </i>{' '}
                        Postal Address
							</strong>
						</h3>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="box"
							placeholder="box"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="city"
							placeholder="City/Town"
						/>
					</div>
					<div className="form-group">
						<select className="form-control" name="province">
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
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="country"
							placeholder="Country"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="postal-code"
							placeholder="Postal Code"
						/>
					</div>
				</div>
			</form>
		</Fragment>
	);
};

const ContactDetails = () => {
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
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cel"
							placeholder="cel"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="email"
							placeholder="email"
						/>
					</div>
				</div>
			</form>
		</Fragment>
	);
};


const NextOfKin = () => {
	return (
		<Fragment>
			<form className="form-horizontal">
				<div className="box box-footer">
					<div className="box box-header">
						<h3 className="box-title">
							<strong>
								<i className="fa fa-user" />
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
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="address"
							placeholder="address"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="cell"
							placeholder="cell"
						/>
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
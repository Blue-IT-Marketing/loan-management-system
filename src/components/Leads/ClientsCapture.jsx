import React, { Fragment,useState } from 'react';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';
import {Utils} from '../../utilities';
import {leads_init,leads_init_error} from './leads-constants';
const ClientsCapture = () => {
	const [leads_details, setLeads] = useState(leads_init);
	const[errors,setErrors] = useState(leads_init_error);
	let onChangeHandler = e => {
		setLeads({
			...leads_details,
			[e.target.name]:e.target.value
		});
	};

	const[inline,setInline] = useState({message:'',message_type:'info'});
    
	let onCheckErrors = async e => {
		console.log(e.target);
		let isError = false;
		const {
			title,
			surname,
			names,
			id,
			dob,
			nationality,
			cell,
			email,
			notes
		} = leads_details;

		const check_title = () => {
			if (Utils.isEmpty(title)) {
				setErrors({
					...errors,
					title_error: 'Please select title'
				});
				return true;
			}
			return false;
		};

		const check_surname = () => {
			if (Utils.isEmpty(leads_details.surname)) {
				setErrors({
					...errors,
					surname_error: 'Surname field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_names = () => {
			if (Utils.isEmpty(names)) {
				setErrors({
					...errors,
					names_error: 'Names field cannot be empty'
				});
				return true;
			}
			return false;
		};
		const check_id = () => {
			if (Utils.isIDNumber(id) === false) {
				setErrors({
					...errors,
					id_error: 'ID Number is invalid'
				});
				return true;
			}
			return false;
		};
		const check_dob = () => {
			if (Utils.isEmpty(dob)) {
				setErrors({
					...errors,
					dob_error: ' Date of birth field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_nationality = () => {
			if (Utils.isEmpty(nationality)) {
				setErrors({
					...errors,
					nationality_error: 'Nationality field cannot be empty'
				});
				return true;
			}
			return false;
		};
        
		const check_cell = () => {
			if(Utils.isCell(cell) === false){
				setErrors({
					...errors,
					cell_error : 'Cell field is invalid'
				});
				return true;
			}
			return false;
		};
        
		const check_email = () => {
			if(Utils.validateEmail(email) === false){
				setErrors({
					...errors,
					email_error: 'Email field is invalid'
				});
				return true;
			}
			return false;
		};

		const check_notes = () => {
			if(Utils.isEmpty(notes)){
				setErrors({
					...errors,
					notes_error: 'Notes field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if (await check_title()) {
			isError = true;
		}
		if (await check_surname()) {
			isError = true;
		}
		if (await check_names()) {
			isError = true;
		}
		if (await check_id()) {
			isError = true;
		}
		if (await check_dob()) {
			isError = true;
		}
		if (await check_nationality()) {
			isError = true;
		}
		if(await check_cell()){
			isError =true;
		}
		if(await check_email()){
			isError = true;
		}
		if(await check_notes()){
			isError = true;
		}
		return isError;
	};

	let onSaveLead = async e => {

	};


	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-camera"> </i> Capture Lead
						</strong>
					</h3>
				</div>

				<form className="form-horizontal">
					<div className="box box-footer">
						<div className="box box-header">
							<h3 className="box-title">
								<i className="fa fa-user"> </i> Client Details
							</h3>
						</div>
						<div className="form-group">
							<select
								className="form-control"
								name="title"
								value={leads_details.title}
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
								value={leads_details.names}
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
								value={leads_details.surname}
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
								value={leads_details.id}
								onChange={e => onChangeHandler(e)}
							/>
							{errors.id_error ? (
								<InlineError message={errors.id_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="dob"
								placeholder="Date of Birth..."
								value={leads_details.dob}
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
								value={leads_details.nationality}
								onChange={e => onChangeHandler(e)}
							/>
							{errors.nationality_error ? (
								<InlineError message={errors.nationality_error} />
							) : (
								''
							)}
						</div>
						<div className='form-group'>
							<input
								type='tel'
								className='form-control'
								name='cell'
								placeholder='Cell'
								value={leads_details.cell}
								onChange={e => onChangeHandler(e)}
							/>
							{errors.cell_error ? <InlineError message={errors.cell_error} /> : ''}
						</div>
						<div className='form-group'>
							<input 
								type='email'
								className='form-control'
								name='email'
								placeholder='Email'
								value={leads_details.email}
								onChange={e => onChangeHandler(e)}
							/>
							{errors.email_error ? <InlineError message={errors.email_error}/>:''}
						</div>
						<div className='form-group'>
							<textarea 
                                
								className='form-control'
								name='notes'
								placeholder='Notes'
								value={leads_details.notes}
								onChange={e => onChangeHandler(e)}
							/>
							{errors.notes_error ? <InlineError message={errors.notes_error} /> : ''}

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
												onSaveLead(e);
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
									setLeads(leads_init);
									setErrors(leads_init_error);
									setInline({ message: '', message_type: 'INFO' });
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
			</div>
		</Fragment>
	);
};

export default ClientsCapture;

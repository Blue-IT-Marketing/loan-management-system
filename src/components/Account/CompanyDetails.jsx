/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Utils } from '../../utilities';

import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { routes } from '../../constants';
import {
	company_init,
	company_errors,
	inline_init
} from './company-constants';

import * as companyAPI from './company-api';




export default function CompanyDetails() {
	const [company, setCompany] = useState(company_init);
	const [errors, setErrors] = useState(company_errors);
	const [inline, setInline] = useState(inline_init);

	const {user_account_state} = useContext(UserAccountContext);

	async function onCheckErrors() {
		let isError = false;

		const check_uid = () => {
			if (Utils.isEmpty(company.uid)) {
				setErrors({
					...errors,
					uid_error: 'Company is not attached to a valid account'
				});
				return true;
			}
			return false;
		};

		const check_company = () => {
			if (Utils.isEmpty(company.company)) {
				setErrors({
					...errors,
					company_error: 'company name field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_reg = () => {
			if (Utils.isCompanyReg(company.reg) === false) {
				setErrors({
					...errors,
					reg_error: 'company registration number not valid'
				});
				return true;
			}
			return false;
		};

		const check_fsp = () => {
			if (Utils.isFSP(company.fsp) === false) {
				setErrors({
					...errors,
					fsp_error: 'fsp number not valid'
				});
				return true;
			}
			return false;
		};

		const check_ncr = () => {
			if (Utils.isNCR(company.ncr) === false) {
				setErrors({
					...errors,
					ncr_error: 'ncr number is not valid'
				});
				return true;
			}
			return false;
		};

		const check_physical = () => {
			if (Utils.isEmpty(company.physical)) {
				setErrors({
					...errors,
					physical_error: 'physical address cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_postal = () => {
			if (Utils.isEmpty(company.postal)) {
				setErrors({
					...errors,
					postal_error: 'postal address cannot be empty'
				});
				return true;
			}
			return false;
		};

		// if (await check_uid()) {
		// 	isError = true;
        // }
        
		if (await check_company()) {
			isError = true;
		}
		if (await check_reg()) {
			isError = true;
		}
		if (await check_ncr()) {
			isError = true;
		}
		if (await check_fsp()) {
			isError = true;
		}
		if (await check_physical()) {
			isError = true;
		}
		if (await check_postal()) {
			isError = true;
		}

		return isError;
	}

	function onChangeHandler(e) {
		setCompany({
			...company,
			[e.target.name]: e.target.value
		});
	}

	async function  onUpdateCompany(e) {
		e.preventDefault();

		const company_details = JSON.stringify(company);
		const uid = user_account_state.user_account.uid;

		await companyAPI.UpdateCompany(uid,company_details).then(response => {
			if(response.status){
				setCompany(response.payload);
			}else{
				setInline({message:response.error.message,message_type:'error'});
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		})
	};

	useEffect(() => {
		const uid = user_account_state.user_account.uid;
		companyAPI.fetchCompany(uid).then(response => {
			if (response.status){
				setCompany(response.payload);
			}else{
				setCompany(company_init);
			}
		}).catch(error => {
			setInline({message:error.message,message_type:'error'});
		});

		return () => {
			setCompany(company_init);			
		};

	}, []);
	
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
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="Company Name..."
							/>
							{errors.company_error ? (
								<InlineError message={errors.company_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="reg"
								value={company.reg}
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="Reg Number..."
							/>
							{errors.reg_error ? (
								<InlineError message={errors.reg_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="fsp"
								value={company.fsp}
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="FSP..."
							/>
							{errors.fsp_error ? (
								<InlineError message={errors.fsp_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								name="ncr"
								value={company.ncr}
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="NCR..."
							/>
							{errors.ncr_error ? (
								<InlineError message={errors.ncr_error} />
							) : (
								''
							)}
						</div>

						<div className="form-group">
							<textarea
								className="form-control"
								name="physical"
								value={company.physical}
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="Physical Address..."
							/>
							{errors.physical_error ? (
								<InlineError message={errors.physical_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								name="postal"
								value={company.postal}
								onChange={e => setCompany({...company,[e.target.name]:e.target.value})}
								placeholder="Postal Address..."
							/>
							{errors.postal_error ? (
								<InlineError message={errors.postal_error} />
							) : (
								''
							)}
						</div>
						<div className="form-group">
							<button
								type="button"
								className="btn btn-success btn-lg"
								name="update"
								onClick={e => {
									onCheckErrors(e)
										.then(isError => {
											if (isError) {
												throw new Error(
													'There was an error processing form'
												);
											} else {
												onUpdateCompany(e).then(result => {
													console.log(result);
												});
											}
										})
										.catch(error => {
											console.log(error);

											setInline({
												message: error.message,
												message_type: 'error'
											});
										});
								}}
							>
								<i className="fa fa-cloud-upload"> </i> Update
							</button>
							<button
								type={'button'}
								className="btn btn-warning btn-lg"
								name="reset"
								onClick={e => {
									setInline(inline_init);
									setErrors(company_errors);
									setCompany(company_init);
								}}
							>
								<i className="fa fa-eraser"> </i> Reset
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
			</div>
		</Fragment>
	);
}

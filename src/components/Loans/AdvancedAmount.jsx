/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Fragment,useState } from 'react';
import { Utils } from '../../utilities';
import InlineError from '../Forms/InlineError';
import InlineMessage from '../Forms/InlineMessage';
import Axios from 'axios';
import {routes} from '../../constants';


let advanced_amount_init = {
	credit_advanced_capital : '',
	initiation_fee : '',
	monthly_service_fee : '',
	monthly_interest_rate : '',
	freequency : '',
	number_installments : '',
	loan_terms : '',
	amount_advanced_to_client : '',
	monthly_installments : '',
	total_installments : '',

	installments_paid : false,
	out_standing : false,
	account_change : false


};


let advanced_amount_errors_init = {
	credit_advanced_capital_error : '',
	initiation_fee_error : '',
	monthly_service_fee_error : '',
	monthly_interest_rate_error : '',
	freequency_error : '',
	number_installments_error : '',
	loan_terms_error : '',
	amount_advanced_to_client_error : '',
	monthly_installments_error : '',
	total_installments_error : '',

	
};

export default function AdvancedAmount() {
	const[advanced,setAdvanced] = useState(advanced_amount_init);
	const[errors,setErrors] = useState(advanced_amount_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'info'});

	const onCheckErrors =async  e => {
		e.preventDefault();
		let isError = false;

		const check_credit_advanced_capital = () => {
			if(Utils.isEmpty(advanced.credit_advanced_capital)){
				setErrors({
					...errors,
					credit_advanced_capital_error : 'credit advanced capital error please calculate affordability'
				});
				return true;
			}
			return false;
		};

		const check_initian_fee = () => {
			if(Utils.isEmpty(advanced.initiation_fee)){
				setErrors({
					...errors,
					initiation_fee_error: 'please select initiation fee'
				});
				return true;
			}
			return false;
		};

		const check_monthly_service_fee = () => {
			if(Utils.isEmpty(advanced.monthly_service_fee)){
				setErrors({
					...errors,
					monthly_service_fee_error : 'please select monthly service fee'
				});
				return true;
			}
			return false;
		};

		const check_monthly_interest_rate = () => {
			if(Utils.isEmpty(advanced.monthly_interest_rate)){
				setErrors({
					...errors,
					monthly_interest_rate_error : 'please select monthly interest rate'
				});
				return true;
			}
			return false;
		};

		const check_freequency = () => {
			if(Utils.isEmpty(advanced.freequency)){
				setErrors({
					...errors,
					freequency_error: 'please select freequency'
				});
				return true;
			}
			return false;
		};

		const check_number_installments = () => {
			if(Utils.isEmpty(advanced.number_installments)){
				setErrors({
					...errors,
					number_installments_error: 'please select number of installments'
				});
				return true;
			}
			return false;
		};

		const check_loan_terms = () => {
			if(Utils.isEmpty(advanced.loan_terms)){
				setErrors({
					...errors,
					loan_terms_error:'please select loan terms'
				});
				return true;
			}
			return false;
		};

		const check_amount_advanced_to_client = () => {
			if(Utils.isEmpty(advanced.amount_advanced_to_client)){
				setErrors({
					...errors,
					amount_advanced_to_client_error : 'amount advanced to client field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_monthly_installments = () => {
			if(Utils.isEmpty(advanced.monthly_installments)){
				setErrors({
					...errors,
					monthly_installments_error:'monthly installments field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_total_installments = () => {
			if(Utils.isEmpty(advanced.total_installments)){
				setErrors({
					...errors,
					total_installments_error:'total installments field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if (await check_credit_advanced_capital()){
			isError = true;
		}
		if(await check_initian_fee()){
			isError = true;
		}
		if (await check_monthly_service_fee()){
			isError = true;
		}
		if(await check_monthly_interest_rate()){
			isError = true;
		}
		if(await check_freequency()){
			isError = true;
		}
		if(await check_number_installments()){
			isError = true;
		}
		if(await check_loan_terms()){
			isError = true;
		}
		if(await check_amount_advanced_to_client()){
			isError = true;
		}
		if(await check_monthly_installments()){
			isError = true;
		}
		if(await check_total_installments()){
			isError = true;
		}

		return isError;
	};


	const onCalculate = async e => {


		const calc_initiation_fee = ((parseInt(advanced.initiation_fee)/100) * parseInt(advanced.credit_advanced_capital) );
		const temp_total = parseInt(advanced.credit_advanced_capital) + parseInt(calc_initiation_fee) + parseInt(advanced.monthly_service_fee);
		const total  =  parseInt(temp_total) + parseInt((advanced.monthly_interest_rate/100) * temp_total );
		const calc_monthly_installments = Math.round(parseInt(total) / parseInt(advanced.number_installments));
		const calc_total_installments = calc_monthly_installments * parseInt(advanced.number_installments);

		setAdvanced({
			...advanced,
			amount_advanced_to_client : temp_total,
			monthly_installments : calc_monthly_installments,
			total_installments : calc_total_installments
		});
	};


	const onSaveAdvancedAmount = async e => {
		e.preventDefault();
		try{
			await Axios.post(routes.loan_advanced_amount_api_url,'&data=' + JSON.stringify(advanced)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('there was an error creating advanced amount');
				}
				
			}).then(advanced_amount => {
				setAdvanced(advanced_amount);
				setInline({message:'successfully created advanced amount',message_type:'info'});
				return false;
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
				return true;
			});

		}catch(error){
			setInline({ message: error.message, message_type: 'error' });
			return false;
		}
	};

    
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-money-bill"> </i> Advanced Amount
						</strong>
					</h3>
				</div>

				<form
					className="form-horizontal"
					action=""
					method="post"
					onSubmit={e =>
						onCheckErrors(e)
							.then(isError => {
								if (isError) {
									throw new Error(
										'there was an error processing advanced amount'
									);
								} else {
									onSaveAdvancedAmount(e).then(result => {
										console.log(result);
									});
								}
							})
							.catch(error => {
								setInline({ message: error.message, message_type: 'error' });
							})
					}
				>
					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
							{' '}
              Credit Advanced Capital
						</label>
						<div className="col-sm-9">
							<input
								type="text"
								className="form-control"
								name="credit_advanced_capital"
								value={advanced.credit_advanced_capital}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							/>
							{errors.credit_advanced_capital_error ? (
								<InlineError message={errors.credit_advanced_capital_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
							{' '}
              Initiation Fee
						</label>
						<div className="col-sm-9">
							<select
								className="form-control"
								name="initiation_fee"
								value={advanced.initiation_fee}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value={8}> 8% </option>
								<option value={9}> 9% </option>
								<option value={10}> 10% </option>
								<option value={11}> 11% </option>
								<option value={12}> 12% </option>
								<option value={13}> 13% </option>
								<option value={14}> 14% </option>
								<option value={15}> 15% </option>
							</select>

							{errors.initiation_fee_error ? (
								<InlineError message={errors.initiation_fee_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
              Monthly Service Fee
						</label>
						<div className="col-sm-9">
							<select
								name="monthly_service_fee"
								className="form-control"
								value={advanced.monthly_service_fee}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value={30}>R 30.00</option>
								<option value={40}>R 40.00</option>
								<option value={50}>R 50.00</option>
								<option value={60}>R 60.00</option>
								<option value={70}>R 70.00</option>
								<option value={80} selected={true}>R 80.00</option>
							</select>
							{errors.monthly_service_fee_error ? (
								<InlineError message={errors.monthly_service_fee_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left" title="">
              Monthly Interest
						</label>
						<div className="col-sm-9">
							<select
								name="monthly_interest_rate"
								className="form-control"
								value={advanced.monthly_interest_rate}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value={5}> 5% </option>
								<option value={6}> 6% </option>
								<option value={7}> 7% </option>
								<option value={8}> 8% </option>
								<option value={9}> 9% </option>
								<option value={10}> 10% </option>
								<option value={11}> 11% </option>
								<option value={12}> 12% </option>
								<option value={13}> 13% </option>
								<option value={14}> 14% </option>
								<option value={15}> 15% </option>
								<option value={16}> 16% </option>
								<option value={17}> 17% </option>
								<option value={18}> 18% </option>
								<option value={19}> 19% </option>
								<option value={20}> 20% </option>
							</select>
							{errors.monthly_interest_rate_error ? (
								<InlineError message={errors.monthly_interest_rate_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left" title="">
							{' '}
              Freequency
						</label>
						<div className="col-sm-9">
							<select
								name="freequency"
								className="form-control"
								value={advanced.freequency}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value="weekly"> Weekly </option>
								<option value="monthly" selected={true}> Monthly </option>
								<option value="yearly"> Yearly </option>
							</select>
							{errors.freequency_error ? (
								<InlineError message={errors.freequency_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
							{' '}
              Number Installments{' '}
						</label>
						<div className="col-sm-9">
							<select
								className="form-control"
								name="number_installments"
								value={advanced.number_installments}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value="1" selected={true}>1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5 </option>
								<option value="6">6 </option>
							</select>
							{errors.number_installments_error ? (
								<InlineError message={errors.number_installments_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
              Loan Term
						</label>
						<div className="col-sm-9">
							<select
								className="form-control"
								name="loan_terms"
								value={advanced.loan_terms}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value="long">Long Term</option>
								<option value="short" selected={true}>Short Term</option>
							</select>
							{errors.loan_terms_error ? (
								<InlineError message={errors.loan_terms_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
              Amount Advanced to Client
						</label>
						<div className="col-sm-9">
							<input
								type="text"
								className="form-control"
								value={advanced.amount_advanced_to_client}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							/>
							{errors.amount_advanced_to_client_error ? (
								<InlineError message={errors.amount_advanced_to_client_error} />
							) : (
								''
							)}
						</div>
					</div>

					<div className="form-group">
						<label
							className="col-sm-3 control-label pull-left"
							title="Calculated Value"
						>
              Monthly Installments
						</label>
						<div className="col-sm-9">
							<input
								type="text"
								className="form-control"
								name="monthly_installments"
								value={advanced.monthly_installments}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							/>
							{errors.monthly_installments_error ? (
								<InlineError message={errors.monthly_installments_error} />
							) : (
								''
							)}
						</div>
					</div>
					<div className="form-group">
						<label
							className="col-sm-3 control-label pull-left"
							title="Calculated Value"
						>
              Total Installments
						</label>
						<div className="col-sm-9">
							<input
								type="text"
								className="form-control"
								name="total_installments"
								value={advanced.total_installments}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							/>
							{errors.total_installments_error ? (
								<InlineError message={errors.total_installments_error} />
							) : (
								''
							)}
						</div>
					</div>
					<div className='form-group'>
						<div className='col-sm-9'>
							<button
								type="button"
								className="btn btn-bitbucket btn-lg  margin-right"
								onClick={e => onCalculate(e)}
							>
								<i className="fa  fa-calculator"> </i> Calculate{' '}
							</button>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-9">
							<button
								type="button"
								className="btn btn-success btn-lg margin-left"
								onClick={e =>
									onCheckErrors(e)
										.then(isError => {
											if (isError) {
												throw new Error(
													'there was an error processing advanced amount'
												);
											} else {
												onSaveAdvancedAmount(e).then(result => {
													console.log(result);
												});
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
								<i className="fa fa-save"></i> Save Advanced Amount
							</button>

							<button
								type="button"
								className="btn btn-warning btn-lg margin-left"
								onClick={e => {
									setAdvanced(advanced_amount_init);
									setErrors(advanced_amount_errors_init);
									setInline({message:'',message_type:'info'});
								}}
							>
								<i className="fa fa-save"></i> Reset
							</button>
						</div>
					</div>

					<div className='form-group'>
						<div className='col-sm-9'>
							{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type} /> : ''}
						</div>
					</div>
				</form>
			</div>
		</Fragment>
	);
}

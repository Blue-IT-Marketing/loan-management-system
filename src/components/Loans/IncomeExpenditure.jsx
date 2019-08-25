import React, { Fragment,useState } from 'react';
import {Utils} from '../../utilities';
import axios from 'axios';
import {routes} from '../../constants';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';


let affordability_init = {
	income_after_deduction: 0,
	overtime: 0,
	commission: 0,
	other_income: 0,
	total_income: 0,
	bond_repayments: 0,
	loan_installments: 0,
	electricity_telephone: 0,
	insurance: 0,
	maintenance: 0,
	transport: 0,
	basic_necessities: 0,
	domestic_wages: 0,
	education: 0,
	other_expenses: 0,
	total_expenses: 0,
	affordable: 0
};

const IncomeExpenditure = () => {
	const[display,setDisplay] = useState('income');
	const [affordability,setAffordability] = useState(affordability_init);
	const[errors,setErrors] = useState({
		total_income_error : '',
		total_expenditure_error : '',
		affordability_error : ''
	});
	const[inline,setInline] = useState({message:'',message_type:'info'});

	let {
		income_after_deduction,
		overtime,
		commission,
		other_income,
		total_income,
		bond_repayments,
		loan_installments,
		electricity_telephone,
		insurance,
		maintenance,
		transport,
		basic_necessities,
		domestic_wages,
		education,
		other_expenses,
		total_expenses,
		affordable
	} = affordability;

	const onHandleChange = e => {
		setAffordability({
			...affordability,
			[e.target.name]:parseInt(e.target.value)
		});
	};
	const getTotalIncome = () =>
		parseInt(income_after_deduction) + parseInt(overtime) + parseInt(commission) + parseInt(other_income);
	const getTotalCost = () =>
		(parseInt(bond_repayments) +
    parseInt(loan_installments) +
    parseInt(electricity_telephone) +
    parseInt(insurance) +
    parseInt(maintenance) +
    parseInt(transport) +
    parseInt(basic_necessities) +
    parseInt(domestic_wages) +
    parseInt(education) +
    parseInt(other_expenses)) ;

	const calculateAffordability = e => {
		setAffordability({
			...affordability,
			total_expenses: getTotalCost(),
			total_income: getTotalIncome(),
			affordable: getTotalIncome() - getTotalCost()
		});
        
	};


	const onCheckErrors = async e => {
		e.preventDefault();
		let isError = false;
		const check_total_income = () => {
			if(!Utils.isNumber(total_income)){
				setErrors({
					...errors,total_income_error:'please calculate total income'
				});
				return true;
			}
			return false;

		};

		const check_total_expenditure = () => {
			if(!Utils.isNumber(total_expenses)){
				setErrors({
					...errors,total_expenditure_error:'please calculate total expenses'
				});
				return true;
			}
			return false;
		};

		const check_affordability = () => {
			if(!Utils.isNumber(affordable) || (affordable <= 0)){
				setErrors({...errors,affordability_error:'please calculate affordability'});
				return true;
			}
			return false;
		};

		if(await check_total_income()){
			isError = true;
		}

		if(await check_total_expenditure()){
			isError = true;
		}

		if(await check_affordability()){
			isError = true;
		}

		return isError;
	};


	const SaveAffordability = async e => {
		try{
			await axios.post(routes.loan_affordability_api_url,'&data='+JSON.stringify(affordability)).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('there was an error saving affordability file');
				}
			}).then(affordability => {
				setAffordability({affordability});
				setInline({message:'successfully saved affordability',message_type:'error'});
				return true;
			}).catch(error => {
				setInline({message:error.message,message_type:'error'});
				return false;
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
							<i className="fa fa-money"> </i> Income &amp; Expenditure
						</strong>
					</h3>
					<div className="box-tools">
						<button
							className="btn btn-box-tool btn-outline-dark"
							name="income"
							onClick={e => setDisplay(e.target.name)}
						>
							<i className="fa fa-dollar"> </i> Income
						</button>
						<button
							className="btn btn-box-tool btn-outline-dark"
							name="expenditure"
							onClick={e => setDisplay(e.target.name)}
						>
							<i className="fa fa-dollar"> </i> Expenditure
						</button>
						<button
							className="btn btn-box-tool btn-outline-dark"
							name="affordability"
							onClick={e => setDisplay(e.target.name)}
						>
							<i className="fa fa-money"> </i> Affordability
						</button>
					</div>
				</div>

				{display === 'income' ? (
					<div className="box box-footer">
						<div className="box box-header">
							<h3 className="box-title">
								<i className="fa fa-dollar"> </i> Income
							</h3>
						</div>
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
									{' '}
                  					Income after deductions
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="income_after_deduction"
										placeholder="Income After Deduction..."
										value={affordability.income_after_deduction}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>

							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
									{' '}
                  					Overtime
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="overtime"
										placeholder="Overtime..."
										value={affordability.overtime}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
									{' '}
                  					Commissions
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="commission"
										placeholder="Commission..."
										value={affordability.commission}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>

							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  					Other Income
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="other_income"
										placeholder="Other Income..."
										value={affordability.other_income}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
									{' '}
                  					Total Income
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="total_income"
										placeholder="Total Income..."
										value={affordability.total_income}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-9">
									<button
										type="button"
										className="btn btn-success btn-lg"
										name="total"
										onClick={e => {
											setAffordability({
												...affordability,
												total_income: getTotalIncome()
											});
										}}
									>
										<strong>
											<i className="fa fa-calculator"> </i> Calculate Total
                      						Income
										</strong>
									</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					''
				)}

				{display === 'expenditure' ? (
					<div className="box box-footer">
						<div className="box box-header">
							<h3 className="box-title">
								<i className="fa fa-dollar"> </i>
                				Costs{' '}
							</h3>
						</div>
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Bond Repayments
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="bond_repayments"
										placeholder="Bond Repayments..."
										value={affordability.bond_repayments}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
									{' '}
									Loan Installments
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="loan_installments"
										placeholder="Loan Installments..."
										value={affordability.loan_installments}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                 				Electricity
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="electricity_telephone"
										placeholder="Electricity & Telephone..."
										value={affordability.electricity_telephone}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Insurance
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="insurance"
										placeholder="Insurance..."
										value={affordability.insurance}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Maintenance
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="maintenance"
										placeholder="Maintenance..."
										value={affordability.maintenance}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Transport
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="transport"
										placeholder="Transport..."
										value={affordability.transport}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Basic Neccessities
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="basic_necessities"
										placeholder="Basic Neccessities..."
										value={affordability.basic_necessities}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Domestic Wages
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="domestic_wages"
										placeholder="Domestic Wages..."
										value={affordability.domestic_wages}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Education
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="education"
										placeholder="Education..."
										value={affordability.education}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Other Expenses
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="other_expenses"
										placeholder="Other Expenses..."
										value={affordability.other_expenses}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Total Expenses
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="total_expenses"
										placeholder={'Total Expenses...'}
										value={affordability.total_expenses}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-9">
									<button
										type="button"
										className="btn btn-success btn-lg"
										name="totalExpenditure"
										onClick={e => {
											setAffordability({
												...affordability,
												total_expenses: getTotalCost()
											});
										}}
									>
										<i className="fa fa-calculator"> </i>
										Total Expenditure
									</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					''
				)}

				{display === 'affordability' ? (
					<div className="box box-footer">
						<div className="box box-header">
							<h3 className="box-title">
								<i className="fa fa-money"> </i> Affordability{' '}
							</h3>
						</div>
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-3 control-label pull-left">
                  				Affordability
								</label>
								<div className="col-sm-9">
									<input
										type="text"
										className="form-control"
										name="affordable"
										placeholder="Affordability..."
										value={affordability.affordable}
										onChange={e => onHandleChange(e)}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-9">
									<button
										type="button"
										className="btn btn-warning btn-lg"
										name="calculate_affordability"
										onClick={e => calculateAffordability(e)}
									>
										<strong>
											<i className="fa fa-calculator"> </i> Calculate
                      						Affordability
										</strong>
									</button>
									<button
										type="button"
										className="btn btn-primary btn-lg"
										name="save-affordability"
										onClick={e =>
											onCheckErrors(e)
												.then(isError => {
													if (isError) {
														throw new Error(
															'Error saving affordability please calculate all the required values'
														);
													} else {
														SaveAffordability(e).then(result => {});
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
											<i className="fa fa-save"> </i> Save Affordability
										</strong>
									</button>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-9">
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
				) : (
					''
				)}
			</div>
		</Fragment>
	);
};

export default IncomeExpenditure;

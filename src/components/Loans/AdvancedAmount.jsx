import React, { Fragment,useState } from 'react';

// strCreditAdvancedCapital = ndb.IntegerProperty()
// strInitiationFee = ndb.IntegerProperty()
// strMonthlyServiceFee = ndb.IntegerProperty()
// strMonthlyInterest = ndb.IntegerProperty()
// strFreequency = ndb.StringProperty()
// strNumberInstallments = ndb.IntegerProperty()
// strLoanTerm = ndb.StringProperty()
// strAmountAdvancedToClient = ndb.IntegerProperty()
// strMonthlyInstallments = ndb.IntegerProperty()
// strTotalInstallments = ndb.IntegerProperty()
// strDateTaken = ndb.DateTimeProperty(auto_now_add=True)
// strAdvanceReference = ndb.IntegerProperty()
// strLoanPaidStatus = ndb.BooleanProperty(default=False) # If True it means the loan amount has been paid to client

// strPaymentDate = ndb.IntegerProperty(default=30)

// strTotalAmountRePaid = ndb.IntegerProperty()
// strAdvancedIndex = ndb.IntegerProperty()

// strInstallmentsPaid = ndb.BooleanProperty(default=False)
// strOutStanding = ndb.BooleanProperty(default=False)
// strAccountChange = ndb.BooleanProperty(default=False)



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
	date_taken : '',
	advance_reference : '',
	loan_paid_status : false,
	payment_date : '',
	total_amount_repaid : '',
	advanced_index : '',

	installments_paid : false,
	out_standing : false,
	account_change : false


};


let advanced_amount_errors_init = {

};

export default function AdvancedAmount() {
	const[advanced,setAdvanced] = useState(advanced_amount_init);
	const[errors,setErrors] = useState(advanced_amount_errors_init);
	const[inline,setInline] = useState({message:'',message_type:'info'});

	const onCheckErrors = e => {

	};

	const onSaveAdvancedAmount = e => {

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
								<option value={80}>R 80.00</option>
							</select>
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
								<option value="monthly"> Monthly </option>
								<option value="yearly"> Yearly </option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">
							{' '}
              Number Installments{' '}
						</label>
						<div className="col-sm-9">
							<select
								className='form-control'
								name="number_installments"
								value={advanced.number_installments}
								onChange={e =>
									setAdvanced({ ...advanced, [e.target.name]: e.target.value })
								}
							>
								<option value="1" selected="selected">1</option>
								<option value="2" selected="selected">2</option>
								<option value="3" selected="selected">3</option>
								<option value="4" selected="selected">4</option>
								<option value="5" selected="selected">5</option>
								<option value="6" selected="selected">6</option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left">Loan Term</label>
						<div className="col-sm-9">
							<select
								className='form-control'
								name="loan_terms"
								value={advanced.loan_terms}
								onChange={e =>setAdvanced({ ...advanced, [e.target.name]: e.target.value })}
							>
								<option value="long">Long Term</option>
								<option value="short">Short Term</option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<label className="col-sm-3 control-label pull-left" >Amount Advanced to Client</label>
						<div className="col-sm-9">
							<input 
								type='text' 
								className='form-control' 
								value={advanced.amount_advanced_to_client}
								onChange={e => setAdvanced({...advanced,[e.target.name]:e.target.value})}
							/>
						</div>
					</div>


					<div className="form-group">
						<label className="col-sm-3 control-label pull-left" title='Calculated Value'>Monthly Installments</label>
						<div className="col-sm-9">
							<input 
								type="text" 
								className="form-control" 
								name="monthly_installments" 
								value={advanced.monthly_installments}
								onChange={e => setAdvanced({...advanced,[e.target.name]:e.target.value})}
							/>
						</div>
					</div>
					<div className="form-group">
						<label  className="col-sm-3 control-label pull-left" title="Calculated Value">Total Installments</label>
						<div className="col-sm-9">
							<input 
								type="text" 
								className="form-control"  
								name="total_installments" 
								value={advanced.total_installments}
								onChange={e => setAdvanced({...advanced,[e.target.name]:e.target.value})}
							/>
						</div>
					</div>
            
					<div className="form-group">
						<div className="col-sm-9">
							<button type="button" className="btn btn-bitbucket btn-lg  margin-right" id="LoanCalculateButt"><i className="fa  fa-calculator"> </i> Calculate </button>
							<button type="button" className="btn btn-success btn-lg margin-left" id="SaveAdvancedAmountButt"><i className="fa fa-save"></i> Save</button>
						</div>
					</div>
                    
				</form>
			</div>
		</Fragment>
	);
}

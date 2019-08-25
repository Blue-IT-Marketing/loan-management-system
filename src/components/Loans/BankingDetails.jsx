/* eslint-disable no-console */
import React,{Fragment,useState} from 'react';
import InlineMessage from '../Forms/InlineMessage';
import InlineError from '../Forms/InlineError';
import { Utils } from '../../utilities';


let banking_details_init = {
	bank_name : '',
	account_holder : '',
	account_number : '',
	account_type : '',
	branch_code : '',
	branch_name : '',
	commencement_date : '',
	notes : '',

};

let banking_details_error_init = {
	bank_name_error: '',
	account_holder_error: '',
	account_number_error: '',
	account_type_error: '',
	branch_code_error: '',
	branch_name_error: '',
	commencement_date_error : '',
	notes_error: ''
};

export default function BankingDetails() {
	const[banking,setBanking] = useState(banking_details_init);
	const[errors,setErrors] = useState(banking_details_error_init);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	
	
	const onCheckErrors = async e => {

		let isError = false;

		const check_bank_name = () => {
			if(Utils.isEmpty(banking.bank_name)){
				setErrors({
					...errors,
					bank_name_error : 'please select bank name'
				});
				return true;
			}
			return false;
		};

		const check_account_holder = () => {
			if(Utils.isEmpty(banking.account_holder)){
				setErrors({
					...errors,
					account_holder_error : 'account holder field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_account_number = () => {
			if(Utils.isEmpty(banking.account_number)){
				setErrors({
					...errors,
					account_number_error : 'account number field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_account_type = () => {
			if(Utils.isEmpty(banking.account_type)){
				setErrors({
					...errors,
					account_type_error:'please select account type'
				});
				return true;
			}
			return false;
		};

		const check_branch_name = () => {
			if(Utils.isEmpty(banking.branch_name)){
				setErrors({
					...errors,
					branch_name_error:'branch name field cannot be empty'
				});
				return true;
			}
			return false;
		};

		const check_commencement_date = () => {
			if(Utils.isEmpty(banking.commencement_date)){
				setErrors({
					...errors,
					commencement_date_error:'commencement date field cannot be empty'
				});
				return true;
			}
			return false;
		};

		if(await check_bank_name()){
			isError = true;
		}
		if(await check_account_holder()){
			isError = true;
		}
		if(await check_account_number()){
			isError = true;
		}
		if(await check_account_type()){
			isError = true;
		}
		if(await check_branch_name()){
			isError = true;
		}
		if(await check_commencement_date()){
			isError = true;
		}

		return isError;
	};

	const onSaveBankingDetails = async e => {

	};

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-bank"> </i>
              Banking Details
						</strong>
					</h3>
				</div>

				<div className="box box-footer">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-2 control-label pull-left" title="">
                Account Holder
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="account_holder"
									placeholder="Account Holder"
									value={banking.account_holder}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								/>
								{errors.account_holder_error ? <InlineError message={errors.account_holder_error} /> : ''}
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-2 control-label pull-left" title="">
                Account Number
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="account_number"
									placeholder="Bank Account Number"
									value={banking.account_number}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								/>
								{errors.account_number_error ? <InlineError message={errors.account_number_error} /> : ''}
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-2 control-label pull-left" title="">
                Banking Institution
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="bank_name"
									placeholder="Banking Institution"
									value={banking.bank_name}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								/>
								{errors.bank_name_error ? <InlineError message={errors.bank_name_error} /> : ''}
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-2 control-label pull-left" title="">
                Branch Code
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="branch_code"
									placeholder="Branch Code"
									value={banking.branch_code}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								/>
								{errors.branch_code_error ? <InlineError message={errors.branch_code_error} /> : ''}
							</div>
						</div>

						<div className="form-group">
							<label className="col-sm-2 control-label pull-left" title="">
                Account Type
							</label>
							<div className="col-sm-9">
								<select
									id="strAccountType"
									className="form-control"
									value={banking.account_type}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								>
									<option value="Cheque">Cheque</option>
									<option value="Savings">Savings</option>
									<option value="Transmission">Transmission</option>
								</select>
								{errors.account_type_error ? <InlineError message={errors.account_type_error} /> : ''}
							</div>
						</div>

						<div className="form-group">
							<label
								className="col-sm-2 control-label pull-left"
								title="Commencement Date"
							>
                Date
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="commencement_date"
									placeholder="Commencement Date"
									value={banking.commencement_date}
									onChange={e =>
										setBanking({ ...banking, [e.target.name]: e.target.value })
									}
								/>
								{errors.commencement_date_error ? <InlineError message={errors.commencement_date_error} /> : '' }
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-9">
								<button 
									type="button" 
									className="btn btn-success btn-lg"
									onClick={e => 
										onCheckErrors(e).then(isError => {
											if(isError){
												throw new Error('there was an error processing banking form');
											}else{
												onSaveBankingDetails(e).then(result => {
													console.log(result);
												});
											}
										}).catch(error => {
											setInline({message:error.message,message_type:'error'});
										})
									}
								>
									<i className="fa fa-save"> </i> Save Banking Details{' '}
								</button>
								<button
									type='button'
									className='btn btn-warning btn-lg'
									name='reset'
									onClick={e => {
										setBanking(banking_details_init);
										setErrors(banking_details_error_init);
										setInline({message:'',message_type:'info'});
									}}
								><i className='fa fa-eraser'> </i> Reset
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
			</div>
		</Fragment>
	);
}

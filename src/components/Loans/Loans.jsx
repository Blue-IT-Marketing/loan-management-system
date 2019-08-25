import React,{Fragment,useState} from 'react';
import ApplicantDetails from './ApplicantDetails';
import EmploymentDetails from './EmploymetDetails';
import IncomeExpenditure from './IncomeExpenditure';
import CreditProvider from './CreditProvider';
import AdvancedAmount from './AdvancedAmount';
import BankingDetails from './BankingDetails';


const Loans = () => {
	const[display,setDisplay] = useState('applicant-details');

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							{' '}
							<i className="fa fa-dollar"> </i> Create Loans{' '}
						</strong>
					</h3>

					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool"
							name="applicant"
							onClick={e => setDisplay('applicant-details')}
						>
							<strong>
								{' '}
								<i className="fa fa-user"> </i> Applicant Details{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="employment-details"
							onClick={e => setDisplay('employment-details')}
						>
							<strong>
								{' '}
								<i className="fa fa-amazon"> </i> Employment Details{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="income-expenditure"
							onClick={e => setDisplay('income-expenditure')}
						>
							<strong>
								{' '}
								<i className="fa fa-money"> </i> Income &amp; Expenditure{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="credit-provider"
							onClick={e => setDisplay('credit-provider')}
						>
							<strong>
								{' '}
								<i className="fa fa-user"> </i> Credit Provider{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="advance"
							onClick={e => setDisplay('advance')}
						>
							<strong>
								{' '}
								<i className="fa fa-credit-card"> </i> Advance Amount{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="banking-details"
							onClick={e => setDisplay('banking-details')}
						>
							<strong>
								{' '}
								<i className="fa fa-building"> </i> Banking Details{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="admin"
							onClick={e => setDisplay('admin')}
						>
							<strong>
								{' '}
								<i className="fa fa-dashboard"> </i> Admin{' '}
							</strong>
						</button>
					</div>
				</div>

				{display === 'applicant-details' ? <ApplicantDetails /> : ''}
				{display === 'employment-details' ? <EmploymentDetails /> : ''}
				{display === 'income-expenditure' ? <IncomeExpenditure /> : ''}
				{display === 'credit-provider' ? <CreditProvider /> : ''}
				{display === 'advance' ? <AdvancedAmount /> : ''}
				{display === 'banking-details' ? <BankingDetails /> : ''}
			</div>
		</Fragment>
	);
};


export default Loans;

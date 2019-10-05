/* eslint-disable no-unused-vars */
import React,{Fragment,useState} from 'react';
import ApplicantDetails from './ApplicantDetails';
import EmploymentDetails from './EmploymetDetails';
import IncomeExpenditure from './IncomeExpenditure';
import CreditProvider from './CreditProvider';
import AdvancedAmount from './AdvancedAmount';
import BankingDetails from './BankingDetails';
import Admin from './Admin';


const Loans = () => {

	const[display,setDisplay] = useState('applicant-details');

	const [loansMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener("click", hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener("click", hideDropdownMenu);
	};


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
										name="applicant"
										onClick={() => setDisplay('applicant-details')}
									>
										<strong>
											{' '}
											<i className="fa fa-user"> </i> Applicant Details{' '}
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="income-expenditure"
										onClick={() => setDisplay('income-expenditure')}
									><strong> {' '} <i className="fa fa-money"> </i> Income &amp; Expenditure{' '}
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="employment-details"
										onClick={() => setDisplay('employment-details')}
									>
										<strong>
											{' '}
											<i className="fa fa-amazon"> </i> Employment Details{' '}
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="advance"
										onClick={() => setDisplay('advance')}
									>
										<strong>
											{' '}
											<i className="fa fa-credit-card"> </i> Advance Amount{' '}
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="banking-details"
										onClick={() => setDisplay('banking-details')}
									>
										<strong>
											{' '}
											<i className="fa fa-building"> </i> Banking Details{' '}
										</strong>
									</li>
									<li className="btn btn-block droplink"
										name="admin"
										onClick={() => setDisplay('admin')}
									>
										<strong>
											{' '}
											<i className="fa fa-dashboard"> </i> Admin{' '}
										</strong>
									</li>

								</ul>
							): null}
						</div>

					</div>
				</div>

				{display === 'applicant-details' ? <ApplicantDetails /> : ''}
				{display === 'employment-details' ? <EmploymentDetails /> : ''}
				{display === 'income-expenditure' ? <IncomeExpenditure /> : ''}
				{display === 'credit-provider' ? <CreditProvider /> : ''}
				{display === 'advance' ? <AdvancedAmount /> : ''}
				{display === 'banking-details' ? <BankingDetails /> : ''}
				{display === 'admin' ? <Admin /> : ''}
			</div>
		</Fragment>
	);
};


export default Loans;

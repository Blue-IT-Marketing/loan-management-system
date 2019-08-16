import React,{Fragment,useState} from 'react';
import ApplicantDetails from './ApplicantDetails';



const Loans = () => {
	const[display,setDisplay] = useState('applicant-details');

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							{' '}
							<i className="fa fa-dollar"> </i> Loans{' '}
						</strong>
					</h3>

					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool"
							name="applicant"
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
						>
							<strong>
								{' '}
								<i className="fa fa-user"> </i> Credit Provider{' '}
							</strong>
						</button>
						<button type="button" className="btn btn-box-tool" name="advance">
							<strong>
								{' '}
								<i className="fa fa-credit-card"> </i> Advance Amount{' '}
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool"
							name="banking-details"
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
						>
							<strong>
								{' '}
								<i className="fa fa-dashboard"> </i> Admin{' '}
							</strong>
						</button>
					</div>
				</div>


				{(display === 'applicant-details') ?
					<ApplicantDetails /> 
					:''                   
				}





			</div>
		</Fragment>
	);
};


export default Loans;

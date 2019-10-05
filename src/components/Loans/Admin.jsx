import React,{Fragment,useState} from 'react';
import {personal_details_init} from './loans-constants';

const loan_init = {
	loaned_amount :'',
	date_loaned : '',
	payment_amount : '',
	balance : '', 
	payment_date : '',
	active_loan : false
};


const ShowInstructions = () => {
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-info'> </i> {' '} Instructions
					</h3>
				</div>

				<div className='box box-footer'>
					once you are done adding all the information related to a client, you can then try activating
					the client lone, and then after activation you can then print out the client's loan file 
					so that your client can sign the documentation.
				</div>

			</div>
		</Fragment>
	);
};


const ActivateLoan = () => {
	
	const[loan,setLoan] = useState(loan_init);
	const[personal_details,setPersonalDetails] = useState(personal_details_init);

	const onActivateLoan = e => {
		// careful make sure the logic flow is correct here
		console.log('activating loan',e);
	};

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-credit-card'> </i>
						{' '} Activate Loan

					</h3>
				</div>

				<form className='form-horizontal col-sm-4'>
					<div className='form-group'>
						<input 
							type='text' 
							className='form-control' 
							name='allps' 
							placeholder='allps Number'
							value={personal_details.allps} 
							onChange={e =>setPersonalDetails({...personal_details,[e.target.name]:e.target.value})} 
						/>
					</div>
					<div className='form-group'>
						<input 
							type='text' 
							className='form-control' 
							name='payment_date'
							placeholder='Repayment Date'
							value={loan.payment_date}
							onChange={e => setLoan({...loan,[e.target.name]:e.target.value})}
						/>
					</div>
					<div className='form-group'>
						<button
							type='button'
							className='btn btn-success margin btn-lg'
							name='activate'
							onClick={e => onActivateLoan(e)}
						>
							<strong><i className='fa fa-credit-card-alt'> </i>
								{' '} Activate Loan
							</strong>
						</button>
						<button
							type='button'
							className='btn btn-warning btn-lg'
							name='reset'
							onClick={() =>{
								setLoan({...loan,payment_date:''});
								setPersonalDetails({...personal_details,allps:''});
							}}
						>
							<strong>
								<i className='fa fa-eraser'> </i>{' '}
								Reset
							</strong>

						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};


const CreateFile = () => {
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-stackpath'> </i>{' '}
						Create File
					</h3>
				</div>
			</div>
		</Fragment>
	);
};

const Admin = () => {
	const [display, setDisplay] = useState('show-instructions');
	const [adminMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};

	
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-dashboard"> </i> Admin
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
							{adminMenu.menu ? (
								<ul className="dropmenu">
									<li className="btn btn-block droplink"
										name="show-instructions"
										onClick={e => setDisplay('show-instructions')}
									><i className="fa fa-dashboard"> </i> Admin{' '}
									</li>
									<li className="btn btn-block droplink"
										name="activate-loan"
										onClick={e => setDisplay('activate-loan')}
									><i className="fa fa-file"> </i> Activate Loan
									</li>
									<li className="btn btn-block droplink"
										name="create-file"
										onClick={e => setDisplay('create-file')}
									><i className="fa fa-file"> </i> Create File
									</li>
								</ul> 
							) : null }
						</div>
					</div>

					{display === 'show-instructions' ? <ShowInstructions /> : ''}

					{display === 'activate-loan' ? <ActivateLoan /> : ''}

					{display === 'create-file' ? <CreateFile /> : ''}
				</div>
			</div>
		</Fragment>
	);
};

export default Admin;

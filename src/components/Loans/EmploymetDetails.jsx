import React,{Fragment,useState} from 'react';


let employment_details_init = {
	client_id: '',
	employer_name: '',
	employee_number: '',
	department: '',
	employee_kind: '',
	contract: '',
	date_employed : ''
};

let employment_details_error_init = {
	employer_name_error : '',
	employee_number_error : '',
	department_error : '',
	employee_kind_error : '',
	contract_error : '',
	date_employed_error : ''
};

export default function EmploymentDetails () {
	const[employment_details,setEmploymentDetails] = useState(employment_details_init);
	const[errors,setErrors] = useState(employment_details_error_init);
	const[inline,setInline] = useState({message:'',message_type:'INFO'});

	const{
		client_id,
		employer_name,
		employee_number,
		department,
		employee_kind,
		contract,
		date_employed 
	} = employment_details;

	const onHandleChange = e => {
		setEmploymentDetails({
			...employment_details,
			[e.target.name]:e.target.value
		});
	};

    
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-amazon"> </i> Employment Details
						</strong>
					</h3>
				</div>

				<form className="form-horizontal">
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="employer_name"
							value={employer_name}
							onChange={e => onHandleChange(e)}
							placeholder="Employer Name"
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="employee_number"
							value={employee_number}
							onChange={e => onHandleChange(e)}
							placeholder="Employee Number"
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="department"
							value={department}
							onChange={e => onHandleChange(e)}
							placeholder="Department"
						/>
					</div>

					<div className="form-group">
						<select
							name="employee_kind"
							className="form-control"
							value={employee_kind}
							onChange={e => onHandleChange(e)}
							placeholder='Employee Kind'
						>
							<option value="department">Government Department</option>
							<option value="private">Private</option>
							<option value="pension">Pension</option>
							<option value="grant">Grant</option>
						</select>
					</div>

					<div className="form-group">
						<select
							name="contract"
							className="form-control"
							value={contract}
							onChange={e => onHandleChange(e)}
						>
							<option value="permanent">Permanent</option>
							<option value="temporary">Temporary</option>
							<option value="freelance">Freelance</option>
							<option value="agent">Agent</option>
						</select>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							name="date_employed"
							value={date_employed}
							onChange={e => onHandleChange(e)}
							placeholder='Date Employed'
						/>
					</div>

                    <div className='form-group'>
                        <button
                            type='button'
                            className='btn btn-success btn-lg'
                            name='save'
                        >
                            <strong>
                                <i className='fa fa-save'> </i> {' '}
                                Save
                            </strong>
                        </button>
                        <button
                            type='button'
                            className='btn btn-warning btn-lg'
                            name='reset'
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
}

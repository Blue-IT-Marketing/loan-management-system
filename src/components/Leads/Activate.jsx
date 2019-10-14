/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Fragment,useEffect,useState } from 'react';
import * as leadsAPI from './leads-api';
import DataTable from '../Tables/Tables';
import { leads_init, leads_init_error } from './leads-constants';
import InlineError from '../Forms/InlineError';
import './Leads.css';

const ManageLead = ({lead}) => {
	const[leadState,setLeadState] = useState(lead);
	const[errors,setError] = useState(leads_init_error);

	const checkErrors = async e => {
		e.preventDefault();
	};

	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<i className='fa fa-cogs'> </i>{' '}Manage Lead
					</h3>
				</div>

				<form className='form-horizontal'>
					<div className='form-group'>
						<label className='label'>Title</label>
						<select 
							type='text' 
							className='form-control'
							name='title'
							value={leadState.title}
							onChange={e => setLeadState({...leadState, [e.target.name]:e.target.value})}
						>
							<option value='mr'>MR</option>
							<option value='mrs'>Mrs</option>
							<option value='miss'>Miss</option>							
						</select>
						{errors.title_error ? <InlineError message={errors.title_error} /> : ''}
					</div>

					<div className='form-group'>
						<label className='label'>Names</label>
						<input 
							type='text' 
							className='form-control'
							name='names'
							value={leadState.names}
							onChange={e => setLeadState({...leadState, [e.target.name]:e.target.value})}
						/>
						{errors.names_error ? <InlineError message={errors.names_error} /> : ''}
					</div>
					<div className='form-group'>
						<label className='label'>Surname</label>
						<input 
							type='text' 
							className='form-control'
							name='surname'
							value={leadState.surname}
							onChange={e => setLeadState({...leadState, [e.target.name]:e.target.value})}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error} /> : ''}
					</div>
					<div className='form-group'>
						<label className='label'>ID/Passport</label>
						<input 
							type='text' 
							className='form-control'
							name='id'
							value={leadState.id}
							onChange={e => setLeadState({...leadState, [e.target.name]:e.target.value})}
						/>
						{errors.surname_error ? <InlineError message={errors.surname_error} /> : ''}
					</div>
					<div className='form-group'>
						<label className='label'>Date Of Birth</label>
						<input 
							type='text' 
							className='form-control'
							name='dob'
							value={leadState.dob}
							onChange={e => setLeadState({...leadState, [e.target.name]:e.target.value})}
						/>
						{errors.dob_error ? <InlineError message={errors.dob_error} /> : ''}
					</div>



					<div className='form-group'>
						<button
							type='button'
							className='btn btn-primary btn-lg'
							name='convert'

						>
							<strong>
								<i className='fa fa-user-astronaut'> </i>{' '}
								Convert to Client
							</strong>

						</button>
					</div>



					


				</form>

			</div>
		</Fragment>
	);
};


const Activate = () => {

	const[leads,setLeads] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const[data,setData] = useState({});
	const[manageLead,setManageLead] = useState(leads_init);


	const OpenLead =  loan_id => {
		console.log('loan id',loan_id);
		setManageLead(leads.find(lead => lead.loan_id === loan_id));
	};

	const returnData = () => {

		let rowdata = [];
		
		leads.forEach(lead => {

			rowdata.push({
				names : 
				<span 					
					className='lead-list'					
					onClick={e => OpenLead(lead.loan_id)}
				> {lead.names} </span>,
				surname: lead.surname,
				cell: lead.cell,
				email: lead.email,				
				id: lead.id,
				notes:lead.notes
			});
		});		
	
		const data = {
			columns: [
				{
					label: 'Names',
					field: 'names',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Surname',
					field: 'surname',
					sort: 'asc',
					width: 270
				},
				{
					label: 'cell',
					field: 'cell',
					sort: 'asc',
					width: 200
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
					width: 100
				},
				{
					label: 'ID',
					field: 'id',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Notes',
					field: 'notes',
					sort: 'asc',
					width: 150
				}

			],
			rows: rowdata
		};

		return data;
	};

	useEffect(() => {      
		const converted = false;  
		leadsAPI.fetchLeads(converted).then(response => {
			if(response.status){
				setLeads(response.payload);
			}else{
				setLeads([]);
			}
		});
		return () => {
			setLeads([]);
		};
	}, []);

	useEffect(() => {
		const leads_data = returnData();
		setData(leads_data);
		return () => {		
			setData({});	
		};
	}, [leads]);

	return (
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'>
						<strong>
							<i className='fa fa-search'> </i>{' '}
                            Lead Manager
						</strong>
					</h3>
				</div>
				{
					manageLead.loan_id ?
						<ManageLead lead={manageLead} />
						: <DataTable data={data} />
				}
				
			</div>
		</Fragment>
            
        
	);
};

export default Activate;

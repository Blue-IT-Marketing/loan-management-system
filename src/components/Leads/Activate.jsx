/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Fragment,useEffect,useState } from 'react';
import * as leadsAPI from './leads-api';
import DataTable from '../Tables/Tables';

const Activate = () => {

	const[leads,setLeads] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const[data,setData] = useState({});

	const returnData = () => {

		let rowdata = [];
        		
		leads.forEach(lead => {
			rowdata.push({
				names : lead.names,
				surname: lead.surname,
				cell: lead.cell,
				email: lead.email,				
				id: lead.id,
				notes:lead.notes
			});
		});		
	
		const data = {
			colums: [
				{
					label: 'Names',
					field: 'names',
					sort: 'asc',
					
				},
				{
					label: 'Surname',
					field: 'surname',
					sort: 'asc',
					
				},
				{
					label: 'Cell',
					field: 'cell',
					sort: 'asc',
					
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
					
				},
				{
					label: 'ID',
					field: 'id',
					sort: 'asc',
					
				},
				{
					label: 'Notes',
					field: 'notes',
					sort: 'asc',
					
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
                            Search &amp; Activate
						</strong>
					</h3>
				</div>
				<DataTable data={data} />
			</div>
		</Fragment>
            
        
	);
};

export default Activate;

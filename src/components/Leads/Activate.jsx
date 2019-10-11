/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Fragment,useEffect,useState } from 'react';
import { leads_init} from './leads-constants';
import {routes} from '../../constants';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import * as leadsAPI from './leads-api';

const Activate = () => {

	const[leads,setLeads] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const[data,setData] = useState({});

	const returnData = () => {

		let rowdata = [];
        		
		leads.forEach(lead => {
			rowdata.push(Object.entries(lead));
		});		
	
		const data = {
			colums: [
				{
					label: 'Client ID',
					field: 'client_id',
					sort: 'asc',
					width: 150
				},
				{
					label: 'ID Number',
					field: 'id',
					sort: 'asc',
					width: 270
				}
			],
			rows: rowdata
		};

		return data;
	};

    
	


	useEffect(() => {        
		leadsAPI.fetchLeads().then(response => {
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
			setData({})	
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
				{ data ?
					<MDBDataTable striped bordered hover data={data} /> : ''
				}
			</div>
		</Fragment>
            
        
	);
};

export default Activate;

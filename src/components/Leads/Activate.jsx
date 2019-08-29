/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Fragment,useEffect,useState } from 'react';
import { leads_init} from './leads-constants';
import {routes} from '../../constants';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const Activate = () => {

	const[leads,setLeads] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});


	const returnData = () => {

		let rowdata = [];
        
		const parseRowData = ()  => {
			leads.forEach(lead => {
				rowdata.push(Object.entries(lead));
			});
			return true;
		};
        
		parseRowData();

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
		const fetchAPI = async () => {
			try{
				await axios.get(routes.leads_api_endpoint).then(results => {
					if(results.status === 200){
						return results.data;
					}else{
						throw new Error('there was an error fetching loans-please check your internet connection');
					}
				}).then(leads => {
					setLeads(leads);
					setInline({message:'successfully loaded loans'});        
					return true;
				}).catch(error => {
					setInline({message:'error : '+ error.message,message_type:'error'});
					return false;
				});
			}catch(error){
				setInline({message:'error : '+ error.message,message_type:'error'});
				return false;
			}
		};
        
		fetchAPI().then(result => {
			console.log('RESULTS',result);
		});
		

		return () => {
            
		};
	}, []);

	let data = returnData();
    
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

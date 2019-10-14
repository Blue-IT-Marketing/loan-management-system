/* eslint-disable no-unused-vars */
import React, { Fragment,useEffect,useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {personal_details_init,personal_details_errors_init,mapToLoans} from './loans-constants';
import {routes} from '../../constants';
import InlineMessage from '../Forms/InlineMessage';

const ActiveLoans = () => {
	const[loans, setLoans] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const[data,setData] = useState([]);


	const returnData = async () => {

		const prepareLoans = () => {
			
			let preparedLoans = [];

			loans.forEach(loan => {        
				console.dir('Prepared',loan);
				preparedLoans.push({
					loan_id:loan.loan_id,
					id:loan.id,
					surname:loan.surname,
					names:loan.names,
					allps:loan.allps
				});
			});

			return preparedLoans;
		};

		let rows = await prepareLoans();
		rows = [...rows];

		let data = {
			columns: [
				{
					label: 'Loan ID',
					field: 'loan_id',
					sort: 'asc',
					width: 150
				},
				{
					label: 'ID Number',
					field: 'id',
					sort: 'asc',
					width: 270
				},
				{
					label: 'Surname',
					field: 'surname',
					sort: 'asc',
					width: 200
				},
				{
					label: 'Full Names',
					field: 'names',
					sort: 'asc',
					width: 100
				},
				{
					label: 'ALLPS',
					field: 'allps',
					sort: 'asc',
					width: 150
				}
			],
			rows:  rows
		};    
		return data;
	};
  

	// start preparing display as soon as loans have been added
	useEffect(() => {
		returnData().then(data => {
			console.log('Big Data', data);
		    setData(data);
		});
		return () => {
			setData([]);
		};
	}, [loans]);


	useEffect(() => {
		const fetchAPI = async () => {
			await axios.get(routes.loans_api_endpoint).then(results => {
				if (results.status === 200) {
					return results.data;
				} else {
					throw new Error(
						'there was an error fetching loans-please check your internet connection'
					);
				}
			})
				.then(loans => {
					let comp_loan = mapToLoans(loans);
					setLoans(comp_loan);
					setInline({ message: 'successfully loaded loans' });
					return true;
				})
				.catch(error => {
					setInline({
						message: 'error : ' + error.message,
						message_type: 'error'
					});
					return false;
				});
		};

		fetchAPI().then(result => {
			console.log('Active loans fetched successfully');
		});
		return () => {};
	}, []);
	
  
	

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-archive"> </i> Active Loans
						</strong>
					</h3>
				</div>

				<div className="box box-footer">
					{ data ?
						<MDBDataTable striped bordered hover data={data} /> : ''
					}
				</div>
			</div>
			<div className="box-footer">
			</div>
		</Fragment>
	);
};

export default ActiveLoans;

import React,{Fragment,useState,useEffect} from 'react';
import { leads_init } from "./leads-constants";
import { routes } from "../../constants";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

import * as leadsAPI from './leads-api';


const Converted = () => {

	const [leads, setLeads] = useState([]);
	const [inline, setInline] = useState({ message: '', message_type: 'info' });

	const returnData = () => {
		let rowdata = [];

		const parseRowData = () => {
			leads.forEach(lead => {
				rowdata.push({
					names : lead.names,
					surname : lead.surname,
					cell : lead.cell,
					id : lead.id
				});
			});
			return true;
		};

		parseRowData();

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
					label: 'ID',
					field: 'id',
					sort: 'asc',
					
				}

			],
			rows: rowdata
		};
		return data;
	};

	useEffect(() => {
		const converted = true;
		leadsAPI.fetchLeads(converted).then(response => {
			if (response.status){
				setLeads(response.payload)
			}else{
				setLeads([]);
			}
		}).catch(error => {
			setLeads([]);
		});

		return () => setLeads([]);
	}, []);

	let data = returnData();

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-search"> </i> Converted Leads
						</strong>
					</h3>
				</div>
				{data ? <MDBDataTable striped bordered hover data={data} /> : ''}
			</div>
		</Fragment>
	);
};

export default Converted;

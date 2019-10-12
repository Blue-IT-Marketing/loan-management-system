import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DataTable = ({data}) => 
	<MDBDataTable 
		striped 
		bordered 
		hover 
		responsive 
		data={data} 
	/>



export default DataTable;
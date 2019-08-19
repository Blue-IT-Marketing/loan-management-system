import React, { Fragment,useEffect,useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {personal_details_init,personal_details_errors_init} from './loans-constants';
import {routes} from '../../constants';
import InlineMessage from '../Forms/InlineMessage';

const ActiveLoans = () => {
	const[loans, setLoans] = useState([]);
	const[inline,setInline] = useState({message:'',message_type:'info'});

	useEffect(() => {        
		const fetchAPI = async () => {
			await axios.get(routes.loans_api_endpoint).then(results => {
				if(results.status === 200){
					return results.data;
				}else{
					throw new Error('there was an error fetching loans-please check your internet connection');
				}
			}).then(loans => {
				setLoans(loans);
				setInline({message:'successfully loaded loans'});        
			}).catch(error => {
				setInline({message:'error : '+ error.message,message_type:'error'});
			});
		};

		fetchAPI();
		return () => {
            
		};
	}, [loans]);

  const data ={     
    columns: [
      {
        label: "Client ID",
        field: "client_id",
        sort: "asc",
        width: 150
      },
      {
        label: "ID Number",
        field: "id",
        sort: "asc",
        width: 270
      },
      {
        label: "Surname",
        field: "surname",
        sort: "asc",
        width: 200
      },
      {
        label: "Full Names",
        field: "names",
        sort: "asc",
        width: 100
      },
      {
        label: "ALLPS",
        field: "allps",
        sort: "asc",
        width: 150
      }
    ],
    rows : loans}

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
					{/* <table
            id="ActivePolicyListTable"
            class="table table-bordered table-striped"
          >
            <thead>
              <tr>
                <th>Midey Account</th>
                <th>ID Number</th>
                <th>Surname</th>
                <th>Full Names</th>
                <th>ALLPS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/loans/list/0007E2120"> 0007E2120 </a>
                </td>
                <td>8004185430083</td>
                <td>MONYELA</td>
                <td>ABRAHAM AUBREY</td>
                <td>P005</td>
              </tr>

              <tr>
                <td>
                  <a href="/loans/list/0001E267"> 0001E267 </a>
                </td>
                <td>7501051590081</td>
                <td>MULOVHEDZI</td>
                <td>MASALA DEPHENEY </td>
                <td>957</td>
              </tr>

              <tr>
                <td>
                  <a href="/loans/list/0001E914"> 0001E914 </a>
                </td>
                <td>7004066419081</td>
                <td>BADATSWANA</td>
                <td>REMBULUWANI</td>
                <td>11409</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Midey Account</th>
                <th>ID Number</th>
                <th>Surname</th>
                <th>Full Names</th>
                <th>ALLPS</th>
              </tr>
            </tfoot>
          </table> */}
					<MDBDataTable striped bordered hover data={data} />;
				</div>
			</div>
			<div className="box-footer">
				{inline.message ? (
					<InlineMessage
						message={inline.message}
						message_type={inline.message_type}
					/>
				) : (
					''
				)}
			</div>
		</Fragment>
	);
};

export default ActiveLoans;

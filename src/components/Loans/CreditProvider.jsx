import React, { Fragment,useState } from 'react';
import moment from "moment";
const CreditProvider = () => {
	const[branch,setBranch] = useState({});
	const[employees,setEmployees] = useState({});

	return (
		<Fragment>
			<div className="box box-info">
				<div className="box box-title">
					<h3>Credit Provider Details</h3>
				</div>
				<div className="box box-comments">
					<ul className="box box-comment">
						<li className="list-group-item"><h4>Name of Credit Provider</h4></li>
						<li className="list-group-item">MIDEY FINANCIAL SOLUTIONS</li>
						<li className="list-group-item"><h4>Physical Address</h4></li>
						<li className="list-group-item">Mashapa Complex</li>
						<li className="list-group-item">1st Floor, Office No. B12 & 14</li>
						<li className="list-group-item">Thohoyandou</li>
						<li className="list-group-item">0950</li>
						<li className="list-group-item">Tel : 015 962 0976</li>
						<li className="list-group-item">NCR Registration : NCRCP5905</li>
						<li className="list-group-item">Company Reg: 2007/036777/23</li>
						<li className="list-group-item">Date: {moment().format('YYYY MM DD')}</li>
						<li className="list-group-item"><div className="form-group">
							<div className="col-sm-9">
								<button type="button" className="btn btn-facebook btn-block" id="SaveCreditProviderButt"><i className="fa fa-save"> </i> Save</button>
							</div>
						</div></li>
					</ul>
				</div>
			</div>

		</Fragment>
            
        
	);
};

export default CreditProvider;

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React,{Fragment,useState} from 'react';
import ClientsCapture from './ClientsCapture';
import Activate from './Activate';
import Converted from './Converted';

const Leads = () => {
	const [display, setDisplay] = useState('clients-capture');
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-compass"> </i> Leads
						</strong>
					</h3>
					<div className="box-tools">
						<button
							type="button"
							className="btn btn-box-tool btn-outline-dark"
							name="clients-capture"
							onClick={e => setDisplay('clients-capture')}
						>
							<strong>
								<i className="fa fa-camera-retro"> </i> Clients Capture
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool btn-outline-dark"
							name="search-activate"
							onClick={e => setDisplay('search-activate')}
						>
							<strong>
								<i className="fa fa-search"> </i> Search &amp; Activate
							</strong>
						</button>
						<button
							type="button"
							className="btn btn-box-tool btn-outline-dark"
							name="converted-leads"
							onClick={e => setDisplay('converted-leads')}
						>
							<strong>
								<i className="fa fa-users"> </i> Converted Leads
							</strong>
						</button>
					</div>
				</div>

				{display === 'clients-capture' ? <ClientsCapture /> : ''}
				{display === 'search-activate' ? <Activate /> : ''}
				{display === 'converted-leads' ? <Converted /> : ''}
			</div>
		</Fragment>
	);
};

export default Leads;

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React,{Fragment,useState} from 'react';
import ClientsCapture from './ClientsCapture';
import Activate from './Activate';
import Converted from './Converted';

import * as leadsAPI from './leads-api';

const Leads = () => {
	const [display, setDisplay] = useState('clients-capture');
	
	const [leadsMenu, setMenu] = useState({ menu: false });

	const showDropdownMenu = e => {
		e.preventDefault();
		setMenu({ menu: true });
		document.addEventListener('click', hideDropdownMenu);
	};

	const hideDropdownMenu = () => {
		setMenu({ menu: false });
		document.removeEventListener('click', hideDropdownMenu);
	};


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

						<div className="dropdown">
							<button
								type="button"
								className="btn btn-box-tool dropdown"
								onClick={e => showDropdownMenu(e)}
							>
								<i className='fa fa-bars'> </i>{' '}
							</button>
							{leadsMenu.menu ? (
								<ul className="dropmenu">
									<li
										className="btn btn-block droplink"
										name="send-sms"
										onClick={e => setDisplay('clients-capture')}
									><strong>
											<i className="fa fa-camera-retro"> </i> Clients capture
										</strong>
									</li>

									<li
										className="btn btn-block droplink"
										name="search-activate"
										onClick={e => setDisplay('search-activate')}
									>
										<strong>
											<i className="fa fa-search"> </i> Search &amp; Activate
										</strong>
									</li>
									<li
										className="btn btn-block droplink"
										name="search-activate"
										name="converted-leads"
										onClick={e => setDisplay('converted-leads')}
									>
										<strong>
											<i className="fa fa-users"> </i> Converted Leads
										</strong>
									</li>

								</ul>
							):null}
						</div>

	
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

import React,{Fragment} from 'react';
import './Contact.css';
import {settings} from '../../constants';
import Maps from '../Maps/Maps';


export default function ContactDetails () {

	const business_fax_url = `mailto:${settings.business_fax}@faxfx.net`;
	const business_tel_url = `tel:${settings.business_tel}`;

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-info"> </i> Contact Details
						</strong>
					</h3>
				</div>

				<div className="box-footer">
					<div className="small-box-footer">
						<div className="box-header">
							<h3 className="box-title">
								<strong>
									<i className="fa fa-building"> </i> Business Details
								</strong>
							</h3>
						</div>

						<div className="row">
							<div className="col-lg-6">
								<ul className="list-group">
									<li className="list-group-item">
										<strong>Business Name : </strong>
										<em>
											{settings.app_long_name}
										</em>
									</li>
									{settings.business_reg_number ?
										<li className="list-group-item">
											<strong>Registration Number : </strong>
											<em>{settings.business_reg_number}</em>
										</li>:''
									}

									{ settings.business_address ?
										<li className="list-group-item">
											<strong>Business Address : </strong>
											<em>{settings.business_address}</em>
										</li> : ''
									}
									{
										settings.business_fax ?
											<li className="list-group-item">
												<strong> Business Fax : </strong>
												<em>
													<a href={business_fax_url}>{settings.business_fax}</a>
												</em>{' '}|
											</li>: ''
									}
									{
										settings.business_tel ?
											<li className='list-group-item'>
												<strong> Business Tel : </strong>
												<em>
													<a href={business_tel_url}>{settings.business_tel}</a>
												</em>
											</li>:''
									}
								</ul>
							</div>
							<div className="col-lg-6">
								{
									settings.maps_url ?
										<Maps maps_url={settings.maps_url} />
										: ''
								}
							</div>
						</div>
					</div>

				</div>
			</div>
		</Fragment>
	);
}

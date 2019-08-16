// eslint-disable-next-line no-unused-vars
import React,{Fragment} from 'react';
import {settings} from '../../../constants';

export default function Footer() {
	return (
	    <Fragment>
			<div className="box box-footer with-border">
				<footer className="main-footer">
					<div className="pull-right hidden-xs">
						<a href="#">{settings.app_name}</a>
					</div>
					<div className="pull-left hidden-xs">
						<strong>Copyright &copy; 2019 <a href="#">{settings.app_name}</a>.</strong></div> All rights reserved
				</footer>
			</div>
		</Fragment>
	);
}

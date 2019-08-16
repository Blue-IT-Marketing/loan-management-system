import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';

export default function Forget(){


	function sendRecoveryEmail  (e) {
		e.preventDefault();
		console.log('Sending Recovery Email');
      

	}

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						{" "}
						<strong>
							{" "}
							<i className="fa fa-key"> </i> Forget Password
						</strong>{" "}
					</h3>
					<div className="box-tools">
						<Link to={routes.login_page}>
							<button type="reset" className="btn btn-box-tool">
								<strong>
									{" "}
									<i className="fa fa-sign-in"> </i> Login{" "}
								</strong>
							</button>
						</Link>
					</div>
				</div>

				<div className="box box-footer">
					<form
						className="form-horizontal"
						onSubmit={e => sendRecoveryEmail(e)}
					>
						<div className="form-group">
							<span>
                Enter your username so what we can send you a password
                recovery message
							</span>
						</div>
						<div className="form-group">
							<input type="email" className="form-control" name="username" />
						</div>
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-success btn-lg"
								onClick={e => sendRecoveryEmail(e)}
							>
								<strong>
									{" "}
									<i className="fa fa-unlock-alt"> </i> Recover
								</strong>
							</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
}

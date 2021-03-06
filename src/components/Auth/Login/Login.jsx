/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, {
	Fragment,
	useEffect,
	useContext,
	useRef,
	useState
} from 'react';
import { Link, Redirect, navigate } from 'react-router-dom';
import { routes,settings } from '../../../constants';

import { UserAccountContext } from '../../../context/UserAccount/userAccountContext';

import Input from '../../Input/Input';
import InlineMessage from '../../Forms/InlineMessage';

export default function Login() {
	const [values, setValues] = useState({ username: '', password: '' });
	const[inline,setInline] = useState({message:'',message_type:'info'});
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const submitRef = useRef(null);

	let handleChange = e => {
		const { name, value } = e.target;
		console.log('Name : ', name, ' Value : ', value);
		setValues({
			...values,
			[name]: value
		});

		console.log(values);
	};

	const checkLogin = () => {
		if (!localStorage.getItem(settings.firebase.authDomain)) {
			console.log("User is logged not in");
			
		} else { 
			console.log('User is logged in');
		}
	};

	useEffect(() => {
		checkLogin();
		usernameRef.current.focus();
		console.log('Login page loaded');
	}, []);

	return (
		<UserAccountContext.Consumer>
			{context => {
				console.log('The big loggin context', context);
				const { doLogin, user_account_state } = context;
				const { username, password } = values;
				return (
					<Fragment>
						<div className="box box-body">
							<div className="box box-header">
								<h3 className="box-title">
									<strong>
										<i className="fa fa-sign-in"> </i> Login User
									</strong>
								</h3>
								<div className="box-tools">
									<Link to={routes.forget_password_page}>
										<button
											type="button"
											className="btn btn-box-tool"
										>
											<strong>
												<i className="fa fa-unlock"> </i> Forget
                        Password
											</strong>
										</button>
									</Link>
								</div>
							</div>
							<div className="box-footer">
								<form
									className="form-horizontal"
									onSubmit={e =>  doLogin(username, password).then(response =>{
										setInline({
											message: response.form_response,
											message_type: 'info'
										});
									})

									}
								>
									<div className="form-group">
										<Input
											type="text"
											className="form-control"
											name="username"
											placeholder="Login Name"
											ref={usernameRef}
											value={values.username}
											onChange={e => handleChange(e)}
										/>
									</div>
									<div className="form-group">
										<Input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											ref={passwordRef}
											value={values.password}
											onChange={e => handleChange(e)}
										/>
									</div>
									<div className="form-group">
										<button
											type="button"
											className="btn btn-success btn-lg"
											ref={submitRef}
											onClick={e => {
												doLogin(username, password).then(response =>{
													setInline({message:response.form_response,message_type:'info'});
												});
												//navigate("/", true);
											}}
										>
											<strong>
												<i className="fa fa-sign-in"> </i> Login
											</strong>
										</button>
										<Link to={routes.signup_page}>
											<button
												type="button"
												className="btn btn-primary btn-lg"
											>
												<strong>
													<i className="fa fa-sign-in"> </i> Subscribe
												</strong>
											</button>
										</Link>
									</div>
									<div className='form-group'>
										{inline.message ? <InlineMessage message={inline.message} message_type={inline.message_type}/>:''}
									</div>
								</form>
							</div>
						</div>
					</Fragment>
				);
			}}
		</UserAccountContext.Consumer>
	);
}

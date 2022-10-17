import '../Styles/login.css';
import * as yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { encrypt, decrypt, otp } from '../module/myCrypto';
// require('../module/t.js')
let notify = null;

const Login = ({ logado = false }) => {

	const [ isActive, setIsActive ] = useState(false);
	const handleLogin = (values) => {
		notify = toast.loading('Loading...');
		const email = values.email.toLowerCase();
		var emailHash = encrypt(email);
		var passwordHash = encrypt(values.password);
		Axios.post(
			'https://localhost:4000/auth/login',
			{
				email: emailHash,
				password: passwordHash,
			},
			{
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			},
		).then((response) => {
			console.log(response);
			if (response.status === 200) {
				if (response.data.user.username === values.email) {
					localStorage.setItem('@user', JSON.stringify(response.data.user.username));
					window.location.reload();
					toast(response.data.msg, {
						position: 'bottom-right',
						id: notify, // Custom Icon
						icon: '👏',
					});
				}
			} else {
				if (response.data.code === 100) return toast(response.data.msg, { position: 'bottom-right', id: notify });
				if (response.data.code === 101) return toast(response.data.msg, { position: 'bottom-right', id: notify });
				if (response.data.code === 102) return toast(response.data.msg, { position: 'bottom-right', id: notify });
				if (response.data.code === 103) return toast(response.data.msg, { position: 'bottom-right', id: notify });
				if (response.data.code === 104) return toast(response.data.msg, { position: 'bottom-right', id: notify });
				if (response.data.code === 105) return toast(response.data.msg, { position: 'bottom-right', id: notify });
			}
		});
	};

	const validationsLogin = yup.object().shape({
		email: yup.string().min(5, 'invalid email').required('Email is required'),
		password: yup.string().min(8, 'The password must be at least 8 characters long').required('The password is required'),
	});

	const validationsRegister = yup.object().shape({
		email: yup.string().min(8, 'invalid email').required('Email is required'),
		password: yup.string().min(8, 'The password must be at least 8 characters long').required('The password is required'),
		confirmation: yup.string().oneOf([ yup.ref('password'), null ], 'Passwords are different').required('Password confirmation is mandatory'),
	});

	const show_hide_password = (target) => {
		let showHide = document.getElementById('password-control');
		var input = document.getElementById('password-input');
		if (input.getAttribute('type') === 'password') {
			setIsActive((current) => !current);
			input.setAttribute('type', 'text');
		} else {
			setIsActive((current) => !current);
			input.setAttribute('type', 'password');
		}
		return false;
	};

	return (
		<section>
			<div className="box">
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="container">
					<div className="form">
						<h2>LOGIN</h2>
						<Formik initialValues={{}} onSubmit={handleLogin} validationSchema={validationsLogin}>
							<Form className="LoginForm">
								<div className="inputBx">
									<Field name="email" type="username" className="inputBox" autoComplete="username" />
									<span className="spanInput">Email/username</span>
									<i className="fas fa-user-circle" />
									<ErrorMessage component="span" name="email" className="form-error" />
								</div>
								<div className="inputBx password">
									<Field name="password" type="password" className="inputBox" id="password-input" />
									<span className="spanInput">password</span>
									<a href="#" className={isActive ? 'password-control view' : 'password-control'} onClick={(event) => show_hide_password(event, 100)} />
									<i className="fas fa-key" />
									<ErrorMessage component="span" name="password" className="form-error" />
								</div>
								{/* <label className="remember">
                  <input type="checkbox" /> Remember me
                </label> */}
								<div className="inputBx">
									<input type="submit" value="login" />
								</div>
							</Form>
						</Formik>
						<p>Forgot password? {!logado && <Link to="/register">Click Here</Link>}</p>
						<p>Don't have an account {!logado && <Link to="/register">Sign up</Link>}</p>
					</div>
				</div>
			</div>
			<Toaster />
		</section>
	);
};

export default Login;

import '../Styles/login.css';
import * as yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { encrypt, decrypt } from '../module/myCrypto';
import bcrypt from 'bcryptjs'; // A library that is used to hash passwords.
const saltRounds = 10;

const Register = ({ logado = false }) => {
	const [ isActive, setIsActive ] = useState(false);

	const handleRegister = (values) => {
		// const notify = toast.loading('Loading...');
		var name = values.name.toLowerCase();
		var lastname = values.lastname.toLowerCase();
		var username = values.username.toLowerCase();
		var email = values.email.toLowerCase();
		var nameHash = encrypt(name);
		var lastnameHash = encrypt(lastname);
		var usernameHash = encrypt(username);
		var emailHash = encrypt(email);
		var passwordHash = bcrypt.hashSync(values.password, saltRounds); // hash created previously created upon sign up;
		Axios.post(
			'https://localhost:4000/auth/register',
			{
				name: nameHash,
				lastname: lastnameHash,
				username: usernameHash,
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
			if (response.data.code === 100) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 101) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 102) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 103) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 104) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 105) return toast(response.data.msg, { position: 'bottom-right' });
			if (response.data.code === 106) {
				toast(response.data.msg, { position: 'bottom-right' });
				window.location.href = '/';
			}
		});
	};
	const validationsRegister = yup.object().shape({
		email: yup.string().email('Invalid email').required('Email is required'),
		username: yup.string().min(8, 'Invalid username').required('username is required'),
		password: yup.string().min(8, 'The password must be at least 8 characters long').required('The password is mandatory'),
		confirmation: yup.string().oneOf([ yup.ref('password'), null ], 'Passwords are different').required('Password confirmation is required'),
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
			<Toaster />
			<div className="box">
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="square" />
				<div className="container">
					<div className="form">
						<h2>Register</h2>
						<Formik initialValues={{}} onSubmit={handleRegister} validationSchema={validationsRegister}>
							<Form className="login-form">
								<div className="inputBx">
									<Field name="name" type="name" className="inputBox" />
									<span className="spanInput">Name</span>
									<i className="fas fa-user-circle" />
									<ErrorMessage component="span" name="name" className="form-error" />
								</div>
								<div className="inputBx">
									<Field name="lastname" type="lastname" className="inputBox" />
									<span className="spanInput">lastname</span>
									<i className="fas fa-user-circle" />
									<ErrorMessage component="span" name="lastname" className="form-error" />
								</div>
								<div className="inputBx">
									<Field name="username" type="username" className="inputBox" />
									<span className="spanInput">username</span>
									<i className="fas fa-user-circle" />
									<ErrorMessage component="span" name="username" className="form-error" />
								</div>
								<div className="inputBx">
									<Field name="email" type="email" className="inputBox" />
									<span className="spanInput">Email</span>
									<i className="fas fa-user-circle" />
									<ErrorMessage component="span" name="email" className="form-error" />
								</div>
								<div className="inputBx password">
									<Field name="password" type="password" className="inputBox" id="password-input" />
									<span className="spanInput" form="email">
										password
									</span>
									<a href="#" className={isActive ? 'password-control view' : 'password-control'} onClick={(event) => show_hide_password(event, 100)} />
									<i className="fas fa-key" />
									<ErrorMessage component="span" name="password" className="form-error" />
								</div>
								<div className="inputBx password">
									<Field name="confirmation" type="password" className="inputBox" id="password-input" />
									<span className="spanInput">password</span>
									<i className="fas fa-key" />
									<ErrorMessage component="span" name="confirmation" className="form-error" />
								</div>
								<div className="inputBx">
									<input type="submit" value="Sign up" />
								</div>
							</Form>
						</Formik>
						<p>Do have an account {!logado && <Link to="/">Sign in</Link>}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;

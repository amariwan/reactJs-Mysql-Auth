import React from 'react';
import Axios from 'axios';

const test = () => {
	const handleLogin = () => {
		Axios.get('http://localhost:3001/auth/set').then((response) => {
			console.log(response);
		})
	};
	handleLogin();
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};
export default test;

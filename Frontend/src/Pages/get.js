import React from 'react';
import Axios from 'axios';

const test = () => {
	const handleLogin = () => {
		Axios.get('https://localhost:4000/get').then((response) => {
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

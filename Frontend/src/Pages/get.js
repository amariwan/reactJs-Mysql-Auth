import React from 'react';
import Axios from 'axios';

const test = () => {
	// const handleLogin = () => {
	Axios.get('https://localhost:4000/test/get', { method: 'GET', withCredentials: true }).then((response) => {
		console.log(response);
	});
	// };
	// handleLogin();
	// Axios('https://localhost:4000/test/get', {
	// 	method: 'GET',
	// 	withCredentials: true,
	// });
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};
export default test;

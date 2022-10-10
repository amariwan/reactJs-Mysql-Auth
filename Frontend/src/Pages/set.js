import React from 'react';
import Axios from 'axios';

const test = () => {
	Axios.get('https://localhost:4000/test/set', {
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	}).then((response) => {
		console.log(response);
		console.log(response.data.session);
	});
	return (
		<div>
			<h1></h1>
		</div>
	);
};
export default test;

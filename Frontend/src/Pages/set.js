import React from 'react';
import Axios from 'axios';

const test = () => {
	var name = Axios.get('https://localhost:4000/test/set', {
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	}).then((response) => {
		getResponse(response);
		return response;
	});
	const getResponse = (response) => {
		return response;
	};
console.log(name.then());
	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
};
export default test;

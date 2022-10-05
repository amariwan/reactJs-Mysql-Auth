import React from 'react';
import Axios from 'axios';

const test = () => {
	// Axios.get('https://localhost:4000/set', {
	//   headers: {
	//     'Content-Type': 'application/json'
	//   },
	//   withCredentials: true
	// }).then((response) => {
	// console.log(response);
	// 	return response;
	// })

	Axios('https://localhost:4000/test/del', {
		method: 'GET',
		withCredentials: true,
	});
	return (
		<div>
			<h1>Aland</h1>
		</div>
	);
};
export default test;

import React from 'react';
import Axios from 'axios';

const test = () => {
    Axios.get('https://localhost:4000/set').then((response) => {
    console.log(response);
			return response;
		})
	return (
		<div>
			<h1>Aland</h1>
		</div>
	);
};
export default test;

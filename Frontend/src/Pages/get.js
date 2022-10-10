import React from 'react';
import Axios from 'axios';

const test = () => {
	var name = "none";
	Axios.get('https://localhost:4000/test/get', {
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  withCredentials: true		
	}).then((response) => {
		console.log(response);
		console.log(response.data.session);
		return response;
	})
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};
export default test;

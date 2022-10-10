import React from 'react';
import '../Styles/dashboard.css';
import Header from '../Components/header/header';
import Axios from 'axios';

function HomePage() {
	Axios.get('https://localhost:4000/auth/get', {
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
		method: 'GET',
	}).then((response) => {
		console.log(response);
		console.log(response.data.session);
		return response;
	});
	return (
		<div class="App">
			<div class="content">
				<Header />
			</div>
		</div>
	);
}

export default HomePage;

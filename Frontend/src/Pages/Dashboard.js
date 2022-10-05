import React from 'react';
import '../Styles/dashboard.css';
import Header from '../Components/header/header';
import Axios from 'axios';

function HomePage() {
	Axios.get('http://localhost:3001/auth/get').then((response) => {
		console.log(response);
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

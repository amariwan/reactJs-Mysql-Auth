import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Register from '../Pages/Register';
import PageNotFound from '../Pages/PageNotFound';

const Rotas = () => {
	const [ articles, setArticles ] = useState(null);

	useEffect(() => {
		axios
			.get('https://localhost:4000/', {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				method: 'GET',
			})
			.then((response) => {
				console.log(response.data.loggedIn);
				setArticles(response.data.loggedIn);
			})
			.catch((error) => {
				console.error(error);
				// setArticles(error.data);
			});
	}, []);

	console.log(articles);

	let logado = articles;
	return (
		<BrowserRouter>
			<Routes>
				{logado && <Route path="/" exact element={<Dashboard />} />}
				<Route path="*" element={<PageNotFound />} />
				{!logado && <Route path="/" element={<Login logado={logado} />} />}
				{!logado && <Route path="/register" element={<Register logado={logado} />} />}
			</Routes>
		</BrowserRouter>
	);
};

export default Rotas;

// Soft UI Dashboard React layouts
// import Dashboard from '../Pages/Dashboard';
// import PageNotFound from '../Pages/PageNotFound.js';

// Auth
// import SignIn from '../Pages/Login';
// import SignUp from '../Pages/Register';

// // Soft UI Dashboard React icons
// // import Document from 'examples/Icons/Document';
// // import SpaceShip from 'examples/Icons/SpaceShip';
// const routes = [
// 	{
// 		type: 'collapse',
// 		name: 'Sign In',
// 		key: 'sign-in',
// 		route: '/authentication/sign-in',
// 		// icon: <Document size="12px" />,
// 		component: <SignIn />,
// 		noCollapse: true
// 	},
// 	{
// 		type: 'collapse',
// 		name: 'Sign Up',
// 		key: 'sign-up',
// 		route: '/authentication/sign-up',
// 		// icon: <SpaceShip size="12px" />,
// 		component: <SignUp />,
// 		noCollapse: true
// 	}
// ];

// export default routes;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Register from '../Pages/Register';
import PageNotFound from '../Pages/PageNotFound';
import Test from '../Pages/test';

const logado = localStorage.getItem('@user');
console.log(logado);
const Rotas = () => {
	return (
		<BrowserRouter>
			<Routes>
				{logado && <Route path="/" exact element={<Dashboard />} />}
				{logado && <Route path="/test" exact element={<Test />} />}
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

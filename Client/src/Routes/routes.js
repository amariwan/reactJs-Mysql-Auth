import React from "react";
import { BrowserRouter, Route, Routes, swith } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import Register from "../Pages/Register";
import PageNotFound from "../Pages/PageNotFound.js";

const logado = localStorage.getItem('@user');
    
const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {logado && <Route path="/" exact element={<Dashboard />} />}
                {<Route path="*" component={<PageNotFound/>}/>}
                {!logado && <Route path="/" element={<Login logado={logado} />} />}
                {!logado && <Route path="/Register" element={<Register logado={logado} />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from '../pages/Login'
import Eventos from "../pages/Eventos";
import Navbar from "../components/NavBar";
import { isAuthenticated } from "../services/auth";
import Cadastrar from "../pages/Cadastrar";

const ProtectedRoute = ({ logged, children, redirect }) => {
    if (!logged) {
        return <Navigate to={redirect} replace />;
    }

    return children;
};

const Rotas = () => {
    console.log(isAuthenticated())
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>



                <Route
                    path="/"
                    element={<ProtectedRoute
                        logged={!isAuthenticated()}
                        children={<Login />}
                        redirect="/eventos"
                    />}

                />


                <Route
                    path="/eventos"
                    element={<ProtectedRoute logged={isAuthenticated()} children={<Eventos />}
                        redirect="/"
                    />}
                />



                <Route
                    path="/cadastrar"
                    element={<ProtectedRoute logged={isAuthenticated()} children={<Cadastrar />}
                        redirect="/"
                    />}
                />
            </Routes>




        </BrowserRouter>
    );
}

export default Rotas;



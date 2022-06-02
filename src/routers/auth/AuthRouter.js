import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthOverlay from "../../components/pages/auth/authOverlay";
import Login from "../../components/pages/auth/Login";
import Register from "../../components/pages/auth/Register";
import AccessStudent from "../../components/pages/auth/AccessStudent";

const AuthRouter = () => {
    return (
        <div style={{fontFamily: 'Gemunu Libre'}}>
            <AuthOverlay>
                <Routes>
                    <Route path={"/login/*"} element={ <Login/>}/>
                    <Route path={"/register/*"} element={<Register/>}/>
                    <Route path={"/accessstudent/*"} element={<AccessStudent/>}/>
                    <Route path={"*"} element={<Navigate to={"/auth/login"}/>}/>
                </Routes>
            </AuthOverlay>

        </div>
    );
};

export default AuthRouter;

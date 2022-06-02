import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import DashOverlay from "../../../components/other/DashOverlay";
import RouteRedirect from "../../../components/other/RouteRedirect";
import {useSelector} from "react-redux";
import InstitutionRegister from "../../../components/pages/home/admin/register/InstitutionRegister";
import Home from "../../../components/pages/home/user/Home";
import ManagementRouter from "./roles/ManagementRouter";
import AdminRouter from "./roles/AdminRouter";
import SuperSuRouter from "./roles/SuperSuRouter";

const DashRouter = () => {
    const whoAmI = useSelector(state => state.auth.whoAmi);
    const tieneInstitucion = () => whoAmI?.institucion?.id;
    const {esEstudiante, esProfesor, esAdministrador} = whoAmI.rol;
    const esAdmin = () => esAdministrador;
    const puedeManagement = () => esProfesor || esAdministrador;
    const esSuperSu = () => whoAmI.esSuperUsuario;
    return (
        <>
            <DashOverlay>
                <Routes>
                    <Route path={"/*"} element = {
                        <RouteRedirect condition={() => tieneInstitucion()} eject="/finish">
                            <Routes>
                                <Route path={"/"} element={<Home/>}/>
                                <Route path="/admin/*" element={<RouteRedirect eject="/" condition={esAdmin}><AdminRouter/></RouteRedirect>}></Route>
                                <Route path="/management/*" element={<RouteRedirect eject="/" condition={puedeManagement}><ManagementRouter/></RouteRedirect>}></Route>
                                <Route path="/root/*" element={<RouteRedirect eject="/" condition={esSuperSu}><SuperSuRouter/></RouteRedirect>}></Route>
                                <Route path="*" element={<Navigate to="/"/>}/>
                            </Routes>
                        </RouteRedirect>
                    }/>
                    <Route path="/finish" element={
                        <RouteRedirect condition={() => !tieneInstitucion()} eject="/">
                            <InstitutionRegister/>
                        </RouteRedirect>
                    }/>
                </Routes>
            </DashOverlay>

        </>
    );
};

export default DashRouter;

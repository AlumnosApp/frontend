import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import 'animate.css';
import {auth} from "../firebase/firebase-config";
import {startLogin} from "../store/actions/authActions";
import RouteRedirect from "../components/other/RouteRedirect";
import LoadingSpinner from "../components/other/LoadingSpinner";
import DashRouter from "./auth/dash/DashRouter";
import AuthRouter from "./auth/AuthRouter";

const AppRouter = () => {
    const [isLoadedAuthState, setIsLoadedAuthState] = useState(false);
    const {whoAmi} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isLoggedIn = () => whoAmi?.id;

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (isLoadedAuthState) return;
            if (user?.uid) await dispatch(startLogin(user))
            setIsLoadedAuthState(true);
        });
    }, []);
    if (!isLoadedAuthState) return <div className="d-flex align-items-center justify-content-center flex-column vw-100 vh-100"><LoadingSpinner/></div>
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<RouteRedirect condition={() => isLoggedIn()} eject="/auth/"><DashRouter/></RouteRedirect>}/>
                <Route path="/auth/*" element={<RouteRedirect condition={() => !isLoggedIn()} eject="/"><AuthRouter/></RouteRedirect>}/>
                <Route path="/accessstudent/*" element={<RouteRedirect condition={() => !isLoggedIn()} eject="/"><AuthRouter/></RouteRedirect>}/>
            </Routes>
        </BrowserRouter>

    );
};

export default AppRouter;

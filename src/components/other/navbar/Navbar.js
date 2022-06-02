import React from 'react';
import './style.css';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../../store/actions/authActions";


const Navbar = ({items, preUrl = "", url = true}) => {
    const {pathname} = useLocation();
    const {nombreCompleto} = useSelector(state => state.auth.whoAmi);
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(startLogout());
    }
    return (
        <nav className="navbar navbar-light navbar-expand-md navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid">
                <div className="container-fluid py-2 px-0">
                    {
                        url && (
                            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                <li className="breadcrumb-item text-sm"><span className="opacity-5 text-dark" >Inicio</span></li>
                                {pathname.split("/").map(x => x.replace(" ", "")).filter(x => x !== "").map(x => <li key={x} className="breadcrumb-item active"><span className="text-sm text-dark active">{x}</span></li>)}
                            </ol>
                        )
                    }

                    {items.map(item => <NavLink key={item.name} to={preUrl+item.path} className={`font-weight-bolder mb-0 nav-link`} style={{display: 'inline-flex'}}>{item.name}</NavLink>)}
                </div>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 w-100 justify-content-end" id="navbar">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item d-flex align-items-center" onClick={onLogout}>
                                <span className="nav-link text-body font-weight-bold px-0">
                                    <i className="fa-solid fa-arrow-right-from-bracket" style={{marginRight: '10px'}}></i>
                                    <span className="d-sm-inline d-none">{nombreCompleto}</span>
                                </span>
                            </li>

                        </ul>
                    </div>
            </div>
        </nav>

    );
};

export default Navbar;

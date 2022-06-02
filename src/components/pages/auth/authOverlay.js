import React from 'react';
import './style.css';
import bannerAuth from '../../../assets/img/bannerAuth.svg';
import logoConLetras from '../../../assets/img/LogoConLetras.svg';

const AuthOverlay = ({children}) => {
    return (
        <div className="container-fluid">
            <div className="row mh-100vh">
                <div className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0" id="login-block">
                    <div className="m-auto w-lg-75 w-xl-50">
                        <img  alt="" className="w-50" src={logoConLetras}/>
                        {children}
                        <p className="mt-3 mb-0 text-center"><a className="mainColorDark small" >¿Perdiste tu correo o tu contraseña?</a></p>
                    </div>
                </div>
                <div className="col-lg-6 d-flex align-items-end" id="bg-block" style={{backgroundImage: 'url("'+bannerAuth+'")', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
                </div>
            </div>
        </div>
    );
};

export default AuthOverlay;

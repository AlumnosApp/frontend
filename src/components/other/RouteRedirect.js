import React from 'react';
import {Navigate} from 'react-router-dom'

const RouteRedirect = ({children, eject, condition}) => {
    const condition1 = condition();
    return condition1 ? children : <Navigate to={eject}/>;
};

export default RouteRedirect;

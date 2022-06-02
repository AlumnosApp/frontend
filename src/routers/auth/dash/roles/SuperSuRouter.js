import React from 'react';
import {Route, Routes} from "react-router-dom";
import Config from "../../../../components/pages/home/superSu/Config";

const SuperSuRouter = () => {
    return (
        <Routes>
            <Route path={"config"} element = {<Config/>}>

            </Route>
        </Routes>
    );
};

export default SuperSuRouter;

import React from 'react';
import {Route, Routes} from "react-router-dom";
import Config from "../../../../components/pages/home/admin/Config";

const AdminRouter = () => {

    return (
        <Routes>
            <Route path={"config"} element = {<Config/>}>

            </Route>
        </Routes>
    );
};

export default AdminRouter;

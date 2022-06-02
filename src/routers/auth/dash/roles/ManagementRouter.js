import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "../../../../components/pages/home/management/Main";
import ModifyVotation from "../../../../components/pages/home/management/create/ModifyVotation";

const ManagementRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/votation/:votationId" element={<ModifyVotation/>}/>
        </Routes>
    );
};

export default ManagementRouter;

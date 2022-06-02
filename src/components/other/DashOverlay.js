import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import Navbar from "./navbar/Navbar";

const DashOverlay = ({children}) => {
    const  whoAmI = useSelector(state => state.auth.whoAmi);
    const {esEstudiante, esProfesor, esAdministrador} = whoAmI.rol
    const items = useMemo(() => {
        const items = [
            {name: 'Inicio', path: '/'}
        ];
        if (esAdministrador || esProfesor) {
            items.push({name: 'Administrar', path: '/management/'});
        }
        if (esAdministrador) {
            items.push({name: 'Configuracion', path: '/admin/config'});
        }
        if (whoAmI.esSuperUsuario) {
            items.push({name: 'Root', path: '/root/config'});
        }
        return items;
    }, [])

    return (
        <>
            <Navbar items={items} />
            {children}

        </>
    );
};

export default DashOverlay;

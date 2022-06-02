import React, {useCallback, useRef} from 'react';
import {ButtonItem, GroupItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {startLoginWithEmailAndPassword} from "../../../store/actions/authActions";
import {toast} from "react-hot-toast";
import CustomForm from "../../devextreme/CustomForm";


const Login = () => {
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        const {isValid, getData, get, instance, setData} = ref.current;
        if (!isValid()) return;
        const {correoElectronico, contraseña} = getData();
        toast.promise(dispatch(startLoginWithEmailAndPassword(correoElectronico, contraseña)), {
            loading: 'Iniciando sesión...',
            success: 'Sesión iniciada correctamente',
            error: e => 'Error al iniciar sesión: ' + e.message
        })
    }, [navigate]);

    const onClickSecondary = useCallback(() => {
        navigate('/auth/register');
    }, [navigate]);

    return (
        <>
            <h5 className="mainColorDark text-center mb-4">Iniciar sesión</h5>
           <CustomForm reference={ref} onEditorEnterKey={onSubmit}>
                <SimpleItem dataField="correoElectronico">
                    <RequiredRule message='El correo es necesaria'/>
                </SimpleItem>
                <SimpleItem dataField="contraseña" editorOptions={{mode: 'password'}}>
                    <RequiredRule message='La contraseña es necesaria'/>
                </SimpleItem>
               <GroupItem colCount={2}>
                   <ButtonItem horizontalAlignment={"right"} cssClass="p-1" buttonOptions={{text: "Iniciar sesión", type: "default", onClick: onSubmit}}/>
                   <ButtonItem horizontalAlignment={"left"} cssClass="p-1" buttonOptions={{text: "Registrarse", onClick: onClickSecondary}}/>
               </GroupItem>
           </CustomForm>
        </>
    );
};

export default Login;

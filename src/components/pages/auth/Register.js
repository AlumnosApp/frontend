import React, {useCallback, useRef} from 'react';
import {ButtonItem, EmailRule, GroupItem, RequiredRule, SimpleItem, StringLengthRule} from "devextreme-react/form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {startCreateUserWithEmailAndPassword} from "../../../store/actions/authActions";
import {toast} from "react-hot-toast";
import CustomForm from "../../devextreme/CustomForm";
import {getDs} from "../../../api/api-service";


const Register = () => {
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = useCallback(async () => {
        const {isValid, getData, get, instance, setData} = ref.current;
        if (!isValid()) return;
        const data = getData();
        toast.promise(dispatch(startCreateUserWithEmailAndPassword(data)), {
            loading: 'Registrando en VotaPoint...',
            success: 'Registro exitoso!',
            error: e => 'Error al registrar: '+e.message
        })
    }, [navigate]);

    const onClickSecondary = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    return (
        <>
            <h5 className="mainColorDark text-center mb-4">Registrarse</h5>
           <CustomForm reference={ref} onEditorEnterKey={onSubmit}>
               <GroupItem colCount={2}>
                   <SimpleItem dataField="nombre">
                       <RequiredRule message='El nombre es necesario'/>
                   </SimpleItem>
                   <SimpleItem dataField="apellido">
                       <RequiredRule message='El apellido es necesario'/>
                   </SimpleItem>
               </GroupItem>
               <SimpleItem dataField="correoElectronico">
                    <RequiredRule message='El correo es necesaria'/>
                   <EmailRule message='El correo no es válido'/>
                </SimpleItem>
               <SimpleItem dataField="contraseña" editorOptions={{mode: 'password'}}>
                   <RequiredRule message='La contraseña es necesaria'/>
               </SimpleItem>

               <GroupItem colCount={2}>
                   <SimpleItem dataField="identificacion">
                       <RequiredRule message='La identificación es necesaria'/>
                   </SimpleItem>
                   <SimpleItem dataField="fechaNacimiento" editorType="dxDateBox">
                       <RequiredRule message='La fecha de nacimiento es necesaria'/>
                   </SimpleItem>


                   <SimpleItem dataField="identificacionInstitucion">
                       <RequiredRule message='El codigo institucional es necesario.'/>
                       <StringLengthRule min={6} message='El codigo institucional debe tener 6 caracteres.'/>
                   </SimpleItem>

                   <SimpleItem dataField="generoId" editorType="dxSelectBox" colSpan={1} editorOptions={{
                       dataSource: getDs("genero"),
                       displayExpr: 'nombre',
                       valueExpr: 'id'
                   }}>
                       <RequiredRule message='El género es necesario'/>
                   </SimpleItem>
               </GroupItem>




               <GroupItem colCount={2}>
                   <ButtonItem horizontalAlignment={"right"} cssClass="p-1" buttonOptions={{text: "Registrarse", type: "default", onClick: onSubmit}}/>
                   <ButtonItem horizontalAlignment={"left"} cssClass="p-1" buttonOptions={{text: "Iniciar sesión", onClick: onClickSecondary}}/>
               </GroupItem>
           </CustomForm>
        </>
    );
};

export default Register;

import React, {useCallback, useRef} from 'react';
import CustomForm from "../../devextreme/CustomForm";
import {ButtonItem, EmailRule, GroupItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {getDsOptions} from "../../../api/api-service";
import {toast} from "react-hot-toast";
import {startCreateUserWithEmailAndPassword2} from "../../../store/actions/authActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const AccessStudent = () => {

    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = useCallback(async () => {
        const {isValid, getData, get, instance, setData} = ref.current;
        if (!isValid()) return;
        const {correoElectronico, codigoInstitucion} = getData();

        const [usuarioExistente] = await getDsOptions('usuario', {filter: ['correoElectronico', '=', `'${correoElectronico.toLowerCase().trim()}'`],}).load();
        if (!usuarioExistente) {
            toast.error('El correo electrónico no está registrado en el sistema, por favor reporte este error al administrador.');
            return;
        }
        if (usuarioExistente.uid) {
            toast.error('El correo electrónico ya está registrado en el sistema, por favor inicie sesión.');
            return;
        }

        await toast.promise(dispatch(startCreateUserWithEmailAndPassword2({correoElectronico, contraseña: codigoInstitucion, userSaved: usuarioExistente})), {
            loading: 'Registrando en VotaPoint...',
            success: 'Registro exitoso!',
            error: e => 'Error al registrar: '+e.message
        })
    }, []);

    const onClickSecondary = useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);


    return (
        <div>
            <h5 className="mainColorDark text-center mb-4">Registro como estudiante</h5>
            <CustomForm reference={ref}>
                <SimpleItem dataField="correoElectronico">
                    <RequiredRule message='El correo es necesario'/>
                    <EmailRule message='El correo no es válido'/>
                </SimpleItem>
                <SimpleItem dataField="codigoInstitucion" editorOptions={{mode: 'password'}}>
                    <RequiredRule message='El Codigo de Institucion es necesaria'/>
                </SimpleItem>

                <GroupItem colCount={2}>
                    <ButtonItem horizontalAlignment={"right"} cssClass="p-1" buttonOptions={{text: "Registrarse", type: "default", onClick: onSubmit}}/>
                    <ButtonItem horizontalAlignment={"left"} cssClass="p-1" buttonOptions={{text: "Iniciar sesión", onClick: onClickSecondary}}/>
                </GroupItem>

            </CustomForm>
        </div>
    );
};

export default AccessStudent;

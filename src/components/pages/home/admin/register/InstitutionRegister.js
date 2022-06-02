import React, {useRef} from 'react';
import PageOverlay from "../../../../other/PageOverlay";
import StoredForm from "../../../../devextreme/StoredForm";
import {getDs} from "../../../../../api/api-service";
import {RequiredRule, SimpleItem} from "devextreme-react/form";
import useWhoAmI from "../../../../../hooks/useWhoAmI";
import {useDispatch} from "react-redux";
import {refreshWhoAmI} from "../../../../../store/actions/authActions";

const InstitutionRegister = () => {
    const ref = useRef();
    const whoAmI = useWhoAmI();
    const dispatch = useDispatch();
    return (
        <>
            <PageOverlay title={"Finalizacion del registro"}>
                <p className="text-center mt-3">Por favor, para finalizar el registro, ingresa el nombre de la institucion a inscribir</p>
                <div className={"d-flex justify-content-center align-items-center flex-column mt-5"}>
                   <StoredForm store={getDs('institucion')} formReference={ref} onSubmit={ async ({data: id}) => {
                       await getDs('usuario').update(whoAmI.id, {institucionId: id});
                       await dispatch(refreshWhoAmI())
                   }}>
                       <SimpleItem dataField="nombre">
                           <RequiredRule message='El nombre es necesario.'/>
                       </SimpleItem>
                   </StoredForm>
                </div>
            </PageOverlay>

        </>
    );
};

export default InstitutionRegister;

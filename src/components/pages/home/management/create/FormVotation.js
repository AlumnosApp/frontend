import React, {useRef} from 'react';
import {GroupItem, RequiredRule, SimpleItem} from "devextreme-react/form";
import {getDs} from "../../../../../api/api-service";
import StoredForm from "../../../../devextreme/StoredForm";

const FormVotation = ({votationId, onSubmit}) => {
    const formRef = useRef(null);
    return (
        <>
        <StoredForm store={getDs('votacion')} defaultKey={votationId} formReference={formRef} onSubmit={onSubmit}>
            <GroupItem colCount={4}>
                <SimpleItem dataField='nombre'>
                    <RequiredRule message="El nombre es requerido"/>
                </SimpleItem>
                <SimpleItem dataField='fechaInicio'  editorType="dxDateBox" />
                <SimpleItem dataField='fechaFin'  editorType="dxDateBox" />
                <SimpleItem dataField='gestorId'  editorType="dxSelectBox" editorOptions={{
                    dataSource: getDs('usuario'),
                    displayExpr: (data) => data.nombre + ' ' + data.apellido,
                    valueExpr: 'id'
                }}/>
                <SimpleItem dataField='estadoId'  editorType="dxSelectBox" editorOptions={{
                    dataSource: getDs('estadovotacion'),
                    displayExpr: 'nombre',
                    valueExpr: 'id'
                }}/>
            </GroupItem>
        </StoredForm>
        </>
    );
};

export default FormVotation;

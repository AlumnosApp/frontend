import React from 'react';
import {Column, EmailRule, RequiredRule} from "devextreme-react/data-grid";

export const columnTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'date',
    Object: 'object',
    DateTime: 'datetime',
}

export const GridColumns = ({columns = []}) => {
    columns.push({dataField: 'createdAt', type: columnTypes.DateTime, name: "Fecha creación"})
    columns.push({dataField: 'updatedAt', type: columnTypes.DateTime, name: "Fecha modificación"})
    return columns?.map(({name, dataField, type, isRequired, isEmail, lookup}) => {
        if (lookup) lookup = {...{valueExpr: 'id', displayExpr: 'nombre'}, ...lookup}
        return <Column dataType={type} dataField={dataField} key={dataField} name={name ?? dataField} lookup={lookup} val editorOptions={{
            onInitialized: (e) => {
                if (isRequired) e.component.option('validationRules', [{type: 'required'}])
            }
        }}>
            {
                isRequired && <RequiredRule message={"¡El campo '"+dataField+"' es requerido!'"} />
            }
            {
                isEmail && <EmailRule message={"¡El campo '"+dataField+"' es una direction de correo invalida."} />
            }
        </Column>
    })
};

export default GridColumns;

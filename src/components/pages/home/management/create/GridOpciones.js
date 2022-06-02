import React from 'react';
import {getDs} from "../../../../../api/api-service";
import {columnTypes} from "../../../../devextreme/GridColumns";
import CustomDataGrid from "../../../../devextreme/CustomDataGrid";
import {Row} from "react-bootstrap";
import ConfigurationItem from "../../../../other/ConfigurationItem";

const GridOpciones = ({selectedVotacion}) => {
    return (
        <CustomDataGrid
            autoExpand={true}
            masterDetail={MasterDetail}
            onNewRowDefaults={{
                votacionId: selectedVotacion?.id
            }}
            dataSource={{
                store: getDs('opcion'),
                filter: [['votacionId', '=', selectedVotacion?.id], 'and', ['opcionPadreId', 'is', null]]
            }}
            columns={[
                {dataField: 'id', type: columnTypes.Number,},
                {dataField: 'nombre', type: columnTypes.String, isRequired: true},
                {dataField: 'detalle', type: columnTypes.String},
            ]}
        />
    );
};

const MasterDetail = ({data}) => {
    return <Row>

        <ConfigurationItem disableAutoTitle={true} size={"col-sm-6"} name={"Opciones de "+data.data.nombre}>
            <CustomDataGrid
                customProps={{
                    defaultSearchPanel: undefined,
                    columnChooser: undefined,
                }}
                onNewRowDefaults={{
                    opcionPadreId: data.data.id,
                    votacionId: data.data.votacionId
                }}
                dataSource={{
                    store: getDs('opcion'),
                    filter: ['opcionPadreId', '=', data.data.id]
                }}
                columns={[
                    {dataField: 'id', type: columnTypes.Number,},
                    {dataField: 'nombre', type: columnTypes.String, isRequired: true},
                    {dataField: 'detalle', type: columnTypes.String},
                ]}
            />
        </ConfigurationItem>

        <ConfigurationItem disableAutoTitle={true} size={"col-sm-6"} name={"Votos recibidos para "+data.data.nombre}>
            <CustomDataGrid
                allowDeleting={false}
                allowEditing={false}
                allowAdding={false}
                customProps={{
                    defaultSearchPanel: undefined,
                }}
                onNewRowDefaults={{
                    opcionPadreId: data.data.id,
                    votacionId: data.data.votacionId
                }}
                dataSource={{
                    store: getDs('voto'),
                    filter: ['opcionId', '=', data.data.id]
                }}
                columns={[
                    {dataField: 'id', type: columnTypes.Number,},
                    {dataField: 'votanteId', type: columnTypes.String, lookup: {
                        dataSource: getDs('usuario'),
                        displayExpr: (data) => data.nombre + " " + data.apellido
                    }},
                ]}
            />
        </ConfigurationItem>

    </Row>
}

export default GridOpciones;

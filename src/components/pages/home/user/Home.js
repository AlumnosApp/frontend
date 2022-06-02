import React, {useCallback, useState} from 'react';
import CustomDataGrid from "../../../devextreme/CustomDataGrid";
import {getDs, getDsOptions} from "../../../../api/api-service";
import PageOverlay from "../../../other/PageOverlay";
import {columnTypes} from "../../../devextreme/GridColumns";
import useWhoAmI from "../../../../hooks/useWhoAmI";
import useApiFetch from "../../../../hooks/useApiFetch";
import LoadingSpinner from "../../../other/LoadingSpinner";
import VotationInfo from "./votation/VotationInfo";

const Home = () => {
    const whoAmI = useWhoAmI();
    const [estadoVotacion, loading] = useApiFetch(getDsOptions('estadoVotacion', {filter: ['esAbierta', '=', true],}));
    const [selectedVotation, setSelectedVotation] = useState();
    const onSelectionChanged = useCallback((e) => setSelectedVotation(e.selectedRowsData[0]), [])
    if (loading) return <LoadingSpinner/>
    return (
        <PageOverlay title="Pagina de inicio">
            <CustomDataGrid
                editorMode={"row"}
                customProps={{
                    selection: {
                        mode: "single",
                    },
                    onSelectionChanged: onSelectionChanged
                }}

                dataSource={{
                    store: getDs('votacion'),
                    filter: [['institucionId', '=', whoAmI.institucionId], 'and', ['estadoId', '=', estadoVotacion.id]],
                }}
                allowAdding={false}
                allowDeleting={false}
                allowUpdating={false}
            columns={[
                {dataField: 'id', type: columnTypes.Number,},
                {dataField: 'nombre', type: columnTypes.String, isRequired: true},
                {dataField: 'fechaInicio', type: columnTypes.Date,},
                {dataField: 'fechaFin', type: columnTypes.Date,},
                {dataField: 'gestorId', lookup: {
                        dataSource: getDs('usuario'),
                        valueExpr: 'id',
                        displayExpr: (data) => data.nombre + ' ' + data.apellido
                }},
                {dataField: 'estadoId', lookup: {dataSource: getDs('estadovotacion')}},
            ]}/>

            {
                selectedVotation && (
                    <div className="col-sm-10 row d-flex align-items-center justify-content-center mt-5 mx-auto">
                        <VotationInfo selectedVotacion={selectedVotation}/>
                    </div>
                )
            }


        </PageOverlay>
    );
};

export default Home;

import React, {useCallback, useRef, useState} from 'react';
import {Row} from "react-bootstrap";
import CustomDataGrid from "../../../devextreme/CustomDataGrid";
import {getDs} from "../../../../api/api-service";
import ConfigurationItem from "../../../other/ConfigurationItem";
import PageOverlay from "../../../other/PageOverlay";
import {columnTypes} from "../../../devextreme/GridColumns";
import useWhoAmI from "../../../../hooks/useWhoAmI";
import ModifyVotation from "./create/ModifyVotation";

const Main = () => {
    const whoAmI = useWhoAmI();
    const gridRef = useRef();
    const [selectedVotacion, setSelectedVotacion] = useState();
    const onSelectionChanged = useCallback((e) => setSelectedVotacion(e.selectedRowsData[0]), [])
    return (
        <PageOverlay title="Administrar VotaPoint">
             <Row>
                 <ConfigurationItem size="col-sm-12" disableAutoTitle={true} name={"Votaciones en "+whoAmI.institucion.nombre}>
                     <CustomDataGrid
                         reference={gridRef}
                         editorMode={"row"}
                         customProps={{
                             selection: {
                                 mode: "single",
                             },
                             onSelectionChanged: onSelectionChanged
                         }}
                         onNewRowDefaults={{
                             institucionId: whoAmI.institucionId,
                         }}
                         dataSource={{
                             store: getDs('votacion'),
                             filter: ['institucionId', '=', whoAmI.institucionId]
                         }}
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
                 </ConfigurationItem>

             </Row>

            {
                selectedVotacion && (
                    <div className="col-sm-10 row d-flex align-items-center justify-content-center mt-5 mx-auto">
                        <ModifyVotation onSubmit={async () =>  await gridRef.current?.instance.refresh()} selectedVotacion={selectedVotacion}/>
                    </div>
                )
            }

        </PageOverlay>
    );
};

export default Main;

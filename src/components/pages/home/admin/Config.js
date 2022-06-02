import React from 'react';
import {Row} from "react-bootstrap";
import CustomDataGrid from "../../../devextreme/CustomDataGrid";
import {getDs} from "../../../../api/api-service";
import {columnTypes} from "../../../devextreme/GridColumns";
import ConfigurationItem from "../../../other/ConfigurationItem";
import Section from "../../../other/Section";
import PageOverlay from "../../../other/PageOverlay";
import useWhoAmI from "../../../../hooks/useWhoAmI";

const Config = () => {
    const whoAmI = useWhoAmI();
    return (
        <>
         <PageOverlay title={`Configuracion de la institucion: ${whoAmI.institucion.nombre}`}>
             <Section title={"Parametros de gestion"} topSeparation={true}>
                 <Row>
                     <ConfigurationItem name={"Usuarios"} size="col-sm-12">
                         <CustomDataGrid
                             customizeColumns={{
                                 uid: (column) => {
                                     column.visible = false;
                                     column.allowEditing = false;
                                 }
                             }}
                         onNewRowDefaults={{
                             institucionId: whoAmI.institucionId,
                         }} dataSource={{
                             store: getDs('usuario'),
                             filter: ['institucionId', '=', whoAmI.institucionId]
                         }}  columns={[
                            {dataField: 'id', type: columnTypes.Number,},
                            {dataField: 'uid', type: columnTypes.String,},
                            {dataField: 'correoElectronico', type: columnTypes.String, isEmail: true, isRequired: true,},
                            {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                            {dataField: 'apellido', type: columnTypes.String, isRequired: true,},
                            {dataField: 'fechaNacimiento', type: columnTypes.Date, isRequired: true,},
                             {dataField: 'identificacion', type: columnTypes.String, isRequired: true,},
                             {dataField: 'identificacionInstitucion', type: columnTypes.String, isRequired: true,},
                            {dataField: 'generoId', name: 'genero', lookup: {dataSource: getDs('genero'),isRequired: true,}},
                             {dataField: 'rolId', name: 'rol', lookup: {dataSource: getDs('rol'), isRequired: true,}},
                         ]}/>
                     </ConfigurationItem>
                 </Row>
             </Section>

         </PageOverlay>
        </>
    );
};

export default Config;

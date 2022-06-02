import React from 'react';
import {Row} from "react-bootstrap";
import CustomDataGrid from "../../../devextreme/CustomDataGrid";
import {getDs} from "../../../../api/api-service";
import {columnTypes} from "../../../devextreme/GridColumns";
import ConfigurationItem from "../../../other/ConfigurationItem";
import Section from "../../../other/Section";
import PageOverlay from "../../../other/PageOverlay";

const Config = () => {
    return (
        <>
         <PageOverlay title="Configuracion de VotaPoint">
             <Section title={"Parametros de gestion"} topSeparation={true}>
                 <Row>
                     <ConfigurationItem name={"Usuarios"} size="col-sm-12">
                         <CustomDataGrid dataSource={getDs('usuario')} customizeColumns={{
                             uid: (column) => {
                                 column.visible = false;
                                 column.allowEditing = false;
                             }
                         }} columns={[
                            {dataField: 'id', type: columnTypes.Number,},
                            {dataField: 'uid', type: columnTypes.String,},
                            {dataField: 'correoElectronico', type: columnTypes.String, isEmail: true, isRequired: true,},
                            {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                            {dataField: 'apellido', type: columnTypes.String, isRequired: true,},
                            {dataField: 'fechaNacimiento', type: columnTypes.Date, isRequired: true,},
                             {dataField: 'identificacion', type: columnTypes.String, isRequired: true,},
                            {dataField: 'identificacionInstitucion', type: columnTypes.String, isRequired: true,},
                            {dataField: 'generoId', name: 'genero', lookup: {dataSource: getDs('genero'),}},
                             {dataField: 'rolId', name: 'rol', lookup: {dataSource: getDs('rol'),}},
                             {dataField: 'institucionId', name: 'institucion', lookup: {dataSource: getDs('institucion'),}},
                         ]}/>
                     </ConfigurationItem>
                     <ConfigurationItem name={"Instituciones"} size="col-sm-6">
                         <CustomDataGrid dataSource={getDs('institucion')} columns={[
                             {dataField: 'id', type: columnTypes.Number,},
                             {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                             {dataField: 'esActivo', type: columnTypes.Boolean},
                         ]}/>
                     </ConfigurationItem>
                 </Row>
             </Section>
             <Section title={"Parametros de sistema"} >
             <Row>

                     <ConfigurationItem name={"Roles"} size="col-sm-6">
                         <CustomDataGrid dataSource={getDs('rol')} columns={[
                            {dataField: 'id', type: columnTypes.Number,},
                            {dataField: 'nombre', type: columnTypes.String,},
                            {dataField: 'esEstudiante', type: columnTypes.Boolean,},
                            {dataField: 'esProfesor', type: columnTypes.Boolean,},
                            {dataField: 'esAdministrador', type: columnTypes.Boolean,},
                        ]}/>
                     </ConfigurationItem>
                     <ConfigurationItem name={"Generos"} size="col-sm-6">
                         <CustomDataGrid dataSource={getDs('genero')} columns={[
                            {dataField: 'id', type: columnTypes.Number,},
                            {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                             {dataField: 'esHombre', type: columnTypes.Boolean},
                             {dataField: 'esMujer', type: columnTypes.Boolean},
                         ]}/>
                     </ConfigurationItem>
                 <ConfigurationItem name={"Estados de votacion"} size="col-sm-6">
                     <CustomDataGrid dataSource={getDs('estadovotacion')} columns={[
                         {dataField: 'id', type: columnTypes.Number,},
                         {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                         {dataField: 'esAbierta', type: columnTypes.Boolean},
                         {dataField: 'esCerrada', type: columnTypes.Boolean},
                     ]}/>
                 </ConfigurationItem>

                 <ConfigurationItem name={"Tipos de calendarios"} size="col-sm-6">
                     <CustomDataGrid dataSource={getDs('tipocalendario')} columns={[
                         {dataField: 'id', type: columnTypes.Number,},
                         {dataField: 'nombre', type: columnTypes.String, isRequired: true,},
                         {dataField: 'esTipoA', type: columnTypes.Boolean},
                         {dataField: 'esTipoB', type: columnTypes.Boolean},
                     ]}/>
                 </ConfigurationItem>

             </Row>
         </Section>

         </PageOverlay>
        </>
    );
};

export default Config;

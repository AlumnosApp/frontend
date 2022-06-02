import React, {useCallback, useContext, useEffect, useState} from 'react';
import Section from "../../../../other/Section";
import {getDs, getDsOptions} from "../../../../../api/api-service";
import {columnTypes} from "../../../../devextreme/GridColumns";
import CustomDataGrid from "../../../../devextreme/CustomDataGrid";
import {Row} from "react-bootstrap";
import ConfigurationItem from "../../../../other/ConfigurationItem";
import useApiFetch from "../../../../../hooks/useApiFetch";
import LoadingSpinner from "../../../../other/LoadingSpinner";
import {Button} from "devextreme-react/button";
import useWhoAmI from "../../../../../hooks/useWhoAmI";
import {toast} from "react-hot-toast";

const VoteContext = React.createContext("VoteContext");

const VotationInfo = ({selectedVotacion}) => {
    const votationSate = useState(false);
    const whoAmI = useWhoAmI();
    const [voto, loading] = useApiFetch(getDsOptions('voto', {filter: [['votanteId' , '=', whoAmI.id], 'and', ['votacionId', '=', selectedVotacion.id]],}));
    useEffect(() => {
        if (!loading) votationSate[1](voto !== undefined);
    }, [voto]);
    if (loading) return <div className="d-flex align-items-center justify-content-center"><LoadingSpinner/></div>
    return (
        <VoteContext.Provider value={votationSate}>
            <Section topSeparation={true} title={"Votacion para: "+selectedVotacion.nombre}>
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
            </Section>
        </VoteContext.Provider>
    );
};

const MasterDetail = ({data}) => {
    const [cantidad, loading] = useApiFetch(getDsOptions('opcion', {filter:  ['opcionPadreId', '=', data.data.id]}), false);
    const whoAmI = useWhoAmI();
    const [vote, setVote] = useContext(VoteContext);
    const onClick = useCallback(
        async () => {
           const store = getDs('voto');
           await toast.promise(store.insert({
               opcionId: data.data.id,
               votanteId: whoAmI.id,
               votacionId: data.data.votacionId
           }), {
               loading: 'Registrando voto...',
               success: 'Voto registrado con éxito',
               error: 'Error al registrar voto'
           })
            setVote(true);
        }, []);

    if (loading) return <div className="d-flex align-items-center justify-content-center"><LoadingSpinner/></div>
    return <Row className="d-flex align-items-center justify-content-center">

        {
            cantidad.length > 0  && (
                <ConfigurationItem disableAutoTitle={true} size={"col-sm-6"} name={"Opciones de "+data.data.nombre}>
                    <div className="mt-3">
                        <CustomDataGrid
                            allowDeleting={false}
                            allowUpdating={false}
                            allowAdding={false}
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
                    </div>
                </ConfigurationItem>

            )
        }

        <ConfigurationItem disableAutoTitle={true} size={"col-sm-6"} name={"Seleccionar opcion: "+data.data.nombre}>
            {
                vote ? (<h6>El voto ya fue registrado</h6>) : (<Button className={"mt-4"} text={"SELECCIONAR"} onClick={onClick}></Button>)
            }
        </ConfigurationItem>



    </Row>
}

export default VotationInfo;

import React from 'react';
import FormVotation from "./FormVotation";
import Section from "../../../../other/Section";
import GridOpciones from "./GridOpciones";

const ModifyVotation = ({selectedVotacion, onSubmit}) => {
    return (
        <>
            <Section title={"Informacion general:"} topSeparation={true}>
                <div className="px-5">
                    <FormVotation votationId={selectedVotacion?.id} onSubmit={onSubmit}/>
                </div>
            </Section>
            <Section title={"Opciones:"}>
                <GridOpciones selectedVotacion={selectedVotacion}/>
            </Section>
        </>

    );
};

export default ModifyVotation;

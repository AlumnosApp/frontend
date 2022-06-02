import React, {memo} from 'react';
import Form from "devextreme-react/form";
import {toast} from "react-hot-toast";

const setReference = (reference, instance) => {
    reference.current = ({
        instance: instance,
        getData: () => instance.option('formData'),
        setData: (data) => instance.option('formData', data),
        isValid: () => {
            const valid = instance.validate().isValid;
            if (valid) toast.success('Formulario valido');
            else toast.error('Formulario invalido');
            return valid
        },
        get: (key) => instance.getEditor(key),
    })
}

const CustomForm = ({children, reference, formOptions}) => {
    return (
        <Form {...formOptions}  onInitialized={({component: instance})  => {
            if (reference instanceof Array) reference.filter(x => x).forEach(ref => setReference(ref, instance));
            else setReference(reference, instance);
        }} >
            {children}
        </Form>
    );
};

export default memo(CustomForm);

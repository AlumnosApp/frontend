import React, {memo} from 'react';

const ConfigurationItem = ({children, name, size, disableAutoTitle = false, className, reference}) => {
    return (
        <div className={"d-flex d-inline flex-column justify-content-center align-items-center "+size+" "+className} ref={reference}>
            <div className="w-100">
                <h6 className="font-weight-normal mt-2 text-start" style={{marginBottom: "-10px"}}>{disableAutoTitle ? '' : 'Parametros de '}<strong>{name}:</strong> </h6>
            </div>
            <div className={"p-2"}>
                {children}
            </div>
        </div>
    );
};

export default memo(ConfigurationItem);

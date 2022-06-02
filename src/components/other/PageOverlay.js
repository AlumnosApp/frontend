import React from 'react';

const PageOverlay = ({title, children, className}) => {
    return (
        <div className={`animate__animated animate__zoomIn pt-4 ${className}`} style={{animationDuration: "0.1s",}}>
            <div className="container">
                <h5 className="text-center">{title}</h5>
                {children}
            </div>

        </div>
    );
};

export default PageOverlay;

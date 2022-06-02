import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="spinner-border " role="status" style={{margin: "auto"}}>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;

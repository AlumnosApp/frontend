import React from 'react';

const Section = ({title, children, topSeparation, type = "h5"}) => {
    return (
        <>
            {
                topSeparation && <hr style={{marginTop: "30px"}}/>
            }
            <div className={"row"}>
                <h6 className="font-weight-bold text-left">{title}</h6>
                <div className="px-5 pt-5">
                    {children}
                </div>

            </div>
            <hr style={{marginTop: "40px"}}/>
        </>


    );
};

export default Section;

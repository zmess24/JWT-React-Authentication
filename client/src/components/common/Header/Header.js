import React from 'react';

export default ({text}) => {
    return (
        <div className="row" style={{ marginTop: "25px" }}>
            <div className="column" style={{ textAlign: "center" }}>
                <h1>{text}</h1>
            </div>
        </div>
    )
};
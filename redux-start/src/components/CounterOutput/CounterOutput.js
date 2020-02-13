import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter: {props.value}
        <br/>
        State Counter : {props.st_value}
    </div>
);

export default counterOutput;
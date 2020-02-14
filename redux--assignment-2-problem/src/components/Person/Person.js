import React from 'react';

import './Person.css';

const person = (props) => (
    <div className="Person" onClick={props.clicked}>
        <h1>{props.name}</h1>
        <p>Age: {props.age}</p>
        <h2>{props.zzz}</h2>
    </div>
);

export default person;
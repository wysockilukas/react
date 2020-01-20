import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className = "userOutput">
            <p>{props.username}</p>
            <p onClick={props.click}>paragraph 2</p>
        </div>
    )
}

export default userOutput;


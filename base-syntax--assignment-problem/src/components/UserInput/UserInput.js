import React from 'react';

const userInput = (props) => {
    return (
        <div className = "userInput">
            <input type = "text" value = {props.username}
            onChange={props.changed}
            />
        </div>
    )
}

export default userInput;


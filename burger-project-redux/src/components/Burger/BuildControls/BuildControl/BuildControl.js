import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={ () => props.clickBtn(props.type,-1)   }>Less</button>
            {/* <button className={classes.Less} onClick={props.clickBtn   }>Less</button> */}


            <button className={classes.More} onClick={props.added}  >More</button>
        </div>
    );
}

export default buildControl;

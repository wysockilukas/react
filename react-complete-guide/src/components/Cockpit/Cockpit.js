import React from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {

    let btnClass = '';
    if (props.showperson) {
        btnClass = classes.Red;
    }

    const parClass = []
    if (props.personscnt <=2) {
      parClass.push(classes.red);
    }
    if (props.personscnt <=1) {
      parClass.push(classes.bold);
    }

    return  (
        <div className = {classes.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className = {parClass.join(' ')}>Zwykły paragraph</p>
            <button 
                className = {btnClass}
                onClick={props.clicked }>toggle Persons
          </button>            
        </div>
    )
};

export default cockpit;



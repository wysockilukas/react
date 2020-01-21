import React from 'react';
import Radium from 'radium';  //radoum to doatkowa bibliotek zeby byl hoover effect
import  './Person.css';  



//! Ten component jest stateless bo nie ma w nim żadnego zarządznia stanami
// Ten kocomponent tylko otrzymuje dane 
//atrybut click wystepuje w app.js w wywołaniu elementu Person
const person = (props)  => {
return (
    <div className="Person">
        <p onClick={props.click}>I'm as {props.name} and I'm {Math.floor(Math.random()*60)} or {props.age} years old</p> 
        <p>{props.children}</p>
        {/* Ponizj mamy two-way binding */}
        <input type = "text" onChange={props.changed} value={props.name} />
    </div>
)
};

export default Radium(person);

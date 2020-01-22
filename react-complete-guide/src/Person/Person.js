import React from 'react';
import styled from 'styled-components';  //inna biblioteka do stylow
// import Radium from 'radium';  //radoum to doatkowa bibliotek zeby byl hoover effect
// import  './Person.css';  


//to zwraca react component
const StyledDiv =  styled.div`
width: 60%;
margin: 16px auto;
border: 1px solid #eee;
box-shadow: 0 2px 3px #ccc;
padding: 16px;
text-align: center;   
`   //div to metoda lub funkcja

//! Ten component jest stateless bo nie ma w nim żadnego zarządznia stanami
// Ten kocomponent tylko otrzymuje dane 
//atrybut click wystepuje w app.js w wywołaniu elementu Person
const person = (props)  => {
return (
    // <div className="Person">
    <StyledDiv>
        <p onClick={props.click}>I'm as {props.name} and I'm {Math.floor(Math.random()*60)} or {props.age} years old</p> 
        <p>{props.children}</p>
        {/* Ponizj mamy two-way binding */}
        <input type = "text" onChange={props.changed} value={props.name} />
    </StyledDiv>
)
};

export default person;

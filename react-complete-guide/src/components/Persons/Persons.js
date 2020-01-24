import React from 'react';
import Person from './Person/Person' ;  //musimy to zaimportowac bo dodajemy component  <Person> 

const persons = (props) =>    //nie ma { bo od rsazy jest return
    props.persons.map( (el,idx) =>{
        return (
            <Person 
            key={el.id}
            name={el.name} 
            age={el.age} 
            // click={this.deletePersonHandler.bind(this,idx)}
            click={() => props.clicked(idx)}
            changed ={(event) => props.changed(event, el.id)}
            />
        )
      });


export default persons;

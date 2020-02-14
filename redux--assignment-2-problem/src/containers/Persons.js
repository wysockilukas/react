import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    state = {
        test: ''
    }

    testChangeHandler = (event) => {
        this.setState({
            test: event.target.value
        } )
      }   

    render () {
        return (
            <div>
                {/* <AddPerson personAdded={this.personAddedHandler} /> */}
                
                <AddPerson personAdded={this.props.onAddPerson} testAdded={this.testChangeHandler}/>

                {/* <AddPerson personAdded={
                    () => {
                        console.log('AAA to ', arguments);
                        return this.props.onAddPerson(this.state.test)}
                    } testAdded={this.testChangeHandler}/> */}

                {/* { <AddPerson personAdded={
                    () => {
                        console.log('AAA to ', arguments);
                        return this.props.onAddPerson}
                    } /> } */}


                {this.props.storedPersons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        zzz={person.test}
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}


const mapStateToProps = zz => {
    return {
        storedPersons: zz.persons
    }
};

const mapDispatchToProps = fn => {
    return {
        onAddPerson: ( name, age, someValue) => fn({type: 'ADD_PERSON', test: someValue, name:name, age:age}),
        onDeletePerson: (someKey) => fn({type: 'DELETE_PERSON', key: someKey})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons) ;
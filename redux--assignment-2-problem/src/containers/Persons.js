import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                {/* <AddPerson personAdded={this.personAddedHandler} /> */}
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.storedPersons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
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
        onAddPerson: () => fn({type: 'ADD_PERSON'}),
        onDeletePerson: (someKey) => fn({type: 'DELETE_PERSON', key: someKey})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons) ;
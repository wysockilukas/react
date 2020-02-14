import React, { Component } from 'react';

import './AddPerson.css';


class AddPersons extends Component {

    state = {
        name: '',
        age: null
    }

    nameChangedHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    ageChangedHandler = (event) => {
        this.setState({
            age: event.target.value
        })
    }   

    render () {
        return (
            <div className="AddPerson">
            <input type="text" placeholder="Name" onChange={this.nameChangedHandler} value={this.state.name}/>
            <input type="number" placeholder="Age" onChange={this.ageChangedHandler}/>
            <input type="text" placeholder="test" onChange={this.props.testAdded}/>
            <button onClick={() =>this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        )
    }
}

export default AddPersons;
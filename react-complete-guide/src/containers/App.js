import React, {Component} from 'react';
import classes from './App.module.css';

//! Wazne Person to nasza nazwa komponentu, nie musi byćPerosn, ale powinnop być z dużej litery
// W React komponenty z małej litery są zarezerwowany na elemnty HTML

import Persons from '../components/Persons/Persons';  //Persons to nazwa komponentu = elementu html
import Cockpit from '../components/Cockpit/Cockpit';




class App extends Component {

  _self = this
  // Tworzymy state - state t- zarezerwowany słowo
  state = {
    persons: [
      {id:7,name:"Jan",age:"67"},
      {id:20,name:"Tomasz",age:"44"},
      {id:301,name:"Zosia"}
    ],
    otherState: 'some other state',
    showPersons: false,
  }


  nameChangeHandler = (event, id) => {
    const persIndex = this.state.persons.findIndex( p=> p.id === id)

    const clickdPersonObj = {...this.state.persons[persIndex]}  //tworzymy nowy obiekt, nie referencje

    clickdPersonObj.name = event.target.value;


    const perArr =[...this.state.persons ]; //robimy kopie tablicy state
    perArr[persIndex] = clickdPersonObj ;  //podmieniamy jeden element tablicy state, tym z nowa nazwa

    this.setState({
        persons: perArr
    } )
  }

  deletePersonHandler = (personIndex) => {
    // const perArr =this.state.persons  //! uwaga to jest pointer, wiec zamieniamy oryginalna tablicę
    const perArr =this.state.persons.slice()  //! Trik na slice powoduje ze dostajemy kopie tablicy
    // const perArr =[...this.state.persons ]//! tez kopia z uzyciem spread poperator es6

    perArr.splice(personIndex,1)  //usuwa z tablicy element o danym indexie
    this.setState({persons: perArr})
  }


  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }


  render() {  //jsx kompiluje się do kodu ponziej .. React.creatElement...

    let persons = null;
    let btnClass = [classes.Button];


    //mozemy tu uzyc ifa bo jestesmy w czec js, a nie jsx
    if (this.state.showPersons) {
      persons =( //przypiszemy do zmiennej prsons kod jsx
      <div>
        <Persons persons={this.state.persons} clicked = {this.deletePersonHandler}  changed = {this.nameChangeHandler} />
      </div>
      )
    }



    return (
      <div className={classes.App}>
        <Cockpit  clicked = {this.togglePersonsHandler} showperson = {this.state.showPersons} personscnt = {this.state.persons.length} />
         {persons}
      </div>      
    )
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Jakis tekst')) , ale zamiast tgo jest return i kod jsx = html
  }
}



export default App;  //to się nazywa higher order component



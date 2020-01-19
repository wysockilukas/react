import React, {Component} from 'react';
import './App.css';

//! Wazne Person to nasza nazwa komponentu, nie musi byćPerosn, ale powinnop być z dużej litery
// W React komponenty z małej litery są zarezerwowany na elemnty HTML
import Person from './Person/Person';  

class App extends Component {

  _self = this
  // Tworzymy state - state t- zarezerwowany słowo
  state = {
    persons: [
      {name:"Jan",age:"67"},
      {name:"Tomasz",age:"44"},
      {name:"Zosia"}
    ]
  }

  switchNameHandler = (newName) => {
    console.log("klilniety", this.state);
    console.log("self ", this._self);
    console.log("this ", this);

    //this.state.persons[0] = "Pola"; to nie dzaiała
    this.setState({
      persons: [
        {name:newName,age:"11"},
        {name:"Tomasz",age:"44"},
        {name:"Zosia"}
      ]
    } )
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        {name:"Jan",age:"11"},
        {name: event.target.value,age:"44"},
        {name:"Zosia"}
      ]
    } )
  }


  render() {  //jsx kompiluje się do kodu ponziej .. React.creatElement...
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }
    return (
      <div className="App">
        <p>Hi, I'm a React App</p>
        <p>Zwykły paragraph</p>
        {/* <button onClick={this.switchNameHandler.bind(this, "Pola")}>switch</button> */}
        <button 
          style = {style}
          onClick={() => this.switchNameHandler("Pola") }>switch</button>
        <Person 
          name={this.state.persons[0].name} 
          age ={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age ={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this, "You !!!")}
          changed = {this.nameChangeHandler}
          ><p>Hobby: racing</p></Person>
        <Person 
          name={this.state.persons[2].name} 
          age ={this.state.persons[2].age} />
      </div>      
    )
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Jakis tekst')) 
  }
}

/*
function App() {
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
    </div>
  );
}
*/
export default App;

import React, {Component} from 'react';
import classes from './App.module.css';

//! Wazne Person to nasza nazwa komponentu, nie musi byćPerosn, ale powinnop być z dużej litery
// W React komponenty z małej litery są zarezerwowany na elemnty HTML
import Person from '../components/Persons/Person/Person';  
import ErrorBoundary from '../components/ErrorNoundary/ErrorBoundary';




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
          {this.state.persons.map( (el,idx) =>{
            return (
            <ErrorBoundary key={el.id}>
                <Person 
                name={el.name} 
                age={el.age} 
                // click={this.deletePersonHandler.bind(this,idx)}
                click={() => this.deletePersonHandler(idx)}
                changed ={(event) => this.nameChangeHandler(event, el.id)}
                />
              </ErrorBoundary>
            )
          })}
      </div>
      )
      btnClass.push(classes.Red);

    }



    const parClass = []
    if (this.state.persons.length <=2) {
      parClass.push(classes.red);
    }
    if (this.state.persons.length <=1) {
      parClass.push(classes.bold);
    }

 

    return (
      <div className={classes.App}>
        <p>Hi, I'm a React App</p>
        <p className = {parClass.join(' ')}>Zwykły paragraph</p>
        {/* <button onClick={this.switchNameHandler.bind(this, "Pola")}>switch</button> */}
        <button 
        className = {btnClass.join(' ')}
          // onClick={() => this.switchNameHandler("Pola") }>switch
          onClick={this.togglePersonsHandler }>toggle Persons
          </button>

         {/* persons pzrechowuje kod JSX */}
         {persons}


            {/* {    this.state.showPersons ?     //React.createElement() tak jalkbysmy wywolywaliu ta metode
            <div>
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
            </div> : null
            } */}

      </div>      
    )
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Jakis tekst')) , ale zamiast tgo jest return i kod jsx = html
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


export default App;  //to się nazywa higher order component



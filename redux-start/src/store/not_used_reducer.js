
import * as actionTypes from './actions';

const initialState = {
    counter: 42,
    results: []
}


// Reducer
const reducer = (state = initialState, action) => {


    if (action.type===actionTypes.INCREMENT) {
        //nigdy nie modyfikujemy oryginalnego statu
        const newState = Object.assign({}, state);  // Uwaga to nie jest deep copy bo do array dalej jest referencja
        newState.counter = state.counter +1;
        return newState
    }
    if (action.type===actionTypes.DECREMENT) {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter - 1
        }
    }    
    if (action.type===actionTypes.ADD) {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter  + action.value
        }
    } 
    if (action.type===actionTypes.SUBSTRACT) {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter - action.payload.value
        }
    }     
 
    if (action.type===actionTypes.STORE_RESULT) {
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            results:  state.results.concat({ id: new Date(),  value:state.counter })    //to jest jak push ale zwraca nowa tablice
        }
    }      
 
    if (action.type===actionTypes.DELETE_RESULT) {
        
        //state.results.splice(id,1) ale tego nie wykorzystamy bo to mutate nasz state 

        // uwaga do tego ponziej
        // teoretcznie tworzymy kopie tablicy, ale jest to głebkoka kopia tylko wtedy kiedy tablica pzrechowuje wartosci
        // ale jesli jest to tablica obiektow, to pzrechowuje  referencje do obiektow
        // w naszym przypadku mozemy teo uzyc bo chcemy usunac elemetn tablicy, czyli referencje
        // ale gdbbysmy chceli zmienic jaki property obieektu w tablicy to zmienilisbysmy rowniez propert oryginalnego obiektu
        // const id = 2;
        // const newArra = [...state.results];
        // newArra.splice(id,1);


       // const newArray = state.results.filter( (el) => true)   filter zwraca nowa tablice
       const newArray = state.results.filter( (el) => el.id !==action.keyId )  //zwraca te elemtny ktore maja id inne niz pzrekazany =klikniety
        // console.log(newArray);
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            results:  newArray
        }
    }    
    return state;
}

export default reducer;
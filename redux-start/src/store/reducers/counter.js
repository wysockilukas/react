
import * as actionTypes from '../actions/actions';

const initialState = {
    counter: 42
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
        // console.log('aa1 ', action);
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter  + action.value
        }
    } 
    if (action.type===actionTypes.SUBSTRACT) {
        // console.log('aa ', action);
        return {
            ...state,  //nigdy nie modyfikujemy oryginalnego statu
            counter: state.counter - action.payload.value
        }
    }     
   
    return state;
}

export default reducer;
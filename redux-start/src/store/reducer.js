
const initialState = {
    counter: 42
}


// Reducer
const reducer = (state = initialState, action) => {


    // if (action.type==='INC_COUNTER') {
    //     return {
    //         ...state,  //nigdy nie modyfikujemy oryginalnego statu
    //         counter: state.counter +1
    //     }
    // }
    // if (action.type==='ADD_COUNTER') {
    //     return {
    //         ...state,  //nigdy nie modyfikujemy oryginalnego statu
    //         counter: state.counter + action.value
    //     }
    // }    
    return state;
}

export default reducer;
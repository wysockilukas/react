

const initialState = {
    persons: []
}


// Reducer
const reducer = (state = initialState, action) => {

    // console.log('Jestem tu ', state);
    if (action.type ==='ADD_PERSON') {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: (Math.floor( Math.random() * 800 ) +100).toString().split('').map( l => String.fromCharCode(65 + ( +l )) ).join(''),
            age: Math.floor( Math.random() * 40 )
        }
        const newState = state.persons.concat(newPerson)
        // console.log('new state to ', newState);
        return {
            persons: newState
        }
    }

    if (action.type ==='DELETE_PERSON') {
        // console.log('Byl klik dla ', action.key);
        // console.log('---');
        // console.log('Stary state to ', state.persons);
        const newPersons = state.persons.filter( (el) => (el.id !== action.key) );
        return {
            persons: newPersons
        }
        // console.log('Nowy state to ', newPersons);
    }


    return state;
}

export default reducer;
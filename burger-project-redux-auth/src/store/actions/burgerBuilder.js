
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const  add_ingredient = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: value
    }
}

export const  remove_ingredient = (value) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: value
    }
}


//! Uwaga ponizej uzywamy redux think (np ten dispatch)
 const setIngredients = (ingred) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingred
    }
}

 const fetch_ing_fails =() =>{
     console.log('Cos sie nie udalo')
    return {
        type: actionTypes.FETCH_INGRED_FAILS
    }
}

export const  initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-11471.firebaseio.com/ingredients.json')
            .then( res => {
                dispatch(setIngredients(res.data))
            }).catch(err => {
                dispatch(fetch_ing_fails())
            })        
    };
}

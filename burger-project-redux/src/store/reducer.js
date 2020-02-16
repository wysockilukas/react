import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const ingredient_prices = {
    salad: 0.5,
    bacon: 1.2,
    cheese: 1,
    meat: 0.8
}


const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.ADD_INGREDIENT) {

        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]:  state.ingredients[[action.ingredientName]] + 1     //ta składnia sprawia ze nazwe property moze byc ze zmienej 
            },
            totalPrice: state.totalPrice + ingredient_prices[action.ingredientName]
        }
    }

    if (action.type === actionTypes.REMOVE_INGREDIENT) {

        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: (state.ingredients[[action.ingredientName]] > 0) ? state.ingredients[[action.ingredientName]]  - 1  : 0    //ta składnia sprawia ze nazwe property moze byc ze zmienej 
            },
            totalPrice: state.totalPrice - ingredient_prices[action.ingredientName]
        }
    }   

    return state;

};

export default reducer;
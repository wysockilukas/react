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

const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.ADD_INGREDIENT) {

        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]:  state.ingredients[[action.ingredientName]] + 1     //ta składnia sprawia ze nazwe property moze byc ze zmienej 
            }
        }
    }

    if (action.type === actionTypes.REMOVE_INGREDIENT) {

        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: (state.ingredients[[action.ingredientName]] > 0) ? state.ingredients[[action.ingredientName]]  - 1  : 0    //ta składnia sprawia ze nazwe property moze byc ze zmienej 
            }
        }
    }   

    return state;

};

export default reducer;
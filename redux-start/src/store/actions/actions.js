export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBSTRACT = 'SUBSTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';



export const increment = () => {
    return {
        type: INCREMENT,
    }
}

export const decrement = () => {
    return {
        type: DECREMENT,
    }
}

export const add = (value) => {
    return {
        type: ADD,
        value: value
    }
}

export const substract = (payload) => {
    // console.log('pp ', payload.payload.value)
    return {
        type: SUBSTRACT,
        payload: {value: payload.payload.value}
    }
}

export const store_result = (inVal) => {
    return {
        type: STORE_RESULT,
        result: inVal
    }
}

export const delete_result = (keyVal) => {
    return {
        type: DELETE_RESULT,
        keyId: keyVal
    }
}
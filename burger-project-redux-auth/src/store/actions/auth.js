import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
        // authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};



// to trzyma asyncgrniczny kod ktory roi autentykacje
export const auth = (email, password, isSignup) => {
// export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            // email: "user@example.com",
            email: email,
            // password: "PASSWORD",
            password:  password,
            returnSecureToken:true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDO8-48sgWbtLBrwdoewA9WptvfugAuMz4';
        // url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDO8-48sgWbtLBrwdoewA9WptvfugAuMz4';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDO8-48sgWbtLBrwdoewA9WptvfugAuMz4';
        }

        // console.log('wyslemy', authData);
        axios.post(url, authData)
            .then(response => {
                // console.log('response', response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log('err', err);
                dispatch(authFail(err.response.data.error));
            });
    };
};
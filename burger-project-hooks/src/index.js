import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';


import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
}); 

/*
const logger = (store) => {
    return (next) =>  {
        return (action) => {
            console.log('[Middleware ]', action);
            const result = next(action);
            console.log('[Middleware next state]', store.getState());
            return result;
        }
    }
};

const store = createStore(reducer, applyMiddleware(logger) );
*/

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// thunk jest po to zeby redux dzialal asynchronicznie

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


// ReactDOM.render( <BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
ReactDOM.render( app, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

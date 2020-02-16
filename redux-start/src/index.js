import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';


// ta funckja sluzy do laczenia dwoch plikow z reducerami w jeden
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
});



//to nasz middlewear

const logger = (store) =>{
    return (next) => {
        return (action) => {
            console.log('Middleware action ', action);
            const result = next(action);
            console.log('Middleware next state ', store.getState());
            return result;
        }
    }
}


// const store = createStore(rootReducer , applyMiddleware(logger));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(logger,thunk)));



ReactDOM.render( <Provider store={store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();

// Provider to helper cmponent, ktory pozwala nam wlaczyć store do reacta


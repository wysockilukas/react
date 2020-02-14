import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

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

const store = createStore(rootReducer);


ReactDOM.render( <Provider store={store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();

// Provider to helper cmponent, ktory pozwala nam wlaczyć store do reacta


import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';


const store = createStore(reducer);

ReactDOM.render( <Provider store={store}><App /></Provider> , document.getElementById('root'));
registerServiceWorker();

// Provider to helper cmponent, ktory pozwala nam wlaczyć store do reacta
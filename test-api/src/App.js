import React from 'react';
import {BrowserRouter, Route, Switch, Link}  from 'react-router-dom';

import Page1 from './pages/Page1/Page1';
import Page2 from './pages/Page2/Page2';



import './App.css';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>
        <Switch>
            <Route exact path="/page1"   component = {Page1}    /> 
            <Route exact  path="/page2"   component = {Page2}    /> 
        </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;

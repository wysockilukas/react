import React from 'react';
import {BrowserRouter, Route, Switch, Link}  from 'react-router-dom';

import Page1 from './pages/Page1/Page1';
import Page2 from './pages/Page2/Page2';
import Page3 from './pages/Page3/Page3';
import Page4 from './pages/Page4/Page4';



import './App.css';


// https://www.robinwieruch.de/react-hooks-fetch-data



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/page1">Simple</Link><br />
        <Link to="/page2">+error i spinner</Link><br />
        <Link to="/page3">custom hook</Link><br />
        <Link to="/page4">reducer</Link><br />
        <Switch>
            <Route exact path="/page1"   component = {Page1}    /> 
            <Route exact  path="/page2"   component = {Page2}    /> 
            <Route exact  path="/page3"   component = {Page3}    /> 
            <Route exact  path="/page4"   component = {Page4}    /> 
        </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;

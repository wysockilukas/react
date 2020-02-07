import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';


import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // Bedziemy mogli uzyc routingu we wszysktich komponentach, ktore sa dziecmi BrowserRouter
      <BrowserRouter basename="/posts">  
      <div className="App">
        <Blog />
      </div> 
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter, Route, Link,NavLink, Switch, Redirect}  from 'react-router-dom';



import Courses from './containers/Courses/Courses';
import Course from './containers/Course/Course';
import Users from './containers/Users/Users';

class App extends Component {
  render () {
    return (

    <React.Fragment>
      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
           <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
        </nav>
      <Switch>
        {/* <Route path="/courses/:id/:title"   component={Course}/> */}
        <Route path="/users"    component={Users}/>
        <Route path="/courses"   component={Courses}/>
        <Redirect from="/all-courses" to="/courses" />
        <Route render = { () => <h1>404</h1>} />
      </Switch>
      </BrowserRouter>


      <div className="App" style={{"display":"none"}}> 
        <ol style={{textAlign: 'left'}}>
          <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
          <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>Pass the course ID to the "Course" page and output it there</li>
          <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>Load the "Course" component as a nested component of "Courses"</li>
          <li>Add a 404 error page and render it for any unknown routes</li>
          <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
        </ol>
      </div>      
    </React.Fragment>


    );
  }
}

export default App;

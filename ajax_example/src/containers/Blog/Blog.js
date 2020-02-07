import React, { Component } from 'react';
// import axios from 'axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';


const AsyncNewPost = asyncComponent( () => {
    return import('./NewPost/NewPost');
});



class Blog extends Component {

    

    render () {



        // console.log('to ja' , this.props);


        return (
            <div className="Blog"> 
                <header>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName = "my-active"  exact to = "/posts">Home</NavLink></li>
                            <li><NavLink exact to ={
                                {
                                    pathname:  '/new-post',
                                    hash: '#submit',
                                    search: '?q=true'
                                }
                            }>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" render={ () => <h1>Home</h1>}/>  */}
                {/* <Route path="/" exact render={ () => <h1>Home</h1>}/>  */}
                <Switch>
                    <Route path="/new-post"   component = {AsyncNewPost}    /> 
                    <Route path="/posts"   component = {Posts}    /> 
                    {/* <Redirect from="/xyz" to="/" /> */}
                    <Route render = { () => <h1>404</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;
import React, { Component } from 'react';
// import axios from 'axios';
import {Route, NavLink, Switch} from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';


import './Blog.css';


class Blog extends Component {

    

    render () {



        // console.log('to ja' , this.props);


        return (
            <div className="Blog"> 
                <header>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName = "my-active"  exact to = "/">Home</NavLink></li>
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
                    <Route path="/" exact  component = {Posts}    /> 
                    <Route path="/new-post"   component = {NewPost}    /> 
                    <Route path="/:id" exact  component = {FullPost}    /> 
                </Switch>
            </div>
        );
    }
}

export default Blog;
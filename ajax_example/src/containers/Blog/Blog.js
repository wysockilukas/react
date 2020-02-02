import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import post from '../../components/Post/Post';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then( res => {
                const posts  = res.data.slice(0,4);
                const updatedPosts = posts.map( el => {
                    return {
                        ...el,
                        author: 'Max'
                    }
                })
                this.setState({posts:  updatedPosts});
            });
    }


    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }


    render () {

        const posts = this.state.posts.map( (el,idx) => {
            return <Post 
                key={el.id} 
                title={el.title} 
                author={el.author}
                clicked = { () =>  this.postSelectedHandler(el.id)}
                />
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
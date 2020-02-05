import React, { Component } from 'react'   ;
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';


class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        console.log('Jestem w componentDidMount');
        console.log(this.props);
        axios.get('/posts')
            .then( res => {
                const posts  = res.data.slice(0,4);
                const updatedPosts = posts.map( el => {
                    return {
                        ...el,
                        author: 'Max'
                    }
                })
                this.setState({posts:  updatedPosts});
            })
            .catch( err => {
                // this.setState({error:true});
            })
            ;
    }



    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }



    render () {

        let posts = <p style ={{textAlign:"center", color:"red", fontWeight:"bold"}}>Coś poszło nie tak</p>;
        if (!this.state.error) {
             posts = this.state.posts.map( (el,idx) => {
                return <Post 
                    key={el.id} 
                    title={el.title} 
                    author={el.author}
                    clicked = { () =>  this.postSelectedHandler(el.id)}
                    />
            })
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;



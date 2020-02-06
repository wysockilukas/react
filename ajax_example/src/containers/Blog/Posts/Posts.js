import React, { Component } from 'react'   ;
import axios from '../../../axios';
import { Link, Route} from 'react-router-dom';


import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
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
        // this.setState({selectedPostId:id});
        // this.props.history.push('/' + id) //przekierowanie 
    }



    render () {

        let posts = <p style ={{textAlign:"center", color:"red", fontWeight:"bold"}}>Coś poszło nie tak</p>;
        if (!this.state.error) {
             posts = this.state.posts.map( (el,idx) => {
                return  (
                    <Link key={el.id} to={"/posts/" + el.id} >
                        <Post 
                        title={el.title} 
                        author={el.author}
                        clicked = { () =>  this.postSelectedHandler(el.id)}
                        />
                    </Link>
                )
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* <Route path="/:id" exact  component = {FullPost}    />  */}
                
                <Route path= {this.props.match.url + '/:id'} exact  component = {FullPost}    /> 
            </div>
        )
    }
}

export default Posts;



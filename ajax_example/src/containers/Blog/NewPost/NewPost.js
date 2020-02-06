import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submited: null
    }

    componentDidMount() {
        console.log('Jestem w NewPost componentDidMount');
        console.log(this.props);;
    }

    postaDataHnadler = () => {
        axios.post('/posts', {
            title: this.state.title,
            body: this.state.content.anchor,
            author: this.state.author
        }).then( res => {
            console.log(res);
            // this.setState({submited:true})  
            this.props.history.push('/posts/');  // dodajemy to do adresu co wywołą redirect
        })

        
    }

    render () {

        let redirect = null;
        if (this.state.submited) {
            redirect = <Redirect to="/" />
        }


        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postaDataHnadler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
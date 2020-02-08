import React, { Component } from 'react';

class Course extends Component {
    render () {

        console.log(this.props);
        const title =  new URLSearchParams(this.props.location.search).get("qparam");
        console.log(title)
        return (
            <div>
                <h1>  {this.props.match.params.title} </h1>
                <h2>  {title} </h2>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;
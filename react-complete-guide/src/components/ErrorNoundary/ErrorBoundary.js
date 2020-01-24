import React, {Component} from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    }


    componentDidCatch = (error, info) => {
        this.setState({
            hasError:true,
            errorMessage: error
        })
    }


    render() {

        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children;
        }
    }
}

//uzyjemy tagu <ErrorBoundary> i w srodku cos, jak bexdzie ok to funkcja zwóci środek czly this.props.children, a jka blad t okomuniat o bledxzie


export default ErrorBoundary;

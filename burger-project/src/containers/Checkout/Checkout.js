import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1         
        }
    }

    componentDidMount() {
        console.log('Wstal Checkout', this.props);
        const recivedIngredients =  new URLSearchParams(this.props.location.search).get("ingredients");
        console.log('parametr to:', decodeURIComponent(recivedIngredients));
        this.setState({ingredients: JSON.parse(decodeURIComponent(recivedIngredients)) });
    }

    checkoutCancelledHandler = () => {
        // console.log(this.props);
        this.props.history.goBack();
    }
    

    checkoutContinuedHandler = () => {
        // console.log(this.props);
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    />
            </div>
        )
    }
};

export default Checkout;


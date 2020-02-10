import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../hoc/Layout/UI/Spinner/Spinner';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        jestZaladowany: false
    }

    componentDidMount() {
        // console.log('Wstal Checkout', this.props);
        const recivedIngredients =  new URLSearchParams(this.props.location.search).get("ingredients");
        const recivedTotalPrice =  new URLSearchParams(this.props.location.search).get("totalPrice");
        // console.log('parametr to:', decodeURIComponent(recivedIngredients));
        this.setState(
            {
                ingredients: JSON.parse(decodeURIComponent(recivedIngredients)) ,
                totalPrice: JSON.parse(decodeURIComponent(recivedTotalPrice)) 
            });
        console.log('Te parametry to:');
        console.log(JSON.parse(decodeURIComponent(recivedIngredients)));
        console.log(JSON.parse(decodeURIComponent(recivedTotalPrice)) );
        this.setState({jestZaladowany:true});
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

        let summar = <Spinner />;
        if (this.state.jestZaladowany) {
            summar = (
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />              
            )
        }

        return (
            <div>
                {summar}
                {/* <Route path="/checkout/contact-data" component = {ContactData}/> */}
                {/* ten rout na dole nie spowoduje ponownego renderowania komponetu na gorze czyli didmount nie wykona sie drugi raz */}
                {/* <Route path={this.props.match.path + '/contact-data'} component = {ContactData}/> */}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                     render = { (props) => <ContactData ingredients={this.state.ingredients} totalPrice ={this.state.totalPrice} {...props} />} 
                />
            </div>
        )
    }
};

export default Checkout;


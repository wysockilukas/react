import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactData from './ContactData/ContactData';
// import Spinner from '../../components/UI/Spinner/Spinner';


class Checkout extends Component {



    checkoutCancelledHandler = () => {
        // console.log(this.props);
        this.props.history.goBack();
    }
    

    checkoutContinuedHandler = () => {
        // console.log(this.props);
        this.props.history.replace('/checkout/contact-data');
    }



    render () {


         let   summar = (
                <CheckoutSummary 
                ingredients={this.props.reduxIngredients} 
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />              
            )
        

        return (
            <div>
                {summar}
                {/* <Route path="/checkout/contact-data" component = {ContactData}/> */}
                {/* ten rout na dole nie spowoduje ponownego renderowania komponetu na gorze czyli didmount nie wykona sie drugi raz */}
                {/* <Route path={this.props.match.path + '/contact-data'} component = {ContactData}/> */}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData}
                />
            </div>
        )
    }
};


const mapStateToProps = zz => {
    return {
        reduxIngredients: zz.ingredients
    }
};


export default connect(mapStateToProps)(Checkout);


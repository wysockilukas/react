import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// import * as actions from '../../store/actions/index';


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

            // console.log('asdsad', this.props.reduxIngredients)
         let summar =  <Redirect to="/" />   

          

         if (this.props.reduxIngredients) {
            //  console.log('Jeste tu');
            const purchasedRedirect = this.props.reduxpurchased ? <Redirect to="/"/> : null;
            summar = (
                <>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.reduxIngredients} 
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    /> 
                    
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData}
                    />
                </>
            )
         }

        return (
            <div>
                {summar}
                {/* <Route path="/checkout/contact-data" component = {ContactData}/> */}
                {/* ten rout na dole nie spowoduje ponownego renderowania komponetu na gorze czyli didmount nie wykona sie drugi raz */}
                {/* <Route path={this.props.match.path + '/contact-data'} component = {ContactData}/> */}
            </div>
        )
    }
};


const mapStateToProps = zz => {
    return {
        reduxIngredients: zz.burgerBuilder.ingredients,
        reduxpurchased: zz.order.purchased
    }
};


// const mapDispatchToProps = fn => {
//     return {
//         onInitPurchase:    () => fn( actions.purchaseInit()   ),
//     }
// }


export default connect(mapStateToProps)(Checkout);


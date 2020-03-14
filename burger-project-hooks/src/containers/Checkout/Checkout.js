import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// import * as actions from '../../store/actions/index';


import ContactData from './ContactData/ContactData';
// import Spinner from '../../components/UI/Spinner/Spinner';


const Checkout = props => {


    const checkoutCancelledHandler = () => {
        // console.log(this.props);
        props.history.goBack();
    }
    

    const checkoutContinuedHandler = () => {
        // console.log(this.props);
        props.history.replace('/checkout/contact-data');
    }




            // console.log('asdsad', this.props.reduxIngredients)
         let summar =  <Redirect to="/" />   

          

         if (props.reduxIngredients) {
            //  console.log('Jeste tu');
            const purchasedRedirect = props.reduxpurchased ? <Redirect to="/"/> : null;
            summar = (
                <>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={props.reduxIngredients} 
                    checkoutCancelled = {checkoutCancelledHandler}
                    checkoutContinued = {checkoutContinuedHandler}
                    /> 
                    
                    <Route 
                    path={props.match.path + '/contact-data'} 
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


import React, { useState, useEffect } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import BackDrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';


import * as actions from '../../store/actions/index';


/*
Ten komponent jest w folderze containers bo bedzie zareządzał stanami
*/
const ingredient_prices = {
    salad: 0.5,
    bacon: 1.2,
    cheese: 1,
    meat: 0.8
}
const BurgerBuilder = (props) => {


    
    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredients} = props;
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])



    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(!purchasing);
        } else {
            props.onSetRedirectPath('/checkout')
            props.history.push('/auth');
        }
    }



    const goToCheckout = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }



        let burger = props.reduxError ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // if (this.state.ingredients) {
        if (props.reduxIngredients) {
            burger = (
                <ReactAux>
                        {/* <Burger ingredients = {this.state.ingredients}/> */}
                        <Burger ingredients = {props.reduxIngredients}/>


                        <BuildControls 
                            // ingredientAdded={this.addIngredientHandler}
                            ingredientAdded={props.onAddIngredient}

                            // clickBtn={this.removeIngredientHandler}
                            clickBtn={props.onRemoveIngredient}

                            isAuth={props.isAuthenticated}

                            price={props.reduxTotalPrice}
                            orderClick={purchaseHandler}
                        />
                </ReactAux>
            );
        }

        let inModalEl = null;

        if (props.reduxIngredients) {
            inModalEl = <OrderSummary 
                            dane={props}  
                            prices={ingredient_prices} 
                            closeModal={purchaseHandler} 
                            // goBuy={this.purchaseContinueHandler} 
                            goBuy={goToCheckout} 
                        />;
        }

        // if (this.state.loading) {
        //     inModalEl = <Spinner /> ;
        // }


        return (
            <ReactAux>
                <Modal show={purchasing} modalClosed={purchaseHandler} > 
                {inModalEl}
                </Modal>
                {burger}
            </ReactAux>
        );

    
}


const mapStateToProps = zz => {
    return {
        reduxIngredients: zz.burgerBuilder.ingredients,
        reduxTotalPrice: zz.burgerBuilder.totalPrice,
        reduxError: zz.burgerBuilder.error,
        isAuthenticated: zz.auth.token !==null,
        // authRedirectPath: zz.auth.authRedirectPath
    }
};

const mapDispatchToProps = fn => {
    return {
        onAddIngredient:    (type) => fn( actions.add_ingredient(type)   ),
        onRemoveIngredient: (type) => fn(actions.remove_ingredient(type)),
        onInitIngredients: () => fn(actions.initIngredients()),
        onInitPurchase:    () => fn( actions.purchaseInit()   ),
        onSetRedirectPath: (path) => fn(actions.setAuthRedirectPath(path))
    }
}


// export default withErrorHandler( BurgerBuilder, axios );

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios )) ;
// export default connect(mapStateToProps, mapDispatchToProps)( BurgerBuilder) ;
export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)( BurgerBuilder) , axios);
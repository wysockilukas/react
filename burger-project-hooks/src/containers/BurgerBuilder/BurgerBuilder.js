import React, { Component } from 'react';
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
class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngredients()

        // console.log('Burger builder did mount i props to: ',  this.props);
        // axios.get('https://react-my-burger-11471.firebaseio.com/ingredients.json')
        //     .then( res => {
        //         this.setState({ingredients: res.data});
        //     }).catch(err => {
        //         this.setState({error: true})
        //     })
    }




    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: !this.state.purchasing});
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }



    goToCheckout = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {

        let burger = this.props.reduxError ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // if (this.state.ingredients) {
        if (this.props.reduxIngredients) {
            burger = (
                <ReactAux>
                        {/* <Burger ingredients = {this.state.ingredients}/> */}
                        <Burger ingredients = {this.props.reduxIngredients}/>


                        <BuildControls 
                            // ingredientAdded={this.addIngredientHandler}
                            ingredientAdded={this.props.onAddIngredient}

                            // clickBtn={this.removeIngredientHandler}
                            clickBtn={this.props.onRemoveIngredient}

                            isAuth={this.props.isAuthenticated}

                            price={this.props.reduxTotalPrice}
                            orderClick={this.purchaseHandler}
                        />
                </ReactAux>
            );
        }

        let inModalEl = null;

        if (this.props.reduxIngredients) {
            inModalEl = <OrderSummary 
                            dane={this.props}  
                            prices={ingredient_prices} 
                            closeModal={this.purchaseHandler} 
                            // goBuy={this.purchaseContinueHandler} 
                            goBuy={this.goToCheckout} 
                        />;
        }

        // if (this.state.loading) {
        //     inModalEl = <Spinner /> ;
        // }


        return (
            <ReactAux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler} > 
                {inModalEl}
                </Modal>
                {burger}
            </ReactAux>
        );

    }
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
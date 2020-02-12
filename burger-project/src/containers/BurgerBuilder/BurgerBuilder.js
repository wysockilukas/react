import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import BackDrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-11471.firebaseio.com/ingredients.json')
            .then( res => {
                this.setState({ingredients: res.data});
            }).catch(err => {
                this.setState({error: true})
            })
    }

    addIngredientHandler  = (type) => {
        const updatedCounted = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }; //w ten sposób robimy głęboką kopię obiektu 
        updatedIngredients[type] = updatedCounted;
        this.setState({
            totalPrice: ingredient_prices[type] + this.state.totalPrice,
            ingredients:updatedIngredients
        })

    };

    removeIngredientHandler = (type, change) => {
        if (this.state.ingredients[type] <=0) {
            return;
        }
        const updatedCounted =   this.state.ingredients[type] + change  ;
        const updatedIngredients = {
            ...this.state.ingredients
        }; //w ten sposób robimy głęboką kopię obiektu   
        updatedIngredients[type] = updatedCounted;
        this.setState({
            totalPrice: change * ingredient_prices[type] + this.state.totalPrice,
            ingredients:updatedIngredients
        })             
    }

    purchaseHandler = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true});
        // console.log('dalej');
        const orders = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Jan',
                address: {
                    stret: "test",
                    zipcode: "111"
                },
                email: 'test@test.com'

            },
            deliveryMethod: 'dron'
        };
        axios.post('/orders.json' , orders).then( res => {
            // console.log(res);
            this.setState({loading:false, purchasing : false});
        }).catch( err=> {
            console.log(err);
            this.setState({loading:false, purchasing : false});
        })

    }  ; 

    goToCheckout = () => {
        // console.log(this.props);
        const ingredientsToPass = JSON.stringify(this.state.ingredients);
        const totalPriceToPass = JSON.stringify(this.state.totalPrice);
        this.props.history.push('/checkout?ingredients=' + encodeURIComponent(ingredientsToPass) + "&totalPrice=" + encodeURIComponent(totalPriceToPass) );
        // this.props.history.push({
        //     pathname: '/checkout',
        //     // search: '?' + encodeURIComponent(ingredientsToPass)
        //     search: ingredientsToPass
        // })
    }

    render () {

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <ReactAux>
                        <Burger ingredients = {this.state.ingredients}/>
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            clickBtn={this.removeIngredientHandler}
                            price={this.state.totalPrice}
                            orderClick={this.purchaseHandler}
                        />
                </ReactAux>
            );
        }

        let inModalEl = null;

        if (this.state.ingredients) {
            inModalEl = <OrderSummary 
                            dane={this.state}  
                            prices={ingredient_prices} 
                            closeModal={this.purchaseHandler} 
                            // goBuy={this.purchaseContinueHandler} 
                            goBuy={this.goToCheckout} 
                        />;
        }

        if (this.state.loading) {
            inModalEl = <Spinner /> ;
        }


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

export default withErrorHandler( BurgerBuilder, axios );
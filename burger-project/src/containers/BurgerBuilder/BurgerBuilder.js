import React, { Component } from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../hoc/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BackDrop from '../../hoc/Layout/UI/Backdrop/Backdrop';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
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
            console.log(res);
        }).catch( err=> {
            console.log(err);
        })

    }   

    render () {
        return (
            <ReactAux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    clickBtn={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    orderClick={this.purchaseHandler}
                />
                <Modal show={this.state.purchasing}> 
                    <OrderSummary dane={this.state}  prices={ingredient_prices} closeModal={this.purchaseHandler} goBuy={this.purchaseContinueHandler} />
                </Modal>
                <BackDrop clicked={this.purchaseHandler} show={this.state.purchasing}/>
            </ReactAux>
        );

    }
}


export default BurgerBuilder;
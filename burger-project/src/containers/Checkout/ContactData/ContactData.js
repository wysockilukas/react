import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../hoc/Layout/UI/Button/Button';
import Spinner from '../../../hoc/Layout/UI/Spinner/Spinner';

import classes from './ContactData.module.css';



class ContactData extends Component {

    state ={
        name: '',
        email: '',
        address : {
            ulica: '',
            kodpocztowy:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.totalPrice);

        this.setState({loading:true});
        const orders = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
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
            this.setState({loading:false});
            this.props.history.replace('/');
        }).catch( err=> {
            console.log(err);
            this.setState({loading:false});
        })


    }

    render () {

        let form = (
            <form>
            <input className = {classes.Input} type="text" name ="name" placeholder="twoje imie" />
            <input className = {classes.Input} type="email" name ="email" placeholder="email" />
            <input className = {classes.Input} type="text" name ="ulica" placeholder="ulica" />
            <input className = {classes.Input} type="text" name ="kodpocztowy" placeholder="kod pocztowy" />
            <Button btnType="Success"  clicked={this.orderHandler}>Zamów</Button>
        </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Podaj dane</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;


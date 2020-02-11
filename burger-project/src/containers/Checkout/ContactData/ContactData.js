import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';



class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
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
            <Input elementType="input"   value=""  elementConfig={this.state.orderForm.name.elementConfig}/>
            <Input elementType="input"   value=""  elementConfig={this.state.orderForm.email.elementConfig}/>
            <Input elementType="input"   value="" elementConfig={this.state.orderForm.street.elementConfig}/>
            <Input elementType="input"   value="" elementConfig={this.state.orderForm.zipCode.elementConfig}/>
            <Input elementType="select"  value=""  elementConfig={this.state.orderForm.deliveryMethod.elementConfig}/>
            <Button btnType="Success"   value=""  clicked={this.orderHandler}>Zamów</Button>
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


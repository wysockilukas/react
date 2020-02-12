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
        // console.log(this.props.ingredients);
        // console.log(this.props.totalPrice);

        this.setState({loading:true});

        const formData = {};
        Object.keys(this.state.orderForm).forEach( name =>  {
            formData[name] = this.state.orderForm[name].value;
        }  );

        // console.log(formData);

        const orders = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm  //ten kolon nie jest gleboki bo biekt jest nested wiec zrobimy ten trik na tym co nam zwroci
        };
        const updatedOrderFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        // console.log(updatedOrderForm);
        this.setState({orderForm:updatedOrderForm});
    }

    render () {


        const formElementsArray = [];
        for (let key in  this.state.orderForm) {
                formElementsArray.push( {
                    id: key,
                    config: this.state.orderForm[key]
                } )
        }

        // Object.keys(this.state.orderForm).forEach( el => arr.push({...this.state.orderForm[el], name:el}));


        // console.log(formElementsArray);
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="input"   value=""  elementConfig={this.state.orderForm.name.elementConfig}/> */}
                {formElementsArray.map(el => (
                    <Input 
                        key={el.id} 
                        name ={el.id} 
                        elementType={el.config.elementType}  
                        value={el.config.value}  
                        elementConfig={el.config.elementConfig}
                        changed = {(event) => this.inputChangedHandler(event,el.id)}
                        />
                    ))}
                {/* <Button btnType="Success"   value=""  clicked={this.orderHandler}>Zamów</Button> */}
                <Button btnType="Success"   value=""  >Zamów</Button>
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


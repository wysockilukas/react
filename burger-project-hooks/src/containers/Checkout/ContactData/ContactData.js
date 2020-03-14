import React, { useState } from 'react';
// import axios from '../../../axios-orders';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

import {checkValidity} from '../../../shared/utility';


import classes from './ContactData.module.css';



const  ContactData = (props) => {

    const [orderForm, setOrderForm] = useState(
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght:6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid:true
            }
        }
    )

    const [formValid, setFormValid] = useState(false);




    const orderHandler = (event) => {
        event.preventDefault();
        // console.log(props.ingredients);
        // console.log(props.totalPrice);

        // let formIsValid = true
        const formData = {};
        Object.keys(orderForm).forEach( name =>  {
            formData[name] = orderForm[name].value;
            // if (!orderForm[name].valid) {
            //     formIsValid = false
            // }
        }  );



        // console.log(formData);
        // this.setState({loading:true});
        const orders = {
            ingredients: props.reduxIngredients,
            totalPrice: props.reduxTotalPrice,
            orderData: formData,
            userId: props.userId
        };
   
        props.onOrderBurger(orders, props.token);

    }




    const inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...orderForm  //ten klon nie jest gleboki bo biekt jest nested wiec zrobimy ten trik na tym co nam zwroci
        };
        const updatedOrderFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;


        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        // console.log(updatedOrderForm);

        let formIsValid = true;
        for (let k in updatedOrderForm) {
            if (updatedOrderForm[k].validation) {
                formIsValid = updatedOrderForm[k].valid && formIsValid ;
                // console.log('form valid for ', k, ' is ', formIsValid);
            }
        }

        setOrderForm(updatedOrderForm);
        setFormValid(formIsValid);

    }




        const formElementsArray = [];
        for (let key in  orderForm) {
                formElementsArray.push( {
                    id: key,
                    config: orderForm[key]
                } )
        }

        // Object.keys(orderForm).forEach( el => arr.push({...orderForm[el], name:el}));


        // console.log(formElementsArray);
        let form = (
            <form onSubmit={orderHandler}>
                {/* <Input elementType="input"   value=""  elementConfig={orderForm.name.elementConfig}/> */}
                {formElementsArray.map(el => (
                    <Input 
                        key={el.id} 
                        name ={el.id} 
                        elementType={el.config.elementType}  
                        value={el.config.value}  
                        elementConfig={el.config.elementConfig}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed = {(event) => inputChangedHandler(event,el.id)}
                        />
                    ))}
                {/* <Button btnType="Success"   value=""  clicked={this.orderHandler}>Zamów</Button> */}
                <Button  disabled = {!formValid} btnType="Success"   value=""  >Zamów</Button>
            </form>
        )

        if (props.reduxLoading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Podaj dane</h4>
                {form}
            </div>
        )
    
};



const mapStateToProps = zz => {
    return {
        reduxIngredients: zz.burgerBuilder.ingredients,
        reduxTotalPrice: zz.burgerBuilder.totalPrice,
        reduxLoading: zz.order.loading,
        token: zz.auth.token,
        userId: zz.auth.userId
    }
};

const mapDispatchToProps = fn => {
    return {
        onOrderBurger:    (orderData, token) => fn( actions.purchaseBurger(orderData, token)   ),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ContactData);


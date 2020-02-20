import React, {Component} from 'react';
import {connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email adres'
                },
                value: '',
                validation: {
                    required: true,
                    isMail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }            
        },
        formValid: false
    }


    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        Object.keys(this.state.controls).forEach( name =>  {
            formData[name] = this.state.controls[name].value;
        }  );
        
        console.log(formData);

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }


    checkValidity = (value, rules) => {
        if (Object.keys(rules).length === 0) return true;
        let isValid = false
        if (rules.required) {
           isValid = (value.trim() !=='') 
        }
        if (rules.minLenght) {
            isValid = (value.length >=rules.minLenght)
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.controls  //ten kolon nie jest gleboki bo biekt jest nested wiec zrobimy ten trik na tym co nam zwroci
        };
        const updatedOrderFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;


        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;


        let formIsValid = true;
        for (let k in updatedOrderForm) {
            if (updatedOrderForm[k].validation) {
                formIsValid = updatedOrderForm[k].valid && formIsValid ;
            }
        }

        
        this.setState({
            controls:updatedOrderForm,
            formValid: formIsValid
        });
    }
   

    render () {

        const formElementsArray = [];
        for (let key in  this.state.controls) {
                formElementsArray.push( {
                    id: key,
                    config: this.state.controls[key]
                } )
        }
        let form = (
            <form onSubmit={this.submitHandler}>
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
                        changed = {(event) => this.inputChangedHandler(event,el.id)}
                        />
                    ))}
                <Button  disabled = {!this.state.formValid} btnType="Success"   value=""  >Subbmit</Button>
            </form>
        )
 

        return (
            <div className = {classes.Auth} >
                {form}
            </div>
        )
    }
}


const mapDispatchToProps = fn => {
    return {
        onAuth: (email, password) => fn( actions.auth(email, password)  ),
    }
}


// export default Auth;

export default connect(null,mapDispatchToProps)(Auth);
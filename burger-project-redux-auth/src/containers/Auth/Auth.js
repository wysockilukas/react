import React, {Component} from 'react';
import {connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

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
        formValid: false,
        isSignUp : true
    }


    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        Object.keys(this.state.controls).forEach( name =>  {
            formData[name] = this.state.controls[name].value;
        }  );
        
        // console.log(formData);

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
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
   
    switchAuthModeHandler = () => {
        // this.setState({
        //     isSignUp: false
        // })
        // console.log('Klikam')
        this.setState( prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
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
 
        if (this.props.reduxLoading) {
            form = <Spinner />;
        }

        let errorMsg = null;
        if (this.props.reduxError) {
            errorMsg = (
                <p style={{color:"red"}}>
                    {this.props.reduxError.message} 
                    {/* <br /> */}
                    {/* {this.props.reduxError.errors[0].message}  */}
                    {/* {console.log(this.props.reduxError)} */}
                </p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        
        return (
            <div className = {classes.Auth} >
                {authRedirect}
                {errorMsg}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? 'Zaloguj się' : 'Załóż konto'} </Button>
            </div>
        )
    }
}


const mapStateToProps = zz => {
    return {
        reduxLoading: zz.auth.loading,
        reduxError: zz.auth.error,
        isAuthenticated: zz.auth.token !==null
    }
};


const mapDispatchToProps = fn => {
    return {
        onAuth: (email, password, isSignup) => fn( actions.auth(email, password, isSignup)  ),
    }
}


// export default Auth;

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
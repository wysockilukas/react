import React, {useState} from 'react';
import {connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';



const Auth = props => {

    const [controls, setControls] = useState({
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
    });

    const [formValid, setFormValid] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)


    const submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        Object.keys(controls).forEach( name =>  {
            formData[name] = controls[name].value;
        }  );
        
        // console.log(formData);

        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }


    const checkValidity = (value, rules) => {
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

    const inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...controls  //ten kolon nie jest gleboki bo biekt jest nested wiec zrobimy ten trik na tym co nam zwroci
        };
        const updatedOrderFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;


        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;


        let formIsValid = true;
        for (let k in updatedOrderForm) {
            if (updatedOrderForm[k].validation) {
                formIsValid = updatedOrderForm[k].valid && formIsValid ;
            }
        }

        setControls(updatedOrderForm);
        setFormValid(formIsValid);

    }
   
    const switchAuthModeHandler = () => {
        // this.setState({
        //     isSignUp: false
        // })
        // console.log('Klikam')

        setIsSignUp( !isSignUp);
    }

 

        const formElementsArray = [];
        for (let key in  controls) {
                formElementsArray.push( {
                    id: key,
                    config: controls[key]
                } )
        }
        let form = (
            <form onSubmit={submitHandler}>
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
                <Button  disabled = {!formValid} btnType="Success"   value=""  >Subbmit</Button>
            </form>
        )
 
        if (props.reduxLoading) {
            form = <Spinner />;
        }

        let errorMsg = null;
        if (props.reduxError) {
            errorMsg = (
                <p style={{color:"red"}}>
                    {props.reduxError.message} 
                    {/* <br /> */}
                    {/* {props.reduxError.errors[0].message}  */}
                    {/* {console.log(props.reduxError)} */}
                </p>
            )
        }

        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        
        return (
            <div className = {classes.Auth} >
                {authRedirect}
                {errorMsg}
                {form}
                <Button btnType="Danger" clicked={switchAuthModeHandler}>{isSignUp ? 'Zaloguj się' : 'Załóż konto'} </Button>
            </div>
        )
    
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
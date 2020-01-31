import React from 'react';
// import classes from './Modal.module.css';
import ReactAux from '../../../hoc/ReactAux';
import Button from '../../Layout/UI/Button/Button';





const orderSummary = (props) => {

    const ingred = Object.keys(props.dane.ingredients).map( (el, idx) =>{
        return (
         <li key={idx}><span style={{textTransform:'capitalize'}}>{el}</span>:   {props.dane.ingredients[el]} x {props.prices[el]}  = { props.dane.ingredients[el] * props.prices[el]  }  </li>
        )
    })

    console.log(props.totalPrice);
    return (
        <ReactAux>
            <h3>Twoje zamówienie</h3>
            <ul>
                {ingred}
            </ul>
            <p>Total: {props.dane.totalPrice.toFixed(2)}</p>
            <p><strong>Do kasy?</strong></p>
            <Button clicked={props.closeModal} btnType="Danger">Anuluj</Button>
            <Button clicked={props.closeModal} btnType="Success">Dalej</Button>
        </ReactAux>
    );
} 

export default orderSummary;

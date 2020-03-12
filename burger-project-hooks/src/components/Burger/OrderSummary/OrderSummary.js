import React from 'react';
// import classes from './Modal.module.css';
import ReactAux from '../../../hoc/ReactAux/ReactAux';
import Button from '../../../components/UI/Button/Button';
// import {Link} from 'react-router-dom';





const orderSummary = (props) => {

    // console.log('orderSummary ', props);

    const ingred = Object.keys(props.dane.reduxIngredients).map( (el, idx) =>{
        return (
        //  <li key={idx}><span style={{textTransform:'capitalize'}}>{el}</span>:   {props.dane.ingredients[el]} x {props.prices[el]}  = { props.dane.ingredients[el] * props.prices[el]  }  </li>
         <li key={idx}><span style={{textTransform:'capitalize'}}>{el}</span>:   {props.dane.reduxIngredients[el]}   = { props.dane.reduxIngredients[el]  }  </li>
        )
    })

    // console.log(props.totalPrice);
    return (
        <ReactAux>
            <h3>Twoje zamówienie</h3>
            <ul>
                {ingred}
            </ul>
            <p>Total: {props.dane.reduxTotalPrice.toFixed(2)}</p>
            <p><strong>Do kasy?</strong></p>
            <Button clicked={props.closeModal} btnType="Danger">Anuluj</Button>
            {/* <Link to="/checkout"> */}
                <Button clicked={props.goBuy} btnType="Success">Dalej</Button>
            {/* </Link> */}
        </ReactAux>
    );
} 

export default orderSummary;

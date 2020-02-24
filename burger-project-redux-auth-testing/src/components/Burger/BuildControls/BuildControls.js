import React from 'react';
import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const test = () => {
    console.log(1);
};



const buildControls = (props) => {

    const controlsComponents = controls.map( (el,idx) => {
        return (
            <BuildControl 
                key={idx} 
                label={el.label} 
                clicked={test}
                type = {el.type}
                added={ () =>  props.ingredientAdded(el.type)  }
                clickBtn = {props.clickBtn}
                // clickBtn = {() => props.clickBtn(el.type) }

            />
        )
    })
    


    return (
        <div className={classes.BuildControls}>
            <p>Cena całkowita to: <strong>{props.price.toFixed(2)}</strong></p>
            {controlsComponents}
            { 
                (
                    (props.isAuth) 
                        ? (props.price > 4) 
                            ? <button onClick={props.orderClick} className={classes.OrderButton}>ZAMÓW</button>
                            : <button disabled className={classes.OrderButton}>SKŁADNIKI</button> 
                        : <button onClick={props.orderClick}  className={classes.OrderButton}>ZALOGUJ SIĘ</button> 
                )
            }
            
        </div>
    );
} 

export default buildControls;


import React, { useCallback } from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

// ingredients to obiekt zawierajacy dodatek i ich ilość 
// ale cchemy zeby byl tablicą, bo wtedy będziemy mogli użyc funkcji map
const burger= (props) => {

    let arrIngredients = Object.keys(props.ingredients).map( igKey => {  // igKey np salad
        // return [...Array( props.ingredients[igKey]  )].map( (_,i) => {
        //     <BurgerIngredient key={igKey + i} type={igKey} />
        // } )
        // console.log([...Array( props.ingredients[igKey]  )]);
        let a = [...Array( props.ingredients[igKey]  )].map( (_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
        // console.log(a);
         return a;
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    // console.log(arrIngredients);

    if (arrIngredients.length ===0 ) {
        arrIngredients = <p>Dodaj jakies skladniki</p>
    }

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {arrIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
        
    );
};


export default withRouter(burger);

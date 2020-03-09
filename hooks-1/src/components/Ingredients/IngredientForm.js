import React, {useState} from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator'
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
   console.log('Jest props w form ', props);
  /*
  const [inputState, setInputState] = useState({
    title: '',
    amount: ''
  })
*/
  const [enteredTiitle, setEnteredTitle] = useState('');
  const [enteredValue, setEnteredValue] = useState('');



  const submitHandler = event => {
    event.preventDefault();
    // console.log('Jest submit');
    props.onAddIngred({
      title: enteredTiitle,
      amount: enteredValue
    })
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" 
              value={enteredTiitle} 
              onChange={ event => {setEnteredTitle( event.target.value )  } } 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" 
              value={enteredValue} 
              onChange={ event => { setEnteredValue(  event.target.value )  } }   
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
              {props.loading && <LoadingIndicator /> }
          </div>
              {console.log('Jest render w form ')}
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;























/*

import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  const [inputState, setInputState] = useState({
    title: '',
    amount: ''
  })


  const submitHandler = event => {
    event.preventDefault();
    console.log('Jest submit');
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" 
              value={inputState.title} 
              onChange={ event => {
                const newTitle = event.target.value;
                setInputState(  (prevInputState) => ({title:newTitle, amount:prevInputState.amount})  )   
              } } 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" 
              value={inputState.amount} 
              onChange={ event => {
                const newAmount = event.target.value;
                // setInputState(  (prevInputState) => ({amount:newAmount, title: prevInputState.title}))  
                setInputState(  (prevInputState) => ({ ...prevInputState,  amount:newAmount}))  
              } }   
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;




*/
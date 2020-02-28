import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);



/*
   //to sie odpala jak komponent sie wyrenderuje i dla kazdego cylu renderowania
   // to jest podobne do componentDidUpdate, jesli jesy wywolane bez dodatkwoego arguemntu - dependecnies
   // jesli jako drugi argiuemnt podamy [] pusta tablice to bedzie jak componetDidMount
  useEffect(  () => {
    axios.get('https://react-hooks-11471.firebaseio.com/ingredients.json')
      .then( res => {
          const fetchedData = Object.keys(res.data).map( key=> {
            return {
              id: key,
              title: res.data[key].title,
              amount: res.data[key].amount
            }
          })
        // console.log('Otrzymalem ', fetchedData);
        setIngredients(fetchedData);
      }).catch (err => {
        console.log('err', err);
      })

  }, [] );   

*/

  useEffect( () => {
    console.log('RENDERING INGREDIENTS',);
  }, [ingredients])  //uruchomi sie jak sie zmieniu ingredients


  // useCallback chodzi o to zeby ta funckjja nie zmieniala sie z kazdym cyklem render
  // bo jak sie zmienia to kompoment ktory ja otrzymuje  <search> mysli ze sie zmienia i eseEffect startuje
  const filteredIngredientHandler = useCallback( (ing) => {
    setIngredients(ing);
  },  []);

  const AddIngredientsHandler = (ing) => {

    axios.post('https://react-hooks-11471.firebaseio.com/ingredients.json',ing)
      .then( res => {
          // console.log('res', res);
          // setIngredients( prevIng => [...prevIng, {id: Math.random().toString(), ...ing}]     )
          setIngredients( prevIng => [...prevIng, {id: res.data.name, ...ing}]     )
      }).catch (err => {
        console.log('err', err);
      })


  }

  const RemoveItemHandler = (receivedId) => {

    /* Moje rowiazanie */
    // const newIngredients = ingredients.filter( el => el.id !== receivedId)
    // setIngredients( newIngredients );
    setIngredients( prevIng => prevIng.filter( el => el.id !== receivedId));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngred={AddIngredientsHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        <IngredientList ingredients ={ingredients}   onRemoveItem={ RemoveItemHandler  }/>
      </section>
    </div>
  );
}

export default Ingredients;

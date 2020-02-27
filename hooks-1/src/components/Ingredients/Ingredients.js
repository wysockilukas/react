import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const AddIngredientsHandler = (ing) => {
    setIngredients( prevIng => [...prevIng, {id: Math.random().toString(), ...ing}]     )
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
        <Search />
        <IngredientList ingredients ={ingredients}   onRemoveItem={ RemoveItemHandler  }/>
      </section>
    </div>
  );
}

export default Ingredients;

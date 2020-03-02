import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

import {getData, getData2} from '../../utils/fetchData';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pracownik, setPracownik] = useState('');
  const [error, setError] = useState();


  

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
    getData2().then(res => {
      console.log(res);
      setPracownik(res.rows[78].LAST_NAME);
    });
  }, []);

  useEffect( () => {
    console.log('RENDERING INGREDIENTS',);
  }, [ingredients])  //uruchomi sie jak sie zmieniu ingredients


  // useCallback chodzi o to zeby ta funckjja nie zmieniala sie z kazdym cyklem render
  // bo jak sie zmienia to kompoment ktory ja otrzymuje  <search> mysli ze sie zmienia i eseEffect startuje
  const filteredIngredientHandler = useCallback( (ing) => {
    setIngredients(ing);
  },  []);

  const AddIngredientsHandler = (ing) => {
    setIsLoading(true);
    axios.post('https://react-hooks-11471.firebaseio.com/ingredients.json',ing)
      .then( res => {
          // console.log('res', res);
          // setIngredients( prevIng => [...prevIng, {id: Math.random().toString(), ...ing}]     )
          setIngredients( prevIng => [...prevIng, {id: res.data.name, ...ing}]     )
          setIsLoading(false);
      }).catch (err => {
        // console.log('err', err);
        setError(err.message);
        setIsLoading(false);
      })


  }

  const RemoveItemHandler = (receivedId) => {
    setIsLoading(true);

    axios.delete(`https://react-hooks-11471.firebaseio.com/ingredients/${receivedId}.json`)
      .then( res => {
        setIngredients( prevIng => prevIng.filter( el => el.id !== receivedId));
        setIsLoading(false);

      }).catch (err => {
        //  console.log('err', err.message);
        //! jak w jednym bloku mamy dwa set... to sa uruchamiane razem i razem powoduje renedorwaie kompoinentu
        setError(err.message);
        setIsLoading(false);
      })

  

    /* Moje rowiazanie */
    // const newIngredients = ingredients.filter( el => el.id !== receivedId)
    // setIngredients( newIngredients );
  }

  const clearError = () => {
    setError(null); //jak zmieni sie state to renedruja sie strona i modal  z errorem nie wyskoczy
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngred={AddIngredientsHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        <IngredientList ingredients ={ingredients}   onRemoveItem={ RemoveItemHandler  }/>
      </section>
       <p>{pracownik}</p>
    </div>
  );
}

export default Ingredients;

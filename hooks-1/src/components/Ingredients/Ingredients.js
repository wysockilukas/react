import React, {useState, useEffect, useCallback, useReducer, useRef, useMemo} from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

import {getData, getData2, getAll} from '../../utils/fetchData';


// to jest poza glowna funckja , ale moze byc tez wewntarz jesli potrzebujemy propsy
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredients];
    case 'DELETE':
      return currentIngredients.filter( (el) => el.id !== action.ingredientId);
    default:
        throw new Error('Nie powiene tu dojsc');
  }
}

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {...httpState, isLoading:true};
    case 'RESPONSE':
      return {isLoading:false, error: null};
    case 'ERROR':
      return {isLoading:false, error: action.errorData};   
    default:
        throw new Error('Nie powiene tu dojsc');
  }
}




function Ingredients() {


  const [ingredients, dispatch] = useReducer(ingredientReducer, []);  //drugi parametr jest opcjonalny, to inicjlany stan, u nas pusta tablica
  const [httpState, dispatchHttp] = useReducer(httpReducer, {isLoading:false, error:null}); 
  const [test, setTest] = useState(null);

  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();


  // const [pracownik, setPracownik] = useState('');

  
 // reducer to funcke ktora biora jakis input i zwracaja output


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

  // useEffect( () => {
  //   getData2().then(res => {
  //     console.log(res);
  //     setPracownik(res.rows[78].LAST_NAME);
  //   });
  // }, []);

  useEffect( () => {
    console.log('RENDERING INGREDIENTS',);
  }, [ingredients])  //uruchomi sie jak sie zmieniu ingredients


  const fetchData = async () => {
    const cos = await getAll();
    setTest(cos);
  };
  

  useEffect(  () => {
    // const cos = await getAll();
    // console.log('Cos ', cos)
    fetchData();

  },[])  



  // useCallback chodzi o to zeby ta funckjja nie zmieniala sie z kazdym cyklem render
  // bo jak sie zmienia to kompoment ktory ja otrzymuje  <search> mysli ze sie zmienia i eseEffect startuje
  const filteredIngredientHandler = useCallback( (ing) => {
    // setIngredients(ing);
    dispatch({type: 'SET', ingredients:ing});
  },  []);

  const AddIngredientsHandler = useCallback((ing) => {
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    axios.post('https://react-hooks-11471.firebaseio.com/ingredients.json',ing)
      .then( res => {
          // console.log('res', res);
          // setIngredients( prevIng => [...prevIng, {id: Math.random().toString(), ...ing}]     )
          // setIngredients( prevIng => [...prevIng, {id: res.data.name, ...ing}]     )
          dispatch({type:'ADD', ingredients: {id: res.data.name, ...ing}});
          // setIsLoading(false);
          dispatchHttp({type:'RESPONSE'});

      }).catch (err => {
        // console.log('err', err);
        // setError(err.message);
        // setIsLoading(false);
        dispatchHttp({type:'ERROR', errorData:err.message});
      })


  } , []
)
  const RemoveItemHandler = useCallback((receivedId) => {
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    axios.delete(`https://react-hooks-11471.firebaseio.com/ingredients/${receivedId}.json`)
      .then( res => {
        // setIngredients( prevIng => prevIng.filter( el => el.id !== receivedId));
        dispatch({type:'DELETE', ingredientId: receivedId});
        // setIsLoading(false);
        dispatchHttp({type:'RESPONSE'});

      }).catch (err => {
        //  console.log('err', err.message);
        //! jak w jednym bloku mamy dwa set... to sa uruchamiane razem i razem powoduje renedorwaie kompoinentu
        // setError(err.message);
        // setIsLoading(false);
        dispatchHttp({type:'ERROR', errorData:err.message});
      })
    /* Moje rowiazanie */
    // const newIngredients = ingredients.filter( el => el.id !== receivedId)
    // setIngredients( newIngredients );
  }, [] );

  const clearError = useCallback(() => {
    // setError(null); //jak zmieni sie state to renedruja sie strona i modal  z errorem nie wyskoczy
    // setIsLoading(false);
    dispatchHttp({type:'RESPONSE'});
  }, []);

  // hook use memo spraw ze ta zmienna sie zmieni tylko wtedy gdy zmieni sie [ingredients,RemoveItemHandler]
  // a jak sie nie zmieni to ten kompoent nie bedzie renderowany
  // mozna tez bylo uzyc reactMemo na komponencie
  // to tez zoncza ze ta zmienna ingredientList nie bedzie jkalkulowana po przy kazdym renderowaniu komponentu, bo nie zawsze sie zmienia
  // my wskazujemy ze kiedy sie zmienia, czyli gdzy zmieni sie [ingredients,RemoveItemHandler] 
  const ingredientList =  useMemo( () => {
    return <IngredientList ingredients ={ingredients}   onRemoveItem={ RemoveItemHandler  }/>;
  }, [ingredients,RemoveItemHandler]);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngred={AddIngredientsHandler} loading={httpState.isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {ingredientList}
      </section>
       {/* <p>{pracownik}</p> */}
    </div>
  );
}

export default Ingredients;

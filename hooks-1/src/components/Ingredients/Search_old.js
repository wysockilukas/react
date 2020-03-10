import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [ eneteredFilter , setEneteredFilter] = useState('');
  const inputRef = useRef();

  //troche tai trik, bo ta funkcja uruchomi sie po kazdej zmiane w input, czyli nie musimy tam robic nalsuch na onchange
  useEffect( () =>{

  const timer=  setTimeout( () => {
      //jesli po 500 ms wpiosany tesk sie nie zmieni
      // console.log('eneteredFilter to ', eneteredFilter);
      // console.log('inputRef.current.value to ', inputRef.current.value);
      if (eneteredFilter===inputRef.current.value)  //to jest closuer wiec ten eneteredFilter jest wartoscia spzredd 5000 ms
        {
          const query =  eneteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${eneteredFilter}"`;
          axios.get('https://react-hooks-11471.firebaseio.com/ingredients.json' + query) 
            .then( res => {
                const fetchedData = Object.keys(res.data).map( key=> {
                  return {
                    id: key,
                    title: res.data[key].title,
                    amount: res.data[key].amount
                  }
                })
              onLoadIngredients(fetchedData);
       
            }).catch (err => {
              console.log('err', err);
            })
        }
    }, 1000)
    return  () => {
      clearTimeout(timer);
    };
  }, [eneteredFilter,onLoadIngredients,inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            ref = {inputRef}
            value = {eneteredFilter} 
            onChange={ event => {setEneteredFilter( event.target.value )  } } 
            />
        </div>
      </Card>
    </section>
  );
});

export default Search;

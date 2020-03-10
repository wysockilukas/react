import React, {useState} from 'react';


import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingIndicator from '../../components/UI/LoadingIndicator';

import {useDataApiReducer} from '../../helper/fetchData';






const Page4 = () => {
console.log('RENDERUJE PAGE 4')

const [query, setQuery] = useState('a');

  const [{ data, isLoading, isError }, doFetch] = useDataApiReducer('/api/a');


  const onChangeHandler = (event) => {
    setQuery(event.target.value)
  }

  const btnOnClickHandler = () => {
    doFetch(`/api/${query}`)
  }

    return (
        <React.Fragment>
          <SearchBar change={onChangeHandler} query={query} clicked={btnOnClickHandler}/>
          
          {isError && <div>Something went wrong ...</div>}

          { (isLoading || data === undefined) ? (
                <LoadingIndicator />
            ) : (          
                <ul>
                    {data.rows.map(item => (
                    <li key={item.EMPLOYEE_ID}>
                        <EmployeeCard dane={item}/>
                    </li>
                    ))}

                    {/* {console.log(data)}  
                    <li>A</li> */}
                </ul> 
            )}         
        </React.Fragment>
    )
}


export default Page4;
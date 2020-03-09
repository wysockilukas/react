import React, {useState, useEffect} from 'react';
import axios from 'axios';

import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingIndicator from '../../components/UI/LoadingIndicator';



const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          const result = await axios(url);
          setData(result.data.rows);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchData();
    }, [url]);
    return [{ data, isLoading, isError }, setUrl];
  }




const Page3 = () => {

const [query, setQuery] = useState('a');

  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://192.168.56.1:8080/ords/hr/hr/api/a', [] );


  const onChangeHandler = (event) => {
    setQuery(event.target.value)
  }

  const btnOnClickHandler = () => {
    doFetch(`http://192.168.56.1:8080/ords/hr/hr/api/${query}`)
  }

    return (
        <React.Fragment>
          <SearchBar change={onChangeHandler} query={query} clicked={btnOnClickHandler}/>
          
          {isError && <div>Something went wrong ...</div>}

          {isLoading ? (
                <LoadingIndicator />
            ) : (          
                <ul>
                    {data.map(item => (
                    <li key={item.EMPLOYEE_ID}>
                        <EmployeeCard dane={item}/>
                    </li>
                    ))}

                    {/* <li>A</li> */}
                </ul> 
            )}         
        </React.Fragment>
    )
}


export default Page3;
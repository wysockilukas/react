import React, {useState, useEffect} from 'react';
import axios from 'axios';

import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import SearchBar from '../../components/SearchBar/SearchBar';


const Page1 = () => {
const [data, setData] = useState([]);
const [query, setQuery] = useState('a');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://192.168.56.1:8080/ords/hr/hr/api/${query}`,
      );
      setData(result.data.rows);
    };
    fetchData();
    }, [query]);

  const onChangeHandler = (event) => {
    setQuery(event.target.value)
  }

    return (
        <React.Fragment>
          <SearchBar change={onChangeHandler} query={query}/>
            <ul>
                {data.map(item => (
                <li key={item.EMPLOYEE_ID}>
                    <EmployeeCard dane={item}/>
                    {/* {item.LAST_NAME}  {item.PHONE_NUMBER}  */}
                </li>
                ))}
            </ul>          
        </React.Fragment>
    )
}


export default Page1;
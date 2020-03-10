
import  {useState, useEffect, useReducer} from 'react';
import axios from './apex_instance';


export const useDataApi = (initialUrl, initialData) => {
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
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchData();
    }, [url]);
    return [{ data, isLoading, isError }, setUrl];
  }


  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

export   const useDataApiReducer = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
          dispatch({ type: 'FETCH_INIT' });
          try {
            const result = await axios(url);
            if (!didCancel) {
              dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            }
          } catch (error) {
            if (!didCancel) {
              dispatch({ type: 'FETCH_FAILURE' });
            }
          }
        };
        fetchData();
        return () => {
          didCancel = true;
        };
      }, [url]);
      return [state, setUrl];
    };
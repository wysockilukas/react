import { useState, useEffect } from 'react';



export default (axios) => {

    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
    const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });
    
    const {request,response} = axios.interceptors;
    useEffect( () => {
        return () => { //clean up function
            request.eject(reqInterceptor);
            response.eject(resInterceptor);
        }
    }, [reqInterceptor,resInterceptor, request, response])  ; 

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return[error, errorConfirmedHandler];
}



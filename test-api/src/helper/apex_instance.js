import axios from 'axios';

const instance = axios.create({
    baseURL: "http://192.168.56.1:8080/ords/hr/hr"
});

export default instance;
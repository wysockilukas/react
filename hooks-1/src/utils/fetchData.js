import axios from 'axios';


export async function getData() {
    /*
    let data ;
    await getProm().then( res => res.json()).then(resData => {data =resData} );
    */

    const res = await fetch('http://192.168.56.1:8080/ords/hr/hr/api/')
    const data = await res.json();
    // console.log('z funkckcji', data)
    return  data.rows[78].LAST_NAME;
}


export async function getData2() {
    let data ;
    await axios.get('http://192.168.56.1:8080/ords/hr/hr/api/')
        .then( res =>  {
            data= res.data
        })
        .catch(err => {console.log(err)})
    return data;
}






 const get = url =>
  new Promise(
    (resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(json => resolve(json))
    }
  )




  export const getAll = () =>
  get('http://192.168.56.1:8080/ords/hr/hr/api/')
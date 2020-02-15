import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res=>{
                // console.log(res.data)
                const fetchedOrders =[]
                for (let key in res.data) {
                    fetchedOrders.push(
                        {
                            ...res.data[key],
                            id: key
                        })
                }
                //  console.log(fetchedOrders);
                this.setState({
                    orders: fetchedOrders,
                    loading:false
                })
            })
            .catch( err=> {
                this.setState({
                    loading:false
                })
            });

        // console.log(this.state)
    }

    render () {
        return (
            <div>
                {this.state.orders.map( el => <Order key={el.id} ingredients={el.ingredients} price={el.totalPrice}/>)}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
// export default Orders;
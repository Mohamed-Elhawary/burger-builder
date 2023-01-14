import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        spinnerState: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for (let order in res.data) {
                fetchedOrders.push({
                    ...res.data[order],
                    id: order
                });
            }
            this.setState({spinnerState: false, orders: fetchedOrders});
            //console.log(fetchedOrders);
            //console.log(res.data)
        }).catch(err => {
            this.setState({spinnerState: true});
        });
    }

    render() {
        let orders = null;
        if(this.state.spinnerState) {
            orders = <Spinner/>
        } else {
            orders = this.state.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>
            }); 
        } 

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
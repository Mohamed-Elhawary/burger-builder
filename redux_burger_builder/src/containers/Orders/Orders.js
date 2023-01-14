import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    /* state = {
        orders: [],
        spinnerState: true
    } */

    /* componentDidMount() {
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
    } */

    componentDidMount() {
        this.props.initOrders(this.props.token, this.props.localId);
    }

    render() {
        let orders = null;
        if(this.props.spinnerState) {
            orders = <Spinner/>
        } else {
            orders = this.props.orders.map(order => {
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        spinnerState: state.order.loading,
        token: state.auth.idToken,
        localId: state.auth.localId,
        isAuth: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initOrders: (token, localId) => dispatch(actions.initOrders(token, localId))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
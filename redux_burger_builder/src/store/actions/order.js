import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
       .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
       }).catch(error => dispatch(purchaseBurgerFailed(error)));
    }
} 

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const setOrders = orders => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const initOrders = (token, localId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        let queryParams = `?auth=${token}&orderBy="userId"&equalTo="${localId}"`;
        axios.get('/orders.json' + queryParams).then(res => {
            const fetchedOrders = [];
            for (let order in res.data) {
                fetchedOrders.push({
                    ...res.data[order],
                    id: order
                });
            }
            dispatch(setOrders(fetchedOrders));
        }).catch(error => {
            fetchOrdersFailed(error);
        });
    }
}
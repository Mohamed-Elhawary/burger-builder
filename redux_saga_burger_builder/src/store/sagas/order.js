import * as actions from '../actions';
import axios from "../../axios";
import {put} from 'redux-saga/effects';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch(error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* initOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    try {
        let queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.localId}"`;
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let order in response.data) {
            fetchedOrders.push({
                ...response.data[order],
                id: order
            });
        }
        yield put(actions.setOrders(fetchedOrders));
    } catch(error) {
        yield put(actions.fetchOrdersFailed(error));
    }
}
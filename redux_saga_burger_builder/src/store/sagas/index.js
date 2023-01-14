import * as actionTypes from '../actions/actionTypes';
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeoutSaga, sendAuthSaga, checkAuthStateSaga} from "./auth";
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, initOrdersSaga} from "./order";


/*
The whole idea behind redux saga is to make sure your action creators are lean, that you don't run any side effects in there but instead you handle these side effects in your sagas.
You have one place where you have all the side effects and one place where you have all the actions, and then you don't mix that.
*/
export function* watchAuth() {
    // [all] method is an option if you want to run multiple generators or multiple tasks simultaneously.
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, sendAuthSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga),
    ]);
}

export function* wacthBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* wacthOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga); // [takesLatest] method will automatically cancel any ongoing excutions of purchaseBurgerSaga and execute the latest one, for example if the user hammers the purchase burger button multiple times, we maybe only always want to use the latest click.
    yield takeEvery(actionTypes.FETCH_ORDERS, initOrdersSaga);
}

import * as actions from '../actions';
import axios from 'axios';
import {put, delay, call} from 'redux-saga/effects';

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'idToken');
    yield call([localStorage, 'removeItem'], 'localId');
    yield call([localStorage, 'removeItem'], 'expiryDate');
    yield put({
        type: actions.logoutSucceed,
    });
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiryTime * 1000);
    yield put(actions.logout());
}

export function* sendAuthSaga(action) {
    yield put(actions.authStart());
        let authData = {
            email: action.email, 
            password: action.password, 
            returnSecureToken: true
        }
        let url;
        action.isSignup ? url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp' : url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'; 
        try {
            const response = yield axios.post(`${url}?key=AIzaSyDec1CilYi4UG8gU9dqUfm4SArinqWU5Wk`, authData);
            yield put(actions.authSuccess(response.data)); 
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
            yield localStorage.setItem('idToken', response.data.idToken);
            yield localStorage.setItem('localId', response.data.localId);
            yield localStorage.setItem('expiryDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
            console.log(response.data)
        } catch(error) {
            yield put(actions.authFailed(error.response.data.error)); 
            console.log(error.response.data.error);
        }
}

export function* checkAuthStateSaga() {
    const idToken = yield localStorage.getItem('idToken');
    const localId = yield localStorage.getItem('localId');
    if(!idToken && !localId) {
        yield put(actions.logout());
    } else {
        const expiryDate = yield new Date(localStorage.getItem('expiryDate'));
        if(expiryDate < new Date()) {
            yield put(actions.logout());
        } else {
            yield put(actions.authSuccess({idToken, localId}));
            yield put(actions.checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
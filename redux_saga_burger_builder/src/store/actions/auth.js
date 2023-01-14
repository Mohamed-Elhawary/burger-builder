import * as actionTypes from './actionTypes';
// import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: {
            idToken: authData.idToken,
            localId: authData.localId
        }
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    //localStorage.removeItem('idToken');
    //localStorage.removeItem('localId');
    //localStorage.removeItem('expiryDate');
    return {
        // type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expiryTime) => {
    /* return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryTime * 1000);
    } */
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expiryTime: expiryTime,
    }
}

export const sendAuth = (email, password, isSignup) => {
    /* return dispatch => {
        dispatch(authStart());
        let authData = {
            email, password, returnSecureToken: true
        }
        let url;
        isSignup ? url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp' : url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'; 
        axios.post(`${url}?key=AIzaSyDec1CilYi4UG8gU9dqUfm4SArinqWU5Wk`, authData)
        .then(response => {
            dispatch(authSuccess(response.data)); 
            dispatch(checkAuthTimeout(response.data.expiresIn));
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('localId', response.data.localId);
            localStorage.setItem('expiryDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
            console.log(response.data)
        })
        .catch(error => {dispatch(authFailed(error.response.data.error)); console.log(error.response.data.error)});
    } */
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignup,
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    }
}
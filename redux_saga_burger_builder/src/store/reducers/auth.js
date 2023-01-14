import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    error: false,
    loading: false,
    idToken: null,
    localId: null,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.AUTH_START): return updateObject(state, {loading: true});
        case(actionTypes.AUTH_SUCCESS): return updateObject(state, {idToken: action.authData.idToken, localId: action.authData.localId, loading: false});
        case(actionTypes.AUTH_FAILED): return updateObject(state, {loading: false, error: action.error});
        case(actionTypes.AUTH_LOGOUT): return updateObject(state, {idToken: null, localId: null});  
        case(actionTypes.SET_AUTH_REDIRECT_PATH): return updateObject(state, {authRedirectPath: action.path});      
        default: return state;
    }
};

export default authReducer;
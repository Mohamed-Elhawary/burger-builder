import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            error: false,
            loading: false,
            idToken: null,
            localId: null,
            authRedirectPath: '/'
        });
    });

    it('should store the token after login', () => {
        expect(authReducer({
            error: false,
            loading: false,
            idToken: null,
            localId: null,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            authData: {
                idToken: "token",
                localId: "id"
            }
        })).toEqual({
            error: false,
            loading: false,
            idToken: "token",
            localId: "id",
            authRedirectPath: '/'
        });
    });
});
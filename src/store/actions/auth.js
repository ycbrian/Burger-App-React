import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-Erc6zFKhTr73yURB0ilTlEvbI2t7heI';
        if (!isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-Erc6zFKhTr73yURB0ilTlEvbI2t7heI';
        axios.post(url , authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err=>{
                console.log(err.response);
                dispatch(authFail(err.response.data.error));
            })
    };
}

export const AuthRedirPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
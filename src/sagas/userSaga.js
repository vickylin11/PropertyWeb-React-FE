import { call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const api = process.env.REACT_APP_API;

function* signUp({ payload, meta }) {
    try {
        const newUser = yield call([axios, axios.post], `${api}/user`, {
            'email': payload.user.email,
            'password': btoa(payload.user.password),
            'firstName': payload.user.first_name,
            'lastName': payload.user.last_name,
            'type': "client"
        });
        yield put({type: 'SIGN_UP_SUCCESS', payload: newUser.data});
        yield call(meta.history.push, '/property');
    } catch (e) {
        yield put({type: 'SIGN_UP_FAILURE', payload: e.response.data? e.response.data.message : e.message});
    }
}

function* signUpWatcher() {
    yield takeLatest('SIGN_UP', signUp);
}

function* signOut( { payload }) {
    try {
        yield call([axios, axios.post], `${api}/user/logout/${payload}`);
        yield put({type: 'SIGN_OUT_SUCCESS'});
    } catch (e) {
        yield put({type: 'SIGN_OUT_FAILURE', payload: e});
    }
}

function* signOutWatcher() {
    yield takeLatest('SIGN_OUT', signOut);
}

function* login({ payload, meta }) {
    try{
        let params = new URLSearchParams();
        params.append('email', payload.user.email );
        params.append('token', btoa(payload.user.password));
        const user = yield call([axios, axios.post], `${api}/user/login`, params);
        yield put({type: 'LOGIN_SUCCESS', payload: user});
        yield call(meta.history.push, '/property');
    } catch (e) {
        yield put({type: 'LOGIN_FAILURE', payload: e.response.data? e.response.data.message : e.message });
    }
}

function* loginWatcher() {
    yield takeEvery('LOGIN', login);
}

export default [
    fork(signUpWatcher),
    fork(signOutWatcher),
    fork(loginWatcher)
];
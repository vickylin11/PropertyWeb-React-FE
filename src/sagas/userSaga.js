import { call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const api = "http://localhost:8080";


function* signUp({ payload }) {
    try {
        const newUser = yield call([axios, axios.post], `${api}/user`, {
            'email': payload.email,
            'password': btoa(payload.password),
            'firstName': payload.first_name,
            'lastName': payload.last_name,
            'type': "client"
        });
        yield put({type: 'SIGN_UP_SUCCESS', payload: newUser.data});
    } catch (e) {
        yield put({type: 'SIGN_UP_FAILURE', payload: e});
    }
}

function* signUpWatcher() {
    yield takeLatest('SIGN_UP', signUp);
}

function* signOut(id) {
    try {
        yield call([axios, axios.post], `${api}/user/logout`, {
            'id': id
        });
        yield put({type: 'SIGN_OUT_SUCCESS'});
    } catch (e) {
        yield put({type: 'SIGN_OUT_FAILURE', payload: e});
    }
}

function* signOutWatcher() {
    yield takeLatest('SIGN_OUT', signOut);
}

export default [
    fork(signUpWatcher),
    fork(signOutWatcher)
];
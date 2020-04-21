import { call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const api = "http://localhost:8080";

function* sendUserRequest({ payload }) {
    try {
        const newRequest = yield call([axios, axios.post], `${api}/request`, {
            'title': payload.title,
            'content': payload.content,
            'userId': payload.userId
        });
        yield put({type: 'SEND_REQUEST_SUCCESS', payload: newRequest.data});
    } catch (e) {
        yield put({type: 'SEND_REQUEST_FAILURE', payload: e.response.data? e.response.data.message : e.message});
    }
}

function* sendRequestWatcher() {
    yield takeLatest('SEND_REQUEST', sendUserRequest);
}

function* fetchAllRequests({ payload } ) {
    try {
        const requestList = yield call([axios, axios.get], `${api}/request`, {
            params: {
                'size': 10,
                ...(payload ? {'page': payload.page} : {'page' : 0})
            },
            headers: {
                'user_type': "admin"
            }
            });
        yield put({type: 'GET_ALL_REQUESTS_SUCCESS', payload: requestList});
    } catch (e) {
        yield put({type: 'GET_ALL_REQUESTS_FAILURE', payload: e});
    }
}

function* getAllRequestWatcher() {
    yield takeLatest('GET_ALL_REQUESTS', fetchAllRequests);
}

function* fetchMyRequests({ payload }) {
    try {
        const myRequestList = yield call([axios, axios.get], `${api}/request/my-requests`, {
            params: {
                'size': 10,
                'userId': payload.userId,
                ...(payload.page ? {'page': payload.page} : {'page' : 0})
            }
        });
        yield put({type: 'GET_CLIENT_REQUESTS_SUCCESS', payload: myRequestList});
    } catch (e) {
        yield put({type: 'GET_CLIENT_REQUESTS_FAILURE', payload: e});
    }
}

function* getMyRequestsWatcher() {
    yield takeLatest('GET_CLIENT_REQUESTS', fetchMyRequests);
}

function* fetchRequestDetail({ payload }) {
    try{
        const requestDetails = yield call([axios, axios.get], `${api}/request/${payload}`);
        yield put({type: 'FETCH_REQUEST_DETAIL_SUCCESS', payload: requestDetails});
    } catch (error) {
        yield put({type: 'FETCH_REQUEST_DETAIL_FAILURE', payload: error});
    }
}

function* getRequestDetail() {
    yield takeLatest('GET_REQUEST_DETAIL', fetchRequestDetail);
}

function* resolveRequest({ payload }) {
    try{
        const request = yield call([axios, axios.post], `${api}/request/${payload}/action/resolve`, null,
            {
                headers: {
                    'user_type': "admin"
                }
            });
        yield put({type: 'RESOLVE_REQUEST_SUCCESS', payload: request});
    } catch(e) {
        yield put({type: 'RESOLVE_REQUEST_FAILURE', payload: e});
    }
}

function* resolveRequestWatcher() {
    yield takeLatest('RESOLVE_REQUEST', resolveRequest);
}

export default [
    fork(sendRequestWatcher),
    fork(getAllRequestWatcher),
    fork(getMyRequestsWatcher),
    fork(getRequestDetail),
    fork(resolveRequestWatcher)
];
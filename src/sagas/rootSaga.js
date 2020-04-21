import { all } from 'redux-saga/effects';
import propertySaga from './propertySaga';
import userSaga from './userSaga';
import requestSaga from './requestSaga';

function* rootSaga() {
    yield all([
        ...propertySaga,
        ...userSaga,
        ...requestSaga
    ]);
}

export default rootSaga;
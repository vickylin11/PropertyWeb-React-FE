import { all } from 'redux-saga/effects';
import propertySaga from './propertySaga';
import userSaga from './userSaga';

function* rootSaga() {
    yield all([
        ...propertySaga,
        ...userSaga
    ]);
}

export default rootSaga;
import { call, put, takeEvery, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const api = "http://localhost:8080";

function* fetchProperties({ payload }) {
    try {
        let properties;
        if(payload === undefined) {
            properties = yield call([axios, axios.get], `${api}/property`, {
                params: {
                    'size': 12,
                    'page': 0,
                    'sort': "id,desc"
                }
            });
        } else {
            properties = yield call([axios, axios.get], `${api}/property`, {
                params: {
                    'size': 12,
                    ...(payload.page ? {'page': payload.page} : {'page' : 0}),
                    ...(payload.key ? {'q': payload.key} : {}),
                    ...(payload.sort ? {'sort' : payload.sort} : {'sort' : "id,desc"})
                }
            });
        }
        yield put({type: 'FETCH_PROPERTIES_SUCCESS', payload: properties.data});
    } catch (error) {
        yield put({type: 'FETCH_PROPERTIES_FAILURE', payload: error});
    }
}

export function* fetchPropertiesWatcher() {
    yield takeEvery('FETCH_PROPERTIES', fetchProperties);
}

export function* fetchPropertyDetails({ payload }) {
    try{
        const propertyDetails = yield call([axios, axios.get], `${api}/property/${payload}`);
        yield put({type: 'FETCH_PROPERTY_DETAIL_SUCCESS', payload: propertyDetails});
    } catch (error) {
        yield put({type: 'FETCH_PROPERTY_DETAIL_FAILURE', payload: error});
    }
}

export function* fetchPropertyDetailsWatcher() {
    yield takeLatest('FETCH_PROPERTY_DETAIL', fetchPropertyDetails);
}

export function* fetchPropertiesByType({ payload }) {
    try{
        const propertiesByType = yield call([axios, axios.get], `${api}/property/type`, {
            params: {
                'type': payload
            }
        });
        yield put({type: 'FETCH_PROPERTIES_BY_TYPE_SUCCESS', payload: propertiesByType});
    } catch (error) {
        yield put({type: 'FETCH_PROPERTY_BY_TYPE_FAILURE', payload: error});
    }
}

export function* fetchPropertiesByTypeWatcher() {
    yield takeLatest('FETCH_PROPERTIES_BY_TYPE', fetchPropertiesByType);
}

export function* addProperty({ payload }) {
    try{
        const newProperty = yield call([axios, axios.post], `${api}/property`, {
                'name': payload.property.name,
                'address': payload.property.address,
                'type': payload.property.type,
                'purpose': payload.property.purpose,
                'price': payload.property.price,
                'image': "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            });
        yield put({type: 'ADD_PROPERTY_SUCCESS', payload: newProperty.data});
        yield call(payload.history.push, '/property');
    } catch(e) {
        yield put({type: 'ADD_PROPERTY_FAILURE', payload: e.message });
    }
}

export function* addPropertyWatcher() {
    yield takeLatest('ADD_PROPERTY', addProperty);
}

export default [
    fork(fetchPropertiesWatcher),
    fork(fetchPropertyDetailsWatcher),
    fork(fetchPropertiesByTypeWatcher),
    fork(addPropertyWatcher)
];
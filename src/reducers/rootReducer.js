import propertyReducer from './propertyReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
    property: propertyReducer,
    request: requestReducer,
    user: userReducer
});

export default combinedReducers;
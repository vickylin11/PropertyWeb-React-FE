import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import combinedReducers from './reducers/rootReducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSage from './sagas/rootSaga';

let sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(logger, sagaMiddleware);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combinedReducers,
    composeEnhancer(middleware),
    );

sagaMiddleware.run(rootSage);

ReactDOM.render(
    <Provider store = {store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

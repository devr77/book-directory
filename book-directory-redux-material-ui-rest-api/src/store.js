import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import createReducer from './reducers';

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const configureStore = (initialState = {}) => {
    const middlewares = [thunk.withExtraArgument(axios)];

    // Enable Redux Devtools in client side dev mode.
    const composeEnhancers =
        dev && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const enhacer = composeEnhancers(applyMiddleware(...middlewares));

    const store = createStore(createReducer, initialState, enhacer);
    return store;
};

export default configureStore;
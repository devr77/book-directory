import { combineReducers } from 'redux';
import * as pageReducers from './containers/reducers';

const appReducer = combineReducers({ ...pageReducers });

export default appReducer;
/**
 * @author tanxin
 * @date $
 * @Description: state
 */
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import {userReducer} from './user/reducer.js'


const store = createStore(
  combineReducers({
    userReducer,
  }),
  applyMiddleware(thunk)
);

export default store;

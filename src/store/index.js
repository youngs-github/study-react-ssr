import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import { homeReducer, aboutReducer, userReducer } from './reducer';

// reducers
const reducers = combineReducers({
  home: homeReducer,
  about: aboutReducer,
  user: userReducer
});

// store
// 可以通过withExtraArgument注入额外参数
// 例如axios, 可进行定制化绑定, 设置基础url等
export const getClientStore = () => {
  const initState = window.__ctx__ || {};
  return createStore(
    reducers,
    initState,
    applyMiddleware(thunk.withExtraArgument(axios))
  );
};
export const getServerStore = () => {
  return createStore(reducers, applyMiddleware(thunk.withExtraArgument(axios)));
};

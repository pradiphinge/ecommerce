/** @format */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// create store
const store = createStore(rootReducer, composeWithDevTools());

export default store;

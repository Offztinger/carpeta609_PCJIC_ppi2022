// src/store/slices/index.js
import { combineReducers } from 'redux';
import authReducer from './auth.slice';

const rootReducer = combineReducers({
	auth: authReducer,
	// Otros reducers pueden ser agregados aquí
});

export default rootReducer;

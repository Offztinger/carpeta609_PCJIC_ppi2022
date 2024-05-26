// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/root.reducer'; // Suponiendo que combines tus reducers en un rootReducer
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

store.subscribe(() => {
	saveState(store.getState());
});

export default store;

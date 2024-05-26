// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/root.reducer';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

store.subscribe(() => {
	const state = store.getState();
	if (state.auth.user && state.auth.accessToken) {
		saveState(state);
	}
});

export default store;

import { configureStore } from '@reduxjs/toolkit';

import personsState from '@store/PersonsSlice';
import settingsState from '@store/SettingsSlice';

const store = configureStore({
	reducer: {
		personsState,
		settingsState,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;

export default store;

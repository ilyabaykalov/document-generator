import { configureStore } from '@reduxjs/toolkit';

import personsState from '@store/PersonsSlice';
import settingsState from '@store/SettingsSlice';
import postcardState from '@store/PostcardSlice';

const store = configureStore({
	reducer: {
		personsState,
		settingsState,
		postcardState
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;

export default store;

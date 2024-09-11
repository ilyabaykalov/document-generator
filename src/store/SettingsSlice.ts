import { createSlice } from '@reduxjs/toolkit';

import { SettingsProperties } from '@interfaces';

const initialState: SettingsProperties = {
	person: null,
	postcardFormat: 'official',
	orientation: 'landscape'
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setPerson: (state: SettingsProperties, { payload }) => {
			state.person = payload.person;
		},
		setPostcardFormat: (state: SettingsProperties, { payload }) => {
			state.postcardFormat = payload.postcardFormat;
		},
		setOrientation: (state: SettingsProperties, { payload }) => {
			state.orientation = payload.orientation;
		}
	}
})

export const {setPerson, setPostcardFormat, setOrientation} = settingsSlice.actions
export default settingsSlice.reducer;

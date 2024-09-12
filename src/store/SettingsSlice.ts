import { createSlice } from '@reduxjs/toolkit';

import { SettingsProperties } from '@interfaces';
import moment from 'moment/moment';

const initialState: SettingsProperties = {
	person: null,
	postcardFormat: 'official',
	orientation: 'landscape',
	selectedDate: moment().startOf('day').toDate()
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
		},
		setSelectedDate: (state: SettingsProperties, { payload }) => {
			state.selectedDate = payload.selectedDate;
		}
	}
})

export const {setPerson, setPostcardFormat, setOrientation, setSelectedDate} = settingsSlice.actions
export default settingsSlice.reducer;

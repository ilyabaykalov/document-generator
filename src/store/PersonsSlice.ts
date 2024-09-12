import { createSlice } from '@reduxjs/toolkit';

import { PersonsProperties } from '@interfaces';

const initialState: PersonsProperties = {
	persons: [],
};

export const personsSlice = createSlice({
	name: 'persons',
	initialState,
	reducers: {
		addPerson: (state: PersonsProperties, { payload }) => {
			state.persons.push({
				id: (state.persons.length + 1).toString(),
				...payload.person,
			});
		},
	},
});

export const { addPerson } = personsSlice.actions;

export default personsSlice.reducer;

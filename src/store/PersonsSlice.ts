import { createSlice } from '@reduxjs/toolkit';

import { PersonsProperties } from '@interfaces';
import moment from 'moment/moment';

const initialState: PersonsProperties = {
	persons: [ {
		id: '1',
		firstName: 'Василий',
		lastName: 'Габов',
		middleName: 'Петрович',
		birthday: moment('1975-09-14').toDate(),
		gender: 'man'
	}, {
		id: '2',
		firstName: 'Петр',
		lastName: 'Малинин',
		middleName: 'Геннадьевич',
		birthday: moment('1975-09-13').toDate(),
		gender: 'man'
	}, {
		id: '3',
		firstName: 'Елена',
		lastName: 'Ковенкова',
		middleName: 'Павловна',
		birthday: moment('1975-09-12').toDate(),
		gender: 'woman'
	}, {
		id: '4',
		firstName: 'Андрей',
		lastName: 'Юсупов',
		middleName: 'Петрович',
		birthday: moment('1975-09-13').toDate(),
		gender: 'man'
	} ],
};

export const personsSlice = createSlice({
	name: 'persons',
	initialState,
	reducers: null
})

export default personsSlice.reducer;

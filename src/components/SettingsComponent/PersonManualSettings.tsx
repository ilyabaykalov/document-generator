import React, { useState } from 'react';

import { Button, Divider, IconButton, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, PickerValidDate } from '@mui/x-date-pickers';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useDispatch } from '@hooks';

import styles from './PersonManualSettings.module.scss';
import { addPerson } from '@store/PersonsSlice';

const PersonManualSettings = ({ onManualSettingsToggleHandler }: Properties) => {
	const dispatch = useDispatch();

	const [ lastName, setLastName ] = useState<string>('');
	const [ firstName, setFirstName ] = useState<string>('');
	const [ middleName, setMiddleName ] = useState<string>('');
	const [ gender, setGender ] = useState<'man' | 'woman'>('man');
	const [ birthday, setBirthday ] = useState<PickerValidDate>(null);

	const onLastNameChangeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const lastName = target.value;

		setLastName(lastName);
	};

	const onFirstNameChangeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const firstName = target.value;

		setFirstName(firstName);
	};

	const onMiddleNameChangeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const middleName = target.value;

		setMiddleName(middleName);
	};

	const onGenderChangeHandler = (_: React.MouseEvent<HTMLElement>, gender: 'man' | 'woman') => {
		setGender(gender);
	};

	const onBirthdayChangeHandler = (pickerDate: PickerValidDate) => {
		const date = moment(pickerDate).startOf('day');

		setBirthday(date as PickerValidDate);
	};

	const onAddPersonHandler = () => {
		dispatch(addPerson({
			person: {
				firstName,
				lastName,
				middleName,
				birthday: moment(birthday).toDate(),
				gender,
			},
		}));
	};

	return (
		<div className={ styles.manualPerson }>
			<div>
				<TextField
					id={ 'outlined' }
					className={ styles.lastNameInput }
					variant="standard"
					value={ lastName } label={ 'Фамилия' }
					onChange={ onLastNameChangeHandler }/>

				<IconButton className={ styles.toggleMode } tabIndex={ -1 }
				            onClick={ onManualSettingsToggleHandler }>
					<ArrowBackIcon/>
				</IconButton>
			</div>
			<TextField id={ 'outlined' } variant="standard"
			           value={ firstName } label={ 'Имя' }
			           onChange={ onFirstNameChangeHandler }/>
			<TextField id={ 'outlined' } variant="standard"
			           value={ middleName } label={ 'Отчество' }
			           onChange={ onMiddleNameChangeHandler }/>

			<ToggleButtonGroup
				color="primary"
				value={ gender }
				exclusive fullWidth
				onChange={ onGenderChangeHandler }>
				<ToggleButton value="man">Мучина</ToggleButton>
				<ToggleButton value="woman">Женщина</ToggleButton>
			</ToggleButtonGroup>

			<LocalizationProvider dateAdapter={ AdapterMoment } adapterLocale={ 'ru-RU' }>
				<DatePicker label="Дата рождения"
				            value={ birthday }
				            onChange={ onBirthdayChangeHandler }/>
			</LocalizationProvider>

			<Button variant="outlined" onClick={ onAddPersonHandler }>Сохранить</Button>

			<Divider/>
		</div>
	);
};

interface Properties {
	onManualSettingsToggleHandler: () => void;
}

export default PersonManualSettings;

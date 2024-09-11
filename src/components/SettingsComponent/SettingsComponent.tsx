import React, { useEffect, useState } from 'react';

import {
	Button, FormControl, InputLabel,
	OutlinedInput, SelectChangeEvent, ToggleButton,
	ToggleButtonGroup, Select, MenuItem
} from '@mui/material';

import moment from 'moment/moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { PickerValidDate } from '@mui/x-date-pickers';

import { PersonProperties, State } from '@interfaces';

import { useDispatch, useSelector } from '@hooks';

import { setOrientation, setPerson, setPostcardFormat } from '@store/SettingsSlice';

import styles from './SettingsComponent.module.scss';

const SettingsComponent = () => {
	const dispatch = useDispatch();

	const [ selectedPersonId, setSelectedPersonId ] = useState<string>('0');
	const [ selectedDate, setSelectedDate ] = useState<PickerValidDate>(null);

	const persons: PersonProperties[] = useSelector((state: State) => state.personsState.persons);

	const personsByBirthday: PersonProperties[] = useSelector((state: State) =>
		state.personsState.persons.filter(({ birthday }) =>
				moment(selectedDate).dayOfYear() === moment(birthday).dayOfYear() + 1)
	);

	const selectedPerson: PersonProperties = useSelector(({ settingsState }: State) => settingsState.person);
	const postcardFormat: string = useSelector(({ settingsState }: State) => settingsState.postcardFormat);
	const orientation: string = useSelector(({ settingsState }: State) => settingsState.orientation);

	useEffect(() => {
		const date = moment().startOf('day')

		setSelectedDate(date as PickerValidDate);
	}, []);

	useEffect(() => {
		if (!personsByBirthday.length && selectedPersonId !== '0') {
			setSelectedPersonId('0');
			dispatch(setPerson({ person: null }));
		}
	}, [personsByBirthday]);

	const onDateChangeHandler = (pickerDate: PickerValidDate) => {
		const date = moment(pickerDate).startOf('day')

		setSelectedDate(date as PickerValidDate);
	};

	const onPersonChangeHandler = ({ target }: SelectChangeEvent) => {
		const selectedPerson = persons.find(({ id }) => target.value === id);

		setSelectedPersonId(selectedPerson?.id);

		dispatch(setPerson({ person: selectedPerson || null }));
	};

	const onPostcardFormatChangeHandler = (event: React.MouseEvent<HTMLElement>, postcardFormat: string) =>
		dispatch(setPostcardFormat({ postcardFormat }));

	const onOrientationChangeHandler = (event: React.MouseEvent<HTMLElement>, orientation: string) =>
		dispatch(setOrientation({ orientation }));

	const onSubmitHandler = () => {
		console.log({
			person: selectedPerson,
			postcardFormat,
			orientation,
			selectedDate: moment(selectedDate).toDate(),
		});
	}

	return (
		<>
			<FormControl className={ styles.settingsForm }>
				<InputLabel id={ 'full-name-label' }>Кого поздравляем?</InputLabel>
				<Select labelId={ 'full-name-label' } required
				        input={ <OutlinedInput label="Кого поздравляем?"/> }
				        value={selectedPersonId}
				        onChange={ onPersonChangeHandler }>
					<MenuItem key={ 0 } value={ 0 }>
						Не выбрано значение
					</MenuItem>
					{
						personsByBirthday.map((person) =>
							<MenuItem key={ person.id } value={ person.id }>
								{ person.lastName } { person.firstName } { person.middleName }
							</MenuItem>,
						)
					}
				</Select>

				<ToggleButtonGroup
					color="primary"
					className={ styles.toggleGroup }
					value={ postcardFormat }
					exclusive fullWidth
					onChange={ onPostcardFormatChangeHandler }
					aria-label="Platform">
					<ToggleButton value="official">Официально</ToggleButton>
					<ToggleButton value="unofficial">Как друзей</ToggleButton>
				</ToggleButtonGroup>

				<ToggleButtonGroup
					color="primary"
					className={ styles.toggleGroup }
					value={ orientation }
					exclusive fullWidth
					onChange={ onOrientationChangeHandler }
					aria-label="Platform">
					<ToggleButton value="portrait">Портретная</ToggleButton>
					<ToggleButton value="landscape">Альбомная</ToggleButton>
				</ToggleButtonGroup>

				<LocalizationProvider dateAdapter={ AdapterMoment } adapterLocale={ 'ru-RU' }>
					<StaticDatePicker
						value={ selectedDate } disablePast
						onChange={ onDateChangeHandler }
						slotProps={ { actionBar: { actions: [] } }
						}/>
				</LocalizationProvider>

				<Button variant="outlined" type={ 'submit' } onClick={onSubmitHandler}>Создать</Button>
			</FormControl>
		</>
	);
};

export default SettingsComponent;

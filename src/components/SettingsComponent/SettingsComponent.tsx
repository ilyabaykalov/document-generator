import React, { useEffect, useState } from 'react';

import {
	FormControl, InputLabel,
	OutlinedInput, SelectChangeEvent, ToggleButton,
	ToggleButtonGroup, Select, MenuItem, IconButton,
} from '@mui/material';

import moment from 'moment/moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { PickerValidDate } from '@mui/x-date-pickers';

import { PersonManualSettings, PersonAutoSettings } from '@components';

import { PersonProperties, State } from '@interfaces';

import { useDispatch, useSelector } from '@hooks';

import { setOrientation, setPerson, setPostcardFormat, setSelectedDate } from '@store/SettingsSlice';

import styles from './SettingsComponent.module.scss';

const SettingsComponent = () => {
	const dispatch = useDispatch();

	const [ selectedPersonId, setSelectedPersonId ] = useState<string>('0');
	const [ selectedDate, setSelectedPickerDate ] = useState<PickerValidDate>(null);
	const [ isManualEntryOfPerson, setManualEntryOfPerson ] = useState<boolean>(false);

	const persons: PersonProperties[] = useSelector(({ personsState }: State) => personsState.persons);

	const postcardFormat: string = useSelector(({ settingsState }: State) => settingsState.postcardFormat);
	const orientation: string = useSelector(({ settingsState }: State) => settingsState.orientation);

	const resetSelectedPersonId = () => {
		if (selectedPersonId !== '0') {
			setSelectedPersonId('0');

			dispatch(setPerson({ person: null }));
		}
	};

	useEffect(() => {
		const date = moment().startOf('day');

		setSelectedPickerDate(date as PickerValidDate);
	}, []);

	const onDateChangeHandler = (pickerDate: PickerValidDate) => {
		const date = moment(pickerDate).startOf('day');

		setSelectedPickerDate(date as PickerValidDate);

		dispatch(setSelectedDate({ selectedDate: date }));

		resetSelectedPersonId();
	};

	const onPersonChangeHandler = ({ target }: SelectChangeEvent) => {
		const selectedPerson = persons.find(({ id }) => target.value === id);

		setSelectedPersonId(selectedPerson?.id);

		dispatch(setPerson({ person: selectedPerson || null }));
	};

	const onPostcardFormatChangeHandler = (_: React.MouseEvent<HTMLElement>, postcardFormat: string) =>
		dispatch(setPostcardFormat({ postcardFormat }));

	const onOrientationChangeHandler = (_: React.MouseEvent<HTMLElement>, orientation: string) =>
		dispatch(setOrientation({ orientation }));

	const onManualSettingsToggleHandler = () => {
		setManualEntryOfPerson((prevState) => !prevState);
	};

	return (
		<FormControl className={ styles.settingsForm }>
			{
				isManualEntryOfPerson
					? <PersonManualSettings onManualSettingsToggleHandler={ onManualSettingsToggleHandler }/>
					: <PersonAutoSettings
						selectedPersonId={ selectedPersonId }
						onPersonChangeHandler={ onPersonChangeHandler }
						onManualSettingsToggleHandler={ onManualSettingsToggleHandler }/>
			}

			<ToggleButtonGroup
				color="primary"
				className={ styles.toggleGroup }
				value={ postcardFormat }
				exclusive fullWidth
				onChange={ onPostcardFormatChangeHandler }>
				<ToggleButton value="official">Официально</ToggleButton>
				<ToggleButton value="unofficial">Как друзей</ToggleButton>
			</ToggleButtonGroup>

			<ToggleButtonGroup
				color="primary"
				className={ styles.toggleGroup }
				value={ orientation }
				exclusive fullWidth disabled
				onChange={ onOrientationChangeHandler }>
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
		</FormControl>
	);
};

export default SettingsComponent;

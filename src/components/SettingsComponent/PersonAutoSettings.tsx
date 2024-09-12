import React from 'react';

import moment from 'moment';

import {
	IconButton, InputLabel,
	MenuItem, OutlinedInput, Select, SelectChangeEvent,
} from '@mui/material';

import AddReactionIcon from '@mui/icons-material/AddReaction';

import { PersonProperties, State } from '@interfaces';

import { useSelector } from '@hooks';

import styles from './PersonAutoSettings.module.scss';

const PersonAutoSettings = ({ selectedPersonId, onPersonChangeHandler, onManualSettingsToggleHandler }: Properties) => {
	const selectedDate: Date = useSelector(({ settingsState }: State) => settingsState.selectedDate);

	const personsByBirthday: PersonProperties[] = useSelector((state: State) =>
		state.personsState.persons.filter(({ birthday }) =>
			moment(selectedDate).dayOfYear() === moment(birthday).dayOfYear()),
	);

	return (
		<div className={styles.autoPerson}>
				<InputLabel id={ 'full-name-label' }>Кого поздравляем?</InputLabel>
				<Select className={styles.selector}
				        labelId={ 'full-name-label' }
				        input={ <OutlinedInput label="Кого поздравляем?"/> }
				        value={ selectedPersonId }
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
			<IconButton className={styles.toggleMode} onClick={onManualSettingsToggleHandler}>
				<AddReactionIcon/>
			</IconButton>
		</div>
	);
};

interface Properties {
	selectedPersonId: string;
	onPersonChangeHandler: (event: SelectChangeEvent) => void;
	onManualSettingsToggleHandler: () => void;
}

export default PersonAutoSettings;

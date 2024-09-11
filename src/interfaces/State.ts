import { PersonsProperties } from './PersonProperties';
import { SettingsProperties } from './SettingsProperties';

export interface State {
	personsState: PersonsProperties;
	settingsState: SettingsProperties;
}

import { PersonsProperties } from './PersonProperties';
import { SettingsProperties } from './SettingsProperties';
import { PostcardProperties } from './PostcardProperties';

export interface State {
	personsState: PersonsProperties;
	settingsState: SettingsProperties;
	postcardState: PostcardProperties;
}

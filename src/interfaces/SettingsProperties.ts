import { PersonProperties } from './PersonProperties';

export interface SettingsProperties {
	person?: PersonProperties;
	postcardFormat: string;
	orientation: string;
	selectedDate: Date;
}

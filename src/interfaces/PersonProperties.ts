export interface PersonProperties {
	id: string;
	firstName: string;
	lastName: string;
	middleName: string;
	birthday: Date;
	gender: 'man' | 'woman';
}

export interface PersonsProperties {
	persons: PersonProperties[];
}

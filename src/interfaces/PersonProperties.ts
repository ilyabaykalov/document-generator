export interface PersonProperties {
	id: string;
	firstName: string;
	lastName: string;
	middleName: string;
	birthday: Date;
}

export interface PersonsProperties {
	persons: PersonProperties[];
}

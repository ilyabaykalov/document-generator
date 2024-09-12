import React from 'react';

import { useSelector } from '@hooks';

import moment from 'moment/moment';

import { PersonProperties, State } from '@interfaces';

import styles from './LandscapePostcardComponent.module.scss';

const LandscapePostcardComponent = () => {
	const person: PersonProperties = useSelector(({ settingsState }: State) => settingsState.person);
	const postcardFormat: string = useSelector(({ settingsState }: State) => settingsState.postcardFormat);
	const selectedDate: string = useSelector(({ settingsState }: State) => moment(settingsState.selectedDate).format('DD.MM.YYYY'));

	const text: string[] = useSelector(({ postcardState }: State) =>
		postcardFormat === 'official' ? postcardState.officialText : postcardState.unofficialText);

	const isAnniversary: boolean = useSelector(({ settingsState }: State) => {
		if (settingsState.person) {
			const dateDifference = moment(settingsState.selectedDate).year() - moment(settingsState.person.birthday).year();

			return dateDifference % 10 === 0;
		}

		return false
	});

	return (
		<div id={ 'postcard' } className={ styles.postcard }>
			<img className={ styles.background } src={ 'assets/backgrounds/landscape-1.png' } alt="background"/>
			<img className={ styles.blazon } src={ 'assets/blazon.svg' } alt="blazon"/>

			<div className={ styles.textContainer }>

				{ person
					? <p className={ styles.header }>
						{ person.gender === 'man' ? 'Уважаемый' : 'Уважаемая' } { person.firstName } { person.middleName }!
					</p>
					: <p className={ styles.header }>Уважаемый(ая) Имя Отчество!</p>
				}

				<div className={ styles.text }>
					{ text.map((paragraph, index) => <p key={index}>{paragraph}{ index === 0 ? isAnniversary ? 'с юбилеем!' : 'с Днём Рождения!' : '' }</p>) }
				</div>

				<div className={ styles.footer }>
					<div className={ styles.footerLeft }>
						<p className={ styles.footerLeftText }>
							С уважением,
						</p>
						<p className={ styles.footerLeftText }>
							Заместитель председателя Комитета по образованию, культуре, науке, туризму, спорту и молодежной политике Московской областной Думы
						</p>
					</div>

					<img className={ styles.sign } src={ 'assets/sign.png' } alt="sign"/>

					<div className={ styles.footerRight }>
						<p className={ styles.fullName }>Лобышева Е.А.</p>
						<p className={ styles.date }>{ selectedDate }г.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandscapePostcardComponent;

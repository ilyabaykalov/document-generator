import React from 'react';

import styles from './PostcardComponent.module.scss';

const PostcardComponent = ({ isPreview }: Properties) => {
	return (
		<div id={'postcard'} className={ styles.postcard } style={ { transform: isPreview ? 'scale(1.6)' : 'scale(1)' } }>
			<img className={ styles.background } src={ 'assets/backgrounds/landscape-1.png' } alt="background"/>
			<img className={ styles.blazon } src={ 'assets/blazon.svg' } alt="blazon"/>

			<div className={ styles.textContainer }>

				<p className={ styles.header }>Уважаемый(ая) Имя Отчество!</p>

				<div className={ styles.text }>
					<p>Примите мои искренние поздравления с Днём Рождения!</p>

					<p>
						Желаю Вам крепкого здоровья, неиссякаемой энергии, новых свершений,
						радости и уверенности в завтрашнем дне. Пусть все Ваши успехи умножатся, а мечты воплощаются в жизнь!
					</p>

					<p>
						Благодарю Вас за Вашу активную жизненную позицию, неравнодушие и вклад
						в развитие нашего Подмосковья. Желаю Вам вдохновения для новых идей и
						поддержки близких людей для их успешной реализации.
					</p>

					<p>
						Пусть в Вашем доме всегда царят мир, радость и достаток, а в душе -
						гармония и счастье!
					</p>
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
						<p className={ styles.date }>02.09.2024г.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

interface Properties {
	isPreview?: boolean;
}

export default PostcardComponent;

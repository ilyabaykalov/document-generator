import React from 'react';

import { SettingsComponent } from '@components';

import styles from './MainPage.module.scss';

const MainPage = () => {
	return (
		<div className={ styles.container }>
			<div className={ styles.settingsBlock }>
				<SettingsComponent/>
			</div>
		</div>
	);
};

export default MainPage;

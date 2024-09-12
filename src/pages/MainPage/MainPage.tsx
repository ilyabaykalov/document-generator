import React from 'react';

import { SettingsComponent, PreviewComponent } from '@components';

import styles from './MainPage.module.scss';

const MainPage = () => {
	return (
		<div className={ styles.container }>
			<div className={ styles.settings }>
				<SettingsComponent/>
			</div>
			<div className={ styles.preview }>
				<PreviewComponent/>
			</div>
		</div>
	);
};

export default MainPage;

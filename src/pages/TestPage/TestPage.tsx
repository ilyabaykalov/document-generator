import React from 'react';

import { TestComponent } from '@components';

import styles from './TestPage.module.scss';

const TestPage = () => {
	return (
		<>
			<div className={styles.borderBox}>
				<TestComponent/>
			</div>
		</>
	);
};

export default TestPage;

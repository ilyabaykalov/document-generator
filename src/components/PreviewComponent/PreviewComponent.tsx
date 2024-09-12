import React from 'react';

import html2canvas from 'html2canvas';

import { Button } from '@mui/material';
import { PostcardComponent } from '@components';

import { useSelector } from '@hooks';

import { State } from '@interfaces';

import styles from './PreviewComponent.module.scss';
import moment from 'moment/moment';

const PreviewComponent = () => {
	const filename: string = useSelector(({ settingsState }: State) => {
		if (settingsState.person) {
			return `${ settingsState.person.lastName } ${ settingsState.person.firstName[0] }. ${ settingsState.person.middleName[0] }.png`;
		}

		return `postcard_${ moment().format('DD.MM.YYYY') }.png`;
	});

	const isDone: boolean = useSelector(({ settingsState }: State) => !settingsState.person);

	const onDownloadClickHandler = () => {
		const postcardPrintForm = document.getElementById('postcard');

		html2canvas(postcardPrintForm, {
			windowWidth: postcardPrintForm.offsetWidth,
			windowHeight: postcardPrintForm.offsetHeight,
			useCORS: true,
			allowTaint: true,
			scale: 4,
			x: 0, y: 0,
		}).then((canvas) => {
			const link = document.createElement('a');

			link.href = canvas.toDataURL('image/png');
			link.download = filename;

			link.click();
		});
	};

	return (
		<>
			<div className={ styles.preview }>
				<PostcardComponent/>

				<Button
					className={ styles.downloadButton }
					variant="outlined" disabled={ isDone }
					onClick={ onDownloadClickHandler }>Скачать</Button>
			</div>

		</>
	);
};

export default PreviewComponent;

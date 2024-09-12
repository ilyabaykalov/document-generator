import React from 'react';

import html2canvas from 'html2canvas';

import { Button } from '@mui/material';
import { PostcardComponent } from '@components';

import styles from './PreviewComponent.module.scss';

const PreviewComponent = () => {
	const onDownloadClickHandler = () => {
		const postcardPrintForm = document.getElementById('postcard')

		html2canvas(postcardPrintForm, {
			windowWidth: postcardPrintForm.offsetWidth,
			windowHeight: postcardPrintForm.offsetHeight,
			useCORS: true,
			allowTaint: true,
			scale: 4,
			x: 0, y: 0
		}).then((canvas) => {
			const link = document.createElement('a');
			link.href = canvas.toDataURL('image/png');
			// link.download = `${filename}png`;
			link.download = 'test.png';

			link.click();
		});
	};

	return (
		<div className={ styles.preview }>
			<PostcardComponent/>

			<Button onClick={ onDownloadClickHandler }>Скачать</Button>
		</div>
	);
};

export default PreviewComponent;

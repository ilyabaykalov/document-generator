import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@pages';

import { PATHS } from './paths';

const BrowserRouter = createBrowserRouter([
	{ path: PATHS.main, element: <MainPage/> },
]);

export default BrowserRouter;

import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { TestPage } from '@pages';

import { PATHS } from './paths';

const BrowserRouter = createBrowserRouter([
	{ path: PATHS.test, element: <TestPage/> },
	{ path: PATHS.test2, element: <TestPage/> },
]);

export default BrowserRouter;

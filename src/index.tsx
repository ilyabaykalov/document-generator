import React from 'react';

import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from '@store';

import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from '@router';

import '@stylesheets';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
	<Provider store={ store }>
		<RouterProvider router={ BrowserRouter }/>
	</Provider>,
);

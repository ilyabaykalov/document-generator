import React from 'react';

import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from '@router';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
	<RouterProvider router={BrowserRouter}/>
);

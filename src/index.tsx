import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

import {AppProviders} from './lib/components/app-provider';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { offers } from './mocs/offer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>
);

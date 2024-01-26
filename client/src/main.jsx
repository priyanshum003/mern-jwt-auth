import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const root = document.getElementById('root');

createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
);
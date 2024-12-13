import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure your HTML file contains a div with id='root'.");
}

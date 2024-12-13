import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter> {/* 여기서 HashRouter -> BrowserRouter로 변경 */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure your HTML file contains a div with id='root'.");
}

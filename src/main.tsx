import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <ErrorBoundary fallback={<p>Error has occured</p>}>
    <App />
  </ErrorBoundary>
);

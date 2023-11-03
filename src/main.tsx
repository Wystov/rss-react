import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';

const fallback = <p className="error">Error has occured, reload the page</p>;

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <ErrorBoundary fallback={fallback}>
    <App />
  </ErrorBoundary>
);

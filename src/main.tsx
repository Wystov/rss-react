import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const fallback = <p className="error">Error has occured, reload the page</p>;

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <ErrorBoundary fallback={fallback}>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

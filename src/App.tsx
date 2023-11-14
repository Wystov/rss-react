import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/main';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const fallback = <p className="error">Error has occured, reload the page</p>;

  return (
    <ErrorBoundary fallback={fallback}>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

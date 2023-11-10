import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/main';

const App = () => {
  const fallback = <p className="error">Error has occured, reload the page</p>;

  return (
    <ErrorBoundary fallback={fallback}>
      <MainPage />
    </ErrorBoundary>
  );
};

export default App;

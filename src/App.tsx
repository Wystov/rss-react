import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorComponent from './components/ErrorComponent';
import type { Data } from './types';
import { getData } from './api/getData';

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState(
    localStorage.getItem('sw-search-query') ?? ''
  );
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      localStorage.setItem('sw-search-query', search);
      setData(null);
      setIsFetching(true);
      const data = await getData(search);
      if (data) setData(data);
      setIsFetching(false);
    };

    handleSearch();
  }, [search]);

  const content = () => {
    switch (true) {
      case isFetching:
        return (
          <div className="preloader-container">
            <span className="preloader" />
          </div>
        );
      case data !== null:
        return <Results results={data!.results} />;
      default:
        return (
          <div className="error">
            Error occured on getting data, please try later
          </div>
        );
    }
  };

  return (
    <>
      <Search onSearch={setSearch} isFetching={isFetching} />
      {content()}
      <ErrorComponent />
    </>
  );
};

export default App;

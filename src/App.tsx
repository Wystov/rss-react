import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorComponent from './components/ErrorComponent';
import type { Data } from './types';
import { getData } from './api/getData';
import Pagination from './components/Pagination';

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState(
    localStorage.getItem('sw-search-query') ?? ''
  );
  const [data, setData] = useState<Data | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleSearch = async () => {
      localStorage.setItem('sw-search-query', search);
      setData(null);
      setIsFetching(true);
      const data = await getData(search, page);
      if (data) setData(data);
      setIsFetching(false);
    };

    handleSearch();
  }, [search, page]);

  const handleQueryChange = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const content = () => {
    switch (true) {
      case isFetching:
        return (
          <div className="preloader-container">
            <span className="preloader" />
            <span>Loading...</span>
          </div>
        );
      case data !== null:
        return (
          <>
            <p className="results-count">
              We&apos;v got {data!.count} result{data!.count === 1 ? '' : 's'}
            </p>
            <Pagination
              itemsCount={data!.count}
              currentPage={page}
              onPageChange={setPage}
            />
            <Results results={data!.results} />
          </>
        );
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
      <Search
        initialValue={search}
        onSearch={handleQueryChange}
        isFetching={isFetching}
      />
      {content()}
      <ErrorComponent />
    </>
  );
};

export default App;

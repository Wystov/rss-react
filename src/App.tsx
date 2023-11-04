import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorComponent from './components/ErrorComponent';
import type { Data } from './types';
import { getData } from './api/getData';
import Pagination from './components/Pagination';
import Preloader from './components/common/Preloader';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const initialSearchValue =
    searchParams.get('search') ?? localStorage.getItem('sw-search-query');
  const [search, setSearch] = useState(initialSearchValue ?? '');
  const [data, setData] = useState<Data | null>(null);
  const paramsPage = searchParams.get('page');
  const [page, setPage] = useState(paramsPage ? +paramsPage : 1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleSearch = async () => {
      localStorage.setItem('sw-search-query', search);
      setData(null);
      setIsFetching(true);

      let apiPage = page;
      if (itemsPerPage === 20) {
        apiPage = 2 * apiPage - 1;
      }
      const data = await getData({ query: search, page: apiPage });
      if (!(data && 'results' in data)) {
        setIsFetching(false);
        return;
      }
      if (itemsPerPage === 20 && data?.next) {
        const nextData = await getData({ query: search, page: apiPage + 1 });
        if (nextData && 'results' in nextData)
          data.results.push(...nextData.results);
      }
      setData(data);
      setIsFetching(false);
    };

    handleSearch();
  }, [search, page, itemsPerPage]);

  const handleQueryChange = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
  };

  const handlePageChange = (value: number) => {
    setSearchParams((params) => {
      params.set('page', String(value));
      params.delete('details');
      return params;
    });
    setPage(value);
  };

  const content = () => {
    switch (true) {
      case isFetching:
        return <Preloader />;
      case data !== null:
        return (
          <>
            <p className="results-count">
              We&apos;v got {data!.count} result{data!.count === 1 ? '' : 's'}
              {search.length ? ` for "${search}"` : ''}
            </p>
            {data?.results.length && (
              <>
                <Pagination
                  itemsCount={data!.count}
                  currentPage={page}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
                <Results results={data!.results} />
              </>
            )}
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

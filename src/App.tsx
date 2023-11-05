import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorComponent from './components/ErrorComponent';
import type { Data } from './types';
import { getData } from './api/getData';
import Pagination from './components/Pagination';
import Preloader from './components/common/Preloader';
import { useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import CloseBtn from './components/common/CloseBtn/CloseBtn';
import ErrorBoundary from './components/ErrorBoundary';

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
  const hasId = searchParams.get('details') ? true : false;
  const [showDetails, setShowDetails] = useState(hasId);

  useEffect(() => {
    const handleSearch = async () => {
      localStorage.setItem('sw-search-query', search);
      setShowDetails(false);
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

  const handleShowDetails = (id: string | null) => {
    if (showDetails) {
      setShowDetails(false);
      setSearchParams((params) => {
        params.delete('details');
        return params;
      });
      return;
    }
    if (!id) return;
    setSearchParams((params) => {
      params.set('details', id);
      return params;
    });
    setShowDetails(true);
  };

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
    setShowDetails(false);
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
                <Results
                  results={data!.results}
                  showDetails={showDetails}
                  handleShowDetails={handleShowDetails}
                />
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

  const fallback = <p className="error">Error has occured, reload the page</p>;

  return (
    <ErrorBoundary fallback={fallback}>
      <main
        className={`main ${showDetails ? 'main--small' : ''}`}
        onClick={() => handleShowDetails(null)}
      >
        <Search
          initialValue={search}
          onSearch={handleQueryChange}
          isFetching={isFetching}
        />
        {content()}
        <ErrorComponent />
      </main>
      {showDetails && (
        <aside className="details">
          <Outlet />
          <CloseBtn onClick={() => handleShowDetails(null)} />
        </aside>
      )}
    </ErrorBoundary>
  );
};

export default App;

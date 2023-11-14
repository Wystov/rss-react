import { useState, useEffect, createContext } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import ErrorComponent from '../components/ErrorComponent';
import type { Data, RootState } from '../types';
import { getData } from '../api/getData';
import Preloader from '../components/common/Preloader';
import { useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import CloseBtn from '../components/common/CloseBtn/CloseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../store/searchSlice';

export const DataContext = createContext<Data | null>(null);
export const SearchContext = createContext<string>('');

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const search = useSelector((state: RootState) => state.search.query);
  const [data, setData] = useState<Data | null>(null);
  const paramsPage = searchParams.get('page');
  const [page, setPage] = useState(paramsPage ? +paramsPage : 1);
  const paramsItemsPerPage = searchParams.get('itemsPerPage');
  const [itemsPerPage, setItemsPerPage] = useState(
    paramsItemsPerPage ? +paramsItemsPerPage : 10
  );
  const hasId = searchParams.get('details') ? true : false;
  const [showDetails, setShowDetails] = useState(hasId);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSearch = async () => {
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

  useEffect(() => {
    const handleQueryParamsChange = () => {
      const newSearch = searchParams.get('search');
      dispatch(setSearch(newSearch ?? ''));
      const newPage = searchParams.get('page');
      if (newPage) setPage(+newPage);
      const itemsPerPage = searchParams.get('itemsPerPage');
      if (itemsPerPage) setItemsPerPage(+itemsPerPage);
      const showDetailsId = searchParams.get('details');
      if (showDetailsId) setShowDetails(true);
    };

    handleQueryParamsChange();
  }, [searchParams]);

  const closeDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      setSearchParams((params) => {
        params.delete('details');
        return params;
      });
    }
  };

  return (
    <>
      <main className={`main ${showDetails ? 'main--small' : ''}`}>
        <Search isFetching={isFetching} />
        {isFetching ? (
          <Preloader />
        ) : (
          <DataContext.Provider value={data}>
            <CardList />
          </DataContext.Provider>
        )}
        <ErrorComponent />
      </main>
      {showDetails && (
        <>
          <div className="overlay" onClick={closeDetails} />
          <aside className="details">
            <Outlet />
            <CloseBtn onClick={closeDetails} />
          </aside>
        </>
      )}
    </>
  );
};

export default MainPage;

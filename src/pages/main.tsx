import { useEffect, createContext } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import ErrorComponent from '../components/ErrorComponent';
import type { Data, RootState } from '../config/types';
import Preloader from '../components/common/Preloader';
import { useSearchParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import CloseBtn from '../components/common/CloseBtn/CloseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../store/searchSlice';
import { setCurrentPage, setItemsPerPage } from '../store/paginationSlice';
import { setDetailsId } from '../store/detailsSlice';
import { useGetAllPeopleQuery } from '../api/getData';

export const DataContext = createContext<Data | undefined>(undefined);
export const SearchContext = createContext<string>('');

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useSelector((state: RootState) => state.search.query);
  const itemsPerPage = useSelector(
    (state: RootState) => state.pagination.itemsPerPage
  );

  const apiPage = useSelector((state: RootState) => {
    const { currentPage } = state.pagination;
    return itemsPerPage === 20 ? currentPage * 2 - 1 : currentPage;
  });

  const showDetails = useSelector(
    (state: RootState) => state.details.id !== null
  );

  const isLoading = useSelector(
    (state: RootState) => state.loader.isMainLoading
  );
  const dispatch = useDispatch();

  const { data } = useGetAllPeopleQuery({
    query: search,
    page: apiPage,
    itemsPerPage,
  });

  useEffect(() => {
    const handleQueryParamsChange = () => {
      const newSearch = searchParams.get('search');
      dispatch(setSearch(newSearch ?? ''));
      const newPage = searchParams.get('page');
      if (newPage) dispatch(setCurrentPage(+newPage));
      const itemsPerPage = searchParams.get('itemsPerPage');
      if (itemsPerPage) dispatch(setItemsPerPage(+itemsPerPage));
      const detailsId = searchParams.get('details');
      dispatch(setDetailsId(detailsId));
    };

    handleQueryParamsChange();
  }, [searchParams, dispatch]);

  const closeDetails = () => {
    if (showDetails) {
      setDetailsId(null);
      setSearchParams((params) => {
        params.delete('details');
        return params;
      });
    }
  };

  return (
    <>
      <main className={`main ${showDetails ? 'main--small' : ''}`}>
        <Search />
        {isLoading ? (
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

import Search from '../components/Search';
import CardList from '../components/CardList';
import ErrorComponent from '../components/ErrorComponent';
import type { RootState } from '../config/types';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const showDetails = useSelector(
    (state: RootState) => state.details.id !== null
  );

  return (
    <>
      <main className={`main ${showDetails ? 'main--small' : ''}`}>
        <Search />
        <CardList />
        <ErrorComponent />
      </main>
      {showDetails && (
        <aside className="aside">
          <Outlet />
        </aside>
      )}
    </>
  );
};

export default MainPage;

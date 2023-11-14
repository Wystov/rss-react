import Card from '../Card';
import './style.css';
import { useContext } from 'react';
import { DataContext } from '../../pages/main';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/types';

const CardList = () => {
  const data = useContext(DataContext);
  const search = useSelector((state: RootState) => state.search.query);

  const searchResults = () =>
    data?.results.map((item, i) => <Card item={item} key={i} />);

  return (
    <section>
      {data ? (
        <p className="results-count">
          We&apos;v got {data!.count} result{data!.count === 1 ? '' : 's'}
          {search.length ? ` for "${search}"` : ''}
        </p>
      ) : (
        <div className="error">
          Error occured on getting data, please try later
        </div>
      )}
      {data?.results.length ? (
        <>
          <Pagination />
          <div className="results">{searchResults()}</div>
        </>
      ) : (
        <div className="error">Nothing matches your search</div>
      )}
    </section>
  );
};

export default CardList;

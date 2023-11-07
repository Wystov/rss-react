import Card from '../Card';
import './style.css';
import { useContext } from 'react';
import { DataContext, SearchContext } from '../../App';
import Pagination from '../Pagination';

const Results = () => {
  const data = useContext(DataContext);
  const search = useContext(SearchContext);

  const searchResults = () =>
    data?.results.map((item, i) => <Card item={item} key={i} />);

  return (
    <section>
      <p className="results-count">
        We&apos;v got {data!.count} result{data!.count === 1 ? '' : 's'}
        {search.length ? ` for "${search}"` : ''}
      </p>
      {data?.results.length && (
        <>
          <Pagination />
          <div className="results">{searchResults()}</div>
        </>
      )}
    </section>
  );
};

export default Results;

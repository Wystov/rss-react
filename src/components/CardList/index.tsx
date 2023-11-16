import Card from '../Card';
import './style.css';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/types';
import { useGetAllPeopleQuery } from '../../api/getData';
import Preloader from '../common/Preloader';

const CardList = () => {
  const isLoading = useSelector(
    (state: RootState) => state.loader.isMainLoading
  );
  const search = useSelector((state: RootState) => state.search.query);
  const itemsPerPage = useSelector(
    (state: RootState) => state.pagination.itemsPerPage
  );
  const apiPage = useSelector((state: RootState) => {
    const { currentPage } = state.pagination;
    return itemsPerPage === 20 ? currentPage * 2 - 1 : currentPage;
  });

  const { data } = useGetAllPeopleQuery({
    query: search,
    page: apiPage,
    itemsPerPage,
  });

  const searchResults = () =>
    data?.results.map((item, i) => <Card item={item} key={i} />);

  const content = () => (
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

  return isLoading ? <Preloader /> : content();
};

export default CardList;

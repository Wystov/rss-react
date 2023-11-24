import Card from '../Card';
import styles from './style.module.css';
import Pagination from '../Pagination';

const CardList = ({ data }) => {
  const searchResults = () =>
    data?.results.map((item, i) => <Card item={item} key={i} />);

  const content = () => (
    <section>
      {data ? (
        <p className="results-count">
          We&apos;v got {data!.count} result{data!.count === 1 ? '' : 's'}
          {/* {search.length ? ` for "${search}"` : ''} */}
        </p>
      ) : (
        <div className="error">
          Error occured on getting data, please try later
        </div>
      )}
      {data?.results.length ? (
        <>
          <Pagination itemsCount={data.count} />
          <div className={styles.results}>{searchResults()}</div>
        </>
      ) : (
        <div className="error">Nothing matches your search</div>
      )}
    </section>
  );

  return content();
};

export default CardList;

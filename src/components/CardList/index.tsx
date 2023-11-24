import { useRouter } from 'next/router';

import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import { CardListProps } from '@/config/types';

import styles from './style.module.css';

const CardList = ({ data }: CardListProps) => {
  const searchResults = () =>
    data?.results.map((item, i) => <Card item={item} key={i} />);

  const router = useRouter();
  const search = router.query.search ?? '';

  const content = () => (
    <section>
      {data ? (
        <p className={styles.resultsCount}>
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

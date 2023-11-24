import styles from './style.module.css';
import { PaginationProps } from '../../config/types';
import { updateSearchParams } from '@/utils/updateSearchParams';
import { useRouter } from 'next/router';

const Pagination = ({ itemsCount }: PaginationProps) => {
  const router = useRouter();
  const { page, itemsPerPage } = router.query;
  const itemsPerPageValue = itemsPerPage ?? 10;

  const currentPage = page ?? 1;
  const pageCount = Math.ceil(itemsCount / +itemsPerPageValue);

  const pageNumbers = () =>
    Array(pageCount)
      .fill(null)
      .map((_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    updateSearchParams((params) => {
      params.set('page', String(newPage));
      params.delete('details');
      return params;
    });
  };

  const handleItemsPerPageChange = (value: number) => {
    updateSearchParams((params) => {
      params.set('page', '1');
      params.set('itemsPerPage', String(value));
      return params;
    });
  };

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__item}>
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
      </li>
      <li className={styles.pagination__item}>
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(+currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>
      {pageNumbers().map((pageNumber) => (
        <li className={styles.pagination__item} key={pageNumber}>
          <button
            className="pagination__btn pagination__number"
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className={styles.pagination__item}>
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(+currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          &gt;
        </button>
      </li>
      <li className={styles.pagination__item}>
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(pageCount)}
          disabled={currentPage === pageCount}
        >
          &gt;&gt;
        </button>
      </li>
      <li className={styles.pagination__item}>
        Results per page: &nbsp;
        <select
          className="pagination__select"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(+e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </li>
    </ul>
  );
};

export default Pagination;

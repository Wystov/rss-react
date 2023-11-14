import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../pages/main';
import './style.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../config/types';

const Pagination = () => {
  const [, setSearchParams] = useSearchParams();

  const itemsCount = useContext(DataContext)?.count ?? 1;
  const itemsPerPage = useSelector(
    (state: RootState) => state.pagination.itemsPerPage
  );

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  const pageNumbers = () =>
    Array(pageCount)
      .fill(null)
      .map((_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    setSearchParams((params) => {
      params.set('page', String(newPage));
      params.delete('details');
      return params;
    });
  };

  const handleItemsPerPageChange = (value: number) => {
    setSearchParams((params) => {
      params.set('page', '1');
      params.set('itemsPerPage', String(value));
      return params;
    });
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
      </li>
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>
      {pageNumbers().map((pageNumber) => (
        <li className="pagination__item" key={pageNumber}>
          <button
            className="pagination__btn pagination__number"
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          &gt;
        </button>
      </li>
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => handlePageChange(pageCount)}
          disabled={currentPage === pageCount}
        >
          &gt;&gt;
        </button>
      </li>
      <li className="pagination__item">
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

import { useState } from 'react';
import { PaginationProps } from '../types';
import './pagination.css';

const Pagination = ({
  itemsCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  const pageNumbers = () =>
    Array(pageCount)
      .fill(null)
      .map((_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
      </li>
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </li>
      {pageNumbers().map((pageNumber) => (
        <li className="pagination__item" key={pageNumber}>
          <button
            className="pagination__btn pagination__number"
            onClick={() => onPageChange(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          &gt;
        </button>
      </li>
      <li className="pagination__item">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(pageCount)}
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
          onChange={(e) => setItemsPerPage(+e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </li>
    </ul>
  );
};

export default Pagination;

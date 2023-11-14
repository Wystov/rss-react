import type { RootState } from '../../config/types';
import { useState } from 'react';
import './style.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/searchSlice';

const Search = () => {
  const [query, setQuery] = useState(
    useSelector((state: RootState) => state.search.query)
  );
  const [, setSearchParams] = useSearchParams();

  const isLoading = useSelector(
    (state: RootState) => state.loader.isMainLoading
  );
  const dispatch = useDispatch();

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    localStorage.setItem('sw-search-query', query);
    dispatch(setSearch(query));
    if (query.length) {
      setSearchParams((params) => {
        params.set('search', query);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });
    }

    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
  };

  return (
    <section>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          value={query}
          onChange={updateQuery}
          spellCheck={false}
          disabled={isLoading}
        />
        <button className="search__btn" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;

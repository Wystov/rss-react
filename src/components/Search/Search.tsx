import type { SearchProps } from '../../types';
import { useState } from 'react';
import './search.css';
import { useSearchParams } from 'react-router-dom';

const Search = ({ initialValue, isFetching, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(initialValue);
  const [, setSearchParams] = useSearchParams();

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFetching) return;
    query.length
      ? setSearchParams({ search: query, page: '1' })
      : setSearchParams({ page: '1' });
    onSearch(query);
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
        />
        <button className="search__btn" type="submit" disabled={isFetching}>
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;

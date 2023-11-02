import type { SearchProps } from '../types';
import { useState } from 'react';
import './search.css';

const Search = ({ isFetching, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(
    localStorage.getItem('sw-search-query') ?? ''
  );

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFetching) return;
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
        />
        <button className="search__btn" type="submit" disabled={isFetching}>
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;

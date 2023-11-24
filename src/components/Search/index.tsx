import { useRef } from 'react';
import styles from './style.module.css';
import { updateSearchParams } from '@/utils/updateSearchParams';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current!.value;
    localStorage.setItem('sw-search-query', query);
    updateSearchParams((params) => {
      query.length ? params.set('search', query) : params.delete('search');
      params.set('page', '1');
      return params;
    });
  };

  return (
    <section>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          className={styles.search__input}
          ref={inputRef}
          type="text"
          spellCheck={false}
        />
        <button className={styles.search__btn} type="submit">
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;

import { useRef } from 'react';
import { useRouter } from 'next/router';

import { updateSearchParams } from '@/utils/updateSearchParams';

import styles from './style.module.css';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current!.value;
    localStorage.setItem('sw-search-query', query);
    const searchParams = updateSearchParams((params) => {
      query.length ? params.set('search', query) : params.delete('search');
      params.set('page', '1');
      return params;
    });
    router.push(searchParams);
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

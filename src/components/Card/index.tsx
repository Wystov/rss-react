import { useRouter } from 'next/router';

import type { CardProps } from '@/config/types';
import { updateSearchParams } from '@/utils/updateSearchParams';

import styles from './style.module.css';

const Card = ({ item }: CardProps) => {
  const id = item.url.split('/').at(-2) ?? null;
  const router = useRouter();

  const handleShowDetails = () => {
    if (!id) return;
    const searchParams = updateSearchParams((params) => {
      params.set('details', id);
      return params;
    });
    router.push(searchParams);
  };

  return (
    <div className={styles.card} onClick={handleShowDetails}>
      <span className={styles.card__name}>{item.name}</span>
      <ul>
        <li>
          <span>Birth year: </span>
          <span>{item.birth_year}</span>
        </li>
        <li>
          <span>Height: </span>
          <span>{item.height}cm</span>
        </li>
        <li>
          <span>Weight: </span>
          <span>{item.mass}kg</span>
        </li>
      </ul>
    </div>
  );
};

export default Card;

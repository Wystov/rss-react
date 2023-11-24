import { updateSearchParams } from '@/utils/updateSearchParams';
import type { CardProps } from '../../config/types';
import styles from './style.module.css';

const Card = ({ item }: CardProps) => {
  const id = item.url.split('/').at(-2) ?? null;

  const handleShowDetails = () => {
    if (!id) return;
    updateSearchParams((params) => {
      params.set('details', id);
      return params;
    });
  };

  return (
    <div className={styles.card} onClick={handleShowDetails}>
      <span className="card__name">{item.name}</span>
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

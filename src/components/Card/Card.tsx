import type { CardProps } from '../../types';
import './card.css';

const Card = ({ item, onClick }: CardProps) => {
  const id = item.url.split('/').at(-2) ?? null;

  return (
    <div className="card" onClick={() => onClick(id)}>
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

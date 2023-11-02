import type { CardProps } from '../types';
import './card.css';

const Card = ({ item }: CardProps) => (
  <div className="card">
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

export default Card;

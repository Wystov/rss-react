import { useSearchParams } from 'react-router-dom';
import type { CardProps } from '../../config/types';
import './style.css';
import { setDetailsId } from '../../store/detailsSlice';
import { useDispatch } from 'react-redux';

const Card = ({ item }: CardProps) => {
  const id = item.url.split('/').at(-2) ?? null;
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    if (!id) return;
    dispatch(setDetailsId(id));
    setSearchParams((params) => {
      params.set('details', id);
      return params;
    });
  };

  return (
    <div className="card" onClick={handleShowDetails}>
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

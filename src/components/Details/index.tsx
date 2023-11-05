import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../types';
import Preloader from '../common/Preloader';
import { getData } from '../../api/getData';
import './style.css';

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [data, setData] = useState<ResultItem | null>(null);

  useEffect(() => {
    const handleDetails = async () => {
      if (!id) return;
      const data = await getData({ id });
      if (data && 'name' in data) setData(data);
    };

    handleDetails();
  }, [id]);

  return (
    <div className="results__details">
      <h3>Details</h3>
      {data === null ? (
        <Preloader />
      ) : (
        <>
          <p>Name: {data.name}</p>
          <p>Gender: {data.gender}</p>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Birth year: {data.birth_year}</p>
          <p>Hair color: {data.hair_color}</p>
          <p>Skin color: {data.skin_color}</p>
          <p>Eye color: {data.eye_color}</p>
        </>
      )}
    </div>
  );
};

export default Details;

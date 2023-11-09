import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../types';
import Preloader from '../common/Preloader';
import { getData } from '../../api/getData';

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [data, setData] = useState<ResultItem | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const handleDetails = async () => {
      if (!id) return;
      const data = await getData({ id });
      if (data && 'name' in data) setData(data);
      setIsFetching(false);
    };

    handleDetails();
  }, [id]);

  const content = () => {
    switch (true) {
      case isFetching:
        return <Preloader />;
      case data !== null:
        return (
          <>
            <p>Name: {data?.name}</p>
            <p>Gender: {data?.gender}</p>
            <p>Height: {data?.height}</p>
            <p>Mass: {data?.mass}</p>
            <p>Birth year: {data?.birth_year}</p>
            <p>Hair color: {data?.hair_color}</p>
            <p>Skin color: {data?.skin_color}</p>
            <p>Eye color: {data?.eye_color}</p>
          </>
        );
      default:
        return <div>Failed to load details</div>;
    }
  };

  return (
    <div className="results__details">
      <h3>Details</h3>
      {content()}
    </div>
  );
};

export default Details;

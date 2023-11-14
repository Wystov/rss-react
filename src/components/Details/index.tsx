import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../config/types';
import Preloader from '../common/Preloader';
import { getData } from '../../api/getData';

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [data, setData] = useState<ResultItem | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleDetails = async () => {
      if (!id) return;
      setIsFetching(true);
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
            <p>
              Name: <span>{data?.name}</span>
            </p>
            <p>
              Gender: <span>{data?.gender}</span>
            </p>
            <p>
              Height: <span>{data?.height}</span>
            </p>
            <p>
              Mass: <span>{data?.mass}</span>
            </p>
            <p>
              Birth year: <span>{data?.birth_year}</span>
            </p>
            <p>
              Hair color: <span>{data?.hair_color}</span>
            </p>
            <p>
              Skin color: <span>{data?.skin_color}</span>
            </p>
            <p>
              Eye color: <span>{data?.eye_color}</span>
            </p>
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

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../types';
import Preloader from '../common/Preloader';
import { getData } from '../../api/getData';

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
      <p>id: {id}</p>
      {data === null ? (
        <Preloader />
      ) : (
        Object.entries(data).map((item, i) => (
          <p key={i}>
            {item[0]}
            {item[1]}
          </p>
        ))
      )}
    </div>
  );
};

export default Details;

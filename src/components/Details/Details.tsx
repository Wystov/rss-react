import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../types';

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const [data, setData] = useState<ResultItem | null>(null);

  const getDetails = async () => {
    const url = 'https://swapi.dev/api/people/' + id;
    const response = await fetch(url);
    const details: ResultItem = await response.json();
    setData(details);
  };

  getDetails();

  return (
    <div className="results__details">
      <h3>Details</h3>
      <p>id: {id}</p>
      {data === null ? (
        <p>Loading...</p>
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

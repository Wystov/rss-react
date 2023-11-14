import type { RootState } from '../../config/types';
import Preloader from '../common/Preloader';
import { useSelector } from 'react-redux';
import { useGetDetailsQuery } from '../../api/getData';

const Details = () => {
  const isLoading = useSelector(
    (state: RootState) => state.loader.isDetailsLoading
  );

  const id = useSelector((state: RootState) => state.details.id);

  const { data } = useGetDetailsQuery({ id: id!.toString() });

  const content = () => {
    switch (true) {
      case isLoading:
        return <Preloader />;
      case data !== undefined:
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

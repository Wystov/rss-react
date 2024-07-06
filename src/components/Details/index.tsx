import type { RootState } from '../../config/types';
import Preloader from '../common/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDetailsQuery } from '../../api/getData';
import { useSearchParams } from 'react-router-dom';
import { setDetailsId } from '../../store/detailsSlice';
import CloseBtn from '../common/CloseBtn/CloseBtn';
import './style.css';

const Details = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const [, setSearchParams] = useSearchParams();

  const showDetails = useSelector(
    (state: RootState) => state.details.id !== null
  );

  const isLoading = useSelector(
    (state: RootState) => state.loader.isDetailsLoading
  );

  const id = useSelector((state: RootState) => state.details.id);

  const { data } = useGetDetailsQuery({ id: id!.toString() });

  const dispatch = useDispatch();

  const closeDetails = () => {
    if (showDetails) {
      dispatch(setDetailsId(null));
      setSearchParams((params) => {
        params.delete('details');
        return params;
      });
    }
  };

  const content = () => {
    switch (true) {
      case isLoading:
        return <Preloader />;
      case data !== undefined:
        return (
          <div>
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
          </div>
        );
      default:
        return <div>Failed to load details</div>;
    }
  };

  return (
    <>
      <div className="overlay" onClick={closeDetails} />
      <div className="details">
        <h3>Details</h3>
        {content()}
        <CloseBtn onClick={closeDetails} />
      </div>
    </>
  );
};

export default Details;

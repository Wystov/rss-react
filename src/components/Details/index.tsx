// import { useGetDetailsQuery } from '../../api/getData';
import CloseBtn from '../common/CloseBtn/CloseBtn';
// import './style.css';
import { updateSearchParams } from '@/utils/updateSearchParams';

const Details = ({ details }) => {
  // const searchParams = new URLSearchParams(window.location.search);

  // const id = searchParams.get('details');

  // const { data } = useGetDetailsQuery({ id: id!.toString() });

  const closeDetails = () => {
    updateSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  const content = () =>
    details !== undefined ? (
      <div>
        <p>
          Name: <span>{details?.name}</span>
        </p>
        <p>
          Gender: <span>{details?.gender}</span>
        </p>
        <p>
          Height: <span>{details?.height}</span>
        </p>
        <p>
          Mass: <span>{details?.mass}</span>
        </p>
        <p>
          Birth year: <span>{details?.birth_year}</span>
        </p>
        <p>
          Hair color: <span>{details?.hair_color}</span>
        </p>
        <p>
          Skin color: <span>{details?.skin_color}</span>
        </p>
        <p>
          Eye color: <span>{details?.eye_color}</span>
        </p>
      </div>
    ) : (
      <div>Failed to load details</div>
    );

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

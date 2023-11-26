import { useRouter } from 'next/router';

import CloseBtn from '@/components/common/CloseBtn/CloseBtn';
import { DetailsProps } from '@/config/types';
import { updateSearchParams } from '@/utils/updateSearchParams';

import styles from './style.module.css';

const Details = ({ details }: DetailsProps) => {
  const router = useRouter();
  const closeDetails = () => {
    const searchParams = updateSearchParams((params) => {
      params.delete('details');
      return params;
    });
    router.push(searchParams);
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
      <div className={styles.overlay} onClick={closeDetails} />
      <div className={styles.details}>
        <h3>Details</h3>
        {content()}
        <CloseBtn onClick={closeDetails} />
      </div>
    </>
  );
};

export default Details;

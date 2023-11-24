import { useState } from 'react';

import styles from './style.module.css';

const ErrorComponent = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) throw new Error('Manual error was thrown');

  return (
    <button className={styles.errorBtn} onClick={throwError}>
      Throw error
    </button>
  );
};

export default ErrorComponent;

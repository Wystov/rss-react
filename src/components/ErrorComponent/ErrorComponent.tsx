import { useState } from 'react';
import './errorComponent.css';

const ErrorComponent = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) throw new Error('Manual error was thrown');

  return (
    <button className="error-btn" onClick={throwError}>
      Throw error
    </button>
  );
};

export default ErrorComponent;

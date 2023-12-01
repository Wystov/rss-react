import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/types';

export const MainPage = () => {
  const controlledFormData = useSelector(
    (state: RootState) => state.forms.controlledForm
  );
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.forms.uncontrolledForm
  );
  console.log(controlledFormData);
  return (
    <>
      <h1>Main page</h1>
      <Link to={'/uncontrolled-form'}>Uncontrolled form</Link>
      <Link to={'/react-hook-form'}>React hook form</Link>
      <div>
        <h2>uncontrolled form</h2>
        {uncontrolledFormData ? (
          Object.entries(uncontrolledFormData).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))
        ) : (
          <p>no data submited</p>
        )}
      </div>
      <div>
        <h2>controlled form</h2>
        {controlledFormData ? (
          Object.entries(controlledFormData).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))
        ) : (
          <p>no data submited</p>
        )}
      </div>
    </>
  );
};

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SubmittedFormInfo } from '@/components/SubmittedFormInfo';
import { RootState } from '@/types';

export const MainPage = () => {
  const controlledFormData = useSelector(
    (state: RootState) => state.forms.controlledForm
  );
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.forms.uncontrolledForm
  );

  return (
    <>
      <h1>Main page</h1>
      <Link to={'/uncontrolled-form'}>Uncontrolled form</Link>
      <Link to={'/react-hook-form'}>React hook form</Link>
      <div>
        <h2>uncontrolled form {`(${uncontrolledFormData.length})`}</h2>
        {uncontrolledFormData.length ? (
          <SubmittedFormInfo data={uncontrolledFormData} />
        ) : (
          <p>no data submited</p>
        )}
      </div>
      <div>
        <h2>controlled form {`(${controlledFormData.length})`}</h2>
        {controlledFormData.length ? (
          <SubmittedFormInfo data={controlledFormData} />
        ) : (
          <p>no data submited</p>
        )}
      </div>
    </>
  );
};

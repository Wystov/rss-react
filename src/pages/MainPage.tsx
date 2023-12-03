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
    <div className="main-container">
      <h1>Main page</h1>
      <nav className="links">
        <Link to={'/uncontrolled-form'}>Uncontrolled form</Link>
        <Link to={'/react-hook-form'}>React hook form</Link>
      </nav>
      <div className="results-container">
        <div className="uncontrolled">
          <h2>Uncontrolled form {`(${uncontrolledFormData.length})`}</h2>
          {uncontrolledFormData.length ? (
            <SubmittedFormInfo data={uncontrolledFormData} />
          ) : (
            <p style={{ textAlign: 'center' }}>No data submited</p>
          )}
        </div>
        <div className="controlled">
          <h2>Controlled form {`(${controlledFormData.length})`}</h2>
          {controlledFormData.length ? (
            <SubmittedFormInfo data={controlledFormData} />
          ) : (
            <p style={{ textAlign: 'center' }}>No data submited</p>
          )}
        </div>
      </div>
    </div>
  );
};

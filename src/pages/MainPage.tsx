import { Link } from 'react-router-dom';

export const MainPage = () => (
  <>
    <h1>Main page</h1>
    <Link to={'/uncontrolled-form'}>Uncontrolled form</Link>
    <Link to={'/react-hook-form'}>React hook form</Link>
  </>
);

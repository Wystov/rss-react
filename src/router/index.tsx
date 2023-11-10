import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Details from '../components/Details';
import Error404 from '../pages/Error404';
import App from '../App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

export default router;

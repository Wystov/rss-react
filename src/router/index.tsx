import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { ReactHookForm } from '@/pages/ReactHookForm';
import { UncontrolledForm } from '@/pages/UncontrolledForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainPage />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/react-hook-form" element={<ReactHookForm />} />
    </Route>
  )
);

export default router;

import App from '@renderer/App';
import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@renderer/views/welcome'))
      }
    ]
  }
]);
export default router;

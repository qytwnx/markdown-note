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
      },
      {
        path: 'note',
        Component: lazy(() => import('@renderer/views/note'))
      }
    ]
  }
]);
export default router;

import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import UpdateLayout from './layouts/UpdatesLayout';

import Schedule from './pages/Schedule';
import Holidays from './pages/Holidays';
import Updates from './pages/Updates';
import Update from './pages/Update';
import Info from './pages/Info';
import ServerErrorPage from './pages/ServerErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        index: true,
        element: <Schedule />,
      },
      {
        path: 'info',
        element: <Info />,
      },
      {
        path: 'holidays',
        element: <Holidays />,
      },
      {
        path: 'updates',
        element: <UpdateLayout />,
        children: [
          {
            index: true,
            element: <Updates />,
          },
          {
            path: ':id',
            element: <Update />,
          },
        ]
      },
    ],
  },
]);

export default router;
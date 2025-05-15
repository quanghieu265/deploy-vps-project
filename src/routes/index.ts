import ErrorBoundary from '@/components/templates/ErrorBoundary';
import ProtectedLayout from '@/components/templates/ProtectedLayout';
import PublicLayout from '@/components/templates/PublicLayout';
import HomePage from '@/components/pages/HomePage';
import AuthRoutes from '@/routes//AuthRoutes';
import UserRoutes from '@/routes/UserRoutes';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: ProtectedLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      ...UserRoutes,
    ],
  },
  {
    path: '/auth',
    Component: PublicLayout,
    children: AuthRoutes,
  },
];

const router = createBrowserRouter(routes);
export default router;

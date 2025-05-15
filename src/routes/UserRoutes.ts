import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const UsersPage = lazy(() => import('@/components/pages/user/UsersPage'));

const UserRoutes: RouteObject[] = [
  {
    path: 'users',
    Component: UsersPage,
  },
];

export default UserRoutes;

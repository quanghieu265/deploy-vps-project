import { RootState } from '@/store/store';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from '@/components/organisms/Header';

function PublicLayout() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return !userInfo?.isAuthenticated ? (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1>Public Layout</h1>
          <Outlet />
        </div>
      </Suspense>
      <Toaster></Toaster>
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default PublicLayout;

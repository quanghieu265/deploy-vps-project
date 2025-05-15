import { Toaster } from '@/components/ui/sonner';
import type { RootState } from '@/store/store';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';

function ProtectedLayout() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo?.isAuthenticated ? (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1>Protected Layout</h1>
          <Outlet />
        </div>
      </Suspense>
      <Toaster></Toaster>
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default ProtectedLayout;

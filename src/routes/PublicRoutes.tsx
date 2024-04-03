import Loader from '@/components/Loader/Loader';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyHome = lazy(() => import('@/pages/Home/Home'));

const PublicRoutes = (): React.ReactNode => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
      </Routes>
    </Suspense>
  );
};
export default PublicRoutes;

import Loader from '@/components/Loader/Loader';
import GlobalLayout from '@/layouts/GlobalLayout/GlobalLayout';
import PodcastLayout from '@/layouts/PodcastLayout/PodcastLayout';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyHome = lazy(() => import('@/pages/Home/Home'));
const LazyPodcastDetail = lazy(() => import('@/pages/PodcastDetail/PodcastDetail'));

const PublicRoutes = (): React.ReactNode => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<LazyHome />} />
          <Route path="/podcast/*" element={<PodcastLayout />}>
            <Route path=":podcastId" element={<LazyPodcastDetail />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
export default PublicRoutes;

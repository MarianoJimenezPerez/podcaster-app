import Loader from '@/components/Loader/Loader';
import { PodcastProvider } from '@/context/PodcastContext';
import GlobalLayout from '@/layouts/GlobalLayout/GlobalLayout';
import PodcastLayout from '@/layouts/PodcastLayout/PodcastLayout';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyHome = lazy(() => import('@/pages/Home/Home'));
const LazyPodcastDetail = lazy(() => import('@/pages/PodcastDetail/PodcastDetail'));
const LazyEpisodeDetail = lazy(() => import('@/pages/EpisodeDetail/EpisodeDetail'));

const PublicRoutes = (): React.ReactNode => {
  return (
    <Suspense fallback={<Loader />}>
      <PodcastProvider>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<LazyHome />} />
            <Route path="/podcast/*" element={<PodcastLayout />}>
              <Route path=":podcastId" element={<LazyPodcastDetail />} />
              <Route path=":podcastId/episode/:episodeId" element={<LazyEpisodeDetail />} />
            </Route>
          </Route>
        </Routes>
      </PodcastProvider>
    </Suspense>
  );
};
export default PublicRoutes;

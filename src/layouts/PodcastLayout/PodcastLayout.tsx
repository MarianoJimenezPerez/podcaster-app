import PodcastSidebar from '@/components/PodcastSidebar/PodcastSidebar';
import { Outlet, useParams } from 'react-router-dom';
import useGetPodcastById from '@/hooks/useGetPodcastById';
import { useFetchingContext } from '@/hooks/useFetchingContext';
import Loader from '@/components/Loader/Loader';
import './podcastsLayout.scss';
import { useEffect } from 'react';
import { usePodcastContext } from '@/hooks/usePodcastContext';

const PodcastLayout: React.FC = () => {
  const { podcastId } = useParams();
  const { podcast } = useGetPodcastById(podcastId ?? '');
  const { isFetching } = useFetchingContext();
  const { updatePodcastDetail } = usePodcastContext();

  useEffect(() => {
    if (podcast) {
      updatePodcastDetail(podcast);
    }
  }, [podcast, updatePodcastDetail]);

  return (
    <main className="container">
      {' '}
      <section className="podcast__details">
        {isFetching && <Loader />}
        {!isFetching && podcast && (
          <>
            <PodcastSidebar />
            <Outlet />
          </>
        )}
      </section>
    </main>
  );
};
export default PodcastLayout;

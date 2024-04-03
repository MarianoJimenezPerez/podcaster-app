import PodcastSidebar from '@/components/PodcastSidebar/PodcastSidebar';
import { Outlet } from 'react-router-dom';
import { PodcastProvider } from '@/context/PodcastContext';
import './podcastsLayout.scss';

const PodcastLayout: React.FC = () => {
  return (
    <PodcastProvider>
      <main className="container">
        {' '}
        <section className="podcast__details">
          <PodcastSidebar />
          <Outlet />
        </section>
      </main>
    </PodcastProvider>
  );
};
export default PodcastLayout;

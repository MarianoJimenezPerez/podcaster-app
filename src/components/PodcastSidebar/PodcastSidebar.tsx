import { useParams } from 'react-router-dom';
import useGetPodcastById from '@/hooks/useGetPodcastById';
import './podcastSidebar.scss';

const PodcastSidebar: React.FC = () => {
  const { podcastId } = useParams();
  const { podcast, isLoading, isError } = useGetPodcastById(podcastId!);

  return (
    <aside className="sidebar shadow">
      {isLoading && <p>Loading...</p>}
      {isError && !podcast && !isLoading && <p>Something went wrong. Try again later</p>}
      {podcast && !isError && !isLoading && (
        <div>
          <img src={podcast.artworkUrl100} alt={podcast.collectionName} /> {/* podcast image */}
        </div>
      )}
      <div>
        {podcast && !isError && !isLoading && (
          <>
            <h2>{podcast.collectionName}</h2>
            <h3>
              by <i>{podcast.artistName}</i>
            </h3>
            <p>
              <span>Description: </span>
              {podcast.description}
            </p>
          </>
        )}
      </div>
    </aside>
  );
};
export default PodcastSidebar;

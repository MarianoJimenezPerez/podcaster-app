import { Link, useParams } from 'react-router-dom';
import { usePodcastContext } from '@/hooks/usePodcastContext';
import './podcastSidebar.scss';

const PodcastSidebar: React.FC = () => {
  const { podcastDetail } = usePodcastContext();
  const { podcastId } = useParams();

  return (
    <aside className="sidebar shadow">
      {podcastDetail && (
        <>
          <Link to={`/podcast/${podcastId}`}>
            <img src={podcastDetail?.artworkUrl100} alt={podcastDetail?.collectionName} />
          </Link>
          <div>
            <Link to={`/podcast/${podcastId}`}>
              <h2>{podcastDetail?.collectionName}</h2>
            </Link>{' '}
            <h3>
              by{' '}
              <Link to={`/podcast/${podcastId}`}>
                <i>{podcastDetail.artistName}</i>
              </Link>
            </h3>
            <p>
              <span>Description: </span>
              {podcastDetail.description}
            </p>
          </div>
        </>
      )}
    </aside>
  );
};
export default PodcastSidebar;

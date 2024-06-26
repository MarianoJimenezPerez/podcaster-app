import { Podcast } from '@/types';
import { Link } from 'react-router-dom';
import './podcastCard.scss';

interface PodcastCartProps {
  podcast: Podcast;
  dataTestId?: string;
}

const PodcastCard: React.FC<PodcastCartProps> = ({ podcast, dataTestId }) => {
  return (
    <Link
      className="podcast__card shadow"
      to={`/podcast/${podcast.id.attributes['im:id']}`}
      data-testid={dataTestId}>
      <article>
        <div className="heading">
          <img src={podcast['im:image'][0].label} alt={podcast['im:image'][0].label} />
        </div>
        <div className="description">
          <h3>{podcast['im:name'].label}</h3>
          <h5>Author: {podcast['im:artist'].label}</h5>
        </div>
      </article>
    </Link>
  );
};

export default PodcastCard;

import { Link } from 'react-router-dom';
import useGetPodcastEpisodes from './hooks/useGetPodcastEpisodes';
import './podcastDetail.scss';
import { usePodcastContext } from '@/hooks/usePodcastContext';

const PodcastDetail: React.FC = () => {
  const { podcastDetail } = usePodcastContext();
  const feedUrl = podcastDetail?.feedUrl || '';
  const { episodes } = useGetPodcastEpisodes(feedUrl);
  return (
    <div className="episodes__section">
      {' '}
      <h3 className="shadow">Episodes: {episodes?.length}</h3>
      <div className="shadow">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes?.map((episode, index) => (
              <tr key={index}>
                <td>
                  <Link to={`./episode/${episode.guid}`}>{episode.title}</Link>
                </td>
                <td>{episode.pubDate}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PodcastDetail;

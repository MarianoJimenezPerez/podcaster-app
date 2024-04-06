import { usePodcastContext } from '@/hooks/usePodcastContext';
import useGetPodcastEpisodes from './hooks/useGetPodcastEpisodes';
import './podcastDetail.scss';
import Loader from '@/components/Loader/Loader';
import { Link } from 'react-router-dom';

const PodcastDetail: React.FC = () => {
  const { podcastDetail } = usePodcastContext();
  const { episodes, isLoading, isError } = useGetPodcastEpisodes(podcastDetail);

  const errorMessage = isError && 'Something went wrong. Try again later';

  return (
    <div className="episodes__section">
      {isLoading && <Loader />}
      {!isLoading && episodes && (
        <>
          <h3 className="shadow">Episodes: {episodes?.length || 0}</h3>
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
                {errorMessage && (
                  <tr>
                    <td colSpan={3}>
                      <p>{errorMessage}</p>
                    </td>
                  </tr>
                )}
                {episodes?.map((episode) => (
                  <tr key={episode.guid}>
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
        </>
      )}
    </div>
  );
};

export default PodcastDetail;

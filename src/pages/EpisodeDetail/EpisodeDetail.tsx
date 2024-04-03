import { useParams } from 'react-router-dom';
import './episodeDetail.scss';
import useGetEpisode from './hooks/useGetEpisode';
import { usePodcastContext } from '@/hooks/usePodcastContext';
import Loader from '@/components/Loader/Loader';

const EpisodeDetail: React.FC = () => {
  const { podcastDetail } = usePodcastContext();
  const feedUrl = podcastDetail?.feedUrl || '';
  const { episodeId } = useParams();
  const { episode, isLoading } = useGetEpisode(feedUrl, episodeId!);
  return (
    <div className="episodes__section">
      <div className="shadow">
        {isLoading && <Loader />}
        {!isLoading && episode && episode !== null && (
          <>
            <h3>{episode[0].title}</h3>
            <p>{episode[0].description}</p>
            <audio controls autoPlay style={{ width: '100%', marginTop: '1rem' }}>
              <source src={episode[0].enclosure || ''} type="audio/mpeg" />
              Tu navegador no soporta la reproducción de audio.
            </audio>
          </>
        )}
      </div>
    </div>
  );
};
export default EpisodeDetail;

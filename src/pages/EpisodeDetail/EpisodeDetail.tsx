import { useParams } from 'react-router-dom';
import useGetEpisode from './hooks/useGetEpisode';
import { usePodcastContext } from '@/hooks/usePodcastContext';
import Loader from '@/components/Loader/Loader';
import './episodeDetail.scss';

const EpisodeDetail: React.FC = () => {
  const { podcastDetail } = usePodcastContext();
  const { episodeId } = useParams();

  const { episode, isLoading, isError } = useGetEpisode(podcastDetail, episodeId!);

  const errorMessage = isError && 'Something went wrong. Try again later';

  console.log(isLoading);

  console.log(episode);

  console.log(isError);
  return (
    <div className="episodes__section">
      <div className="shadow">
        {errorMessage && <p>{errorMessage}</p>}
        {isLoading && <Loader />}
        {!isLoading && episode && (
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

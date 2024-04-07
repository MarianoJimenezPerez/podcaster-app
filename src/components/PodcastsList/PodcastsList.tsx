import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PodcastCard from '../PodcastCard/PodcastCard';
import Loader from '../Loader/Loader';
import './podcastsList.scss';
import { useGetPodcasts } from '@/hooks/useGetPodcasts';
import { useFetchingContext } from '@/hooks/useFetchingContext';

const PodcastsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { podcasts: data, isError } = useGetPodcasts();

  const { isFetching } = useFetchingContext();

  const filteredPodcasts = data
    ? [...data].filter(
        (podcast) =>
          podcast['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          podcast['im:artist'].label.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : [];

  return (
    <>
      <SearchBar
        onSearch={(term: string) => setSearchTerm(term)}
        resultsAmount={filteredPodcasts.length}
      />
      <section className="podcasts__list">
        <div className="container">
          {isFetching && <Loader />}
          {!isFetching && isError && <p>Something went wrong. Try again later.</p>}
          {!isFetching && !isError && filteredPodcasts?.length === 0 && <p>No podcasts found.</p>}
          {!isError &&
            !isFetching &&
            filteredPodcasts &&
            filteredPodcasts.map((_podcast, index) => (
              <PodcastCard
                podcast={_podcast}
                key={_podcast.id.attributes['im:id']}
                dataTestId={`podcast-${index}`}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default PodcastsList;

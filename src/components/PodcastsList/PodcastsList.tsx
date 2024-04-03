import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PodcastCard from '../PodcastCard/PodcastCard';
import Loader from '../Loader/Loader';
import './podcastsList.scss';
import { useGetPodcasts } from '@/hooks/useGetPodcasts';

const PodcastsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { podcasts: data, isLoading, isError } = useGetPodcasts();

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
          {isLoading && <Loader />}
          {!isLoading && isError && <p>Something went wrong. Try again later.</p>}
          {!isLoading && filteredPodcasts?.length === 0 && <p>No podcasts found.</p>}
          {!isError &&
            !isLoading &&
            filteredPodcasts &&
            filteredPodcasts.map((_podcast) => (
              <PodcastCard podcast={_podcast} key={_podcast.id.attributes['im:id']} />
            ))}
        </div>
      </section>
    </>
  );
};

export default PodcastsList;

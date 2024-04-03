import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PodcastCard from '../PodcastCard/PodcastCard';
import { PODCAST } from '@/mock/podcast';
import './podcastsList.scss';

const PodcastsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  console.log(searchTerm);

  return (
    <>
      <SearchBar onSearch={(term: string) => setSearchTerm(term)} resultsAmount={10} />
      <section className="podcasts__list">
        <div className="container">
          <PodcastCard podcast={PODCAST} />
          <PodcastCard podcast={PODCAST} />
          <PodcastCard podcast={PODCAST} />
          <PodcastCard podcast={PODCAST} />
          <PodcastCard podcast={PODCAST} />
        </div>
      </section>
    </>
  );
};

export default PodcastsList;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '@/utils/functions/formatDate';
import { EpisodeDetail } from '@/types';

interface UseGetPodcastEpisodesReturnType {
  episodes: EpisodeDetail[] | null;
  isLoading: boolean;
  isError: boolean;
}

const useGetPodcastEpisodes = (feedUrl: string): UseGetPodcastEpisodesReturnType => {
  const [episodes, setEpisodes] = useState<EpisodeDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(feedUrl, {
          responseType: 'text',
          withCredentials: false
        }); // no need the base url, so use axios directly

        if (window.DOMParser) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');

          const tags = xmlDoc.getElementsByTagName('item');
          const processedEpisodes = [];

          for (let i = 0; i < tags.length; i++) {
            const item = tags[i];
            const guid = item.getElementsByTagName('guid')[0].textContent;
            const title = item.getElementsByTagName('title')[0].textContent;
            const description = item.getElementsByTagName('description')[0].textContent;
            const pubDate = item.getElementsByTagName('pubDate')[0].textContent;
            const duration = item.getElementsByTagName('itunes:duration')[0].textContent;

            processedEpisodes.push({
              guid,
              title,
              description,
              pubDate: pubDate ? formatDate(pubDate) : '',
              duration
            });
          }
          setEpisodes(processedEpisodes);
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [feedUrl]);

  return { episodes, isLoading, isError };
};

export default useGetPodcastEpisodes;

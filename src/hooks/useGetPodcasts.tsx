import { useEffect, useState } from 'react';
import { Podcast } from '@/types';
import { getPodcasts } from '@/services/getPodcasts';
import { useFetchingContext } from './useFetchingContext';

interface UseGetPodcastsReturnType {
  podcasts: Podcast[];
  isError: boolean;
}

export const useGetPodcasts = (): UseGetPodcastsReturnType => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { updateFetching } = useFetchingContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateFetching(true);

        // will manage the client persistance
        // check if podcasts are stored in local storage and have a valid time period
        // in the future this block could be a independient service
        const localPodcasts = localStorage.getItem('podcasts');
        const localTimestamp = localStorage.getItem('podcasts_timestamp');

        if (
          localPodcasts &&
          localTimestamp &&
          Date.now() - parseInt(localTimestamp) < 1000 * 60 * 60 * 24 // 24 hours
        ) {
          setPodcasts(JSON.parse(localPodcasts));
        } else {
          // will manage the async persistance & fetching
          const podcasts = await getPodcasts();
          setPodcasts(podcasts.feed.entry);
          localStorage.setItem('podcasts', JSON.stringify(podcasts.feed.entry));
          localStorage.setItem('podcasts_timestamp', Date.now().toString());
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        updateFetching(false);
      }
    };

    fetchData();
  }, [updateFetching]);

  return { podcasts, isError };
};

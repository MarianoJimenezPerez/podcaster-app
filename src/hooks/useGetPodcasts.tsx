import { axiosInstance } from '@/axios/config';
import { useEffect, useState } from 'react';
import { Podcast } from '@/types';

interface UseGetPodcastsReturnType {
  podcasts: Podcast[];
  isLoading: boolean;
  isError: boolean;
}

export const useGetPodcasts = (): UseGetPodcastsReturnType => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // will manage the local persistance
        // check if podcasts are stored in local storage and have a valid time period
        const localPodcasts = localStorage.getItem('podcasts');
        const localTimestamp = localStorage.getItem('podcastsTimestamp');

        if (
          localPodcasts &&
          localTimestamp &&
          Date.now() - parseInt(localTimestamp) < 1000 * 60 * 60 * 24 // 24 hours
        ) {
          setPodcasts(JSON.parse(localPodcasts));
          setIsLoading(false);
        } else {
          // will manage the async persistance & fetching
          const response = await axiosInstance.get('/us/rss/toppodcasts/limit=100/genre=1310/json'); // blocking maximium items, in the future limit could be a prop
          setPodcasts(response.data.feed.entry);
          localStorage.setItem('podcasts', JSON.stringify(response.data.feed.entry));
          localStorage.setItem('podcastsTimestamp', Date.now().toString());
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { podcasts, isLoading, isError };
};

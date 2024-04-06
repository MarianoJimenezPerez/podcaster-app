import { useState, useEffect } from 'react';
import { PodcastDetail } from '@/types';
import { transformHtmlToText } from '@/utils/functions/transformHTMLToText';
import { getPodcast } from '@/services/getPodcast';
import { getPodcastDescription } from '@/services/getPodcastDescription';
import { useFetchingContext } from './useFetchingContext';

interface UseGetPodcastByIdReturnType {
  podcast: PodcastDetail | null;
  isError: boolean;
}

const useGetPodcastById = (podcastId: string): UseGetPodcastByIdReturnType => {
  const [podcast, setPodcast] = useState<PodcastDetail | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const { updateFetching } = useFetchingContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateFetching(true);
        const localPodcast = localStorage.getItem(`podcast_${podcastId}`);
        const localTimestamp = localStorage.getItem(`podcast_${podcastId}_timestamp`);

        if (
          localPodcast &&
          localTimestamp &&
          Date.now() - parseInt(localTimestamp) < 1000 * 60 * 60 * 24 // 24 hours
        ) {
          setPodcast(JSON.parse(localPodcast));
        } else {
          const abortController = new AbortController();
          const podcastResponse = await getPodcast(podcastId, abortController.signal);
          const data = podcastResponse.results[0];

          const descriptionResponse = await getPodcastDescription(data.feedUrl);

          data.description = transformHtmlToText(descriptionResponse);

          localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(data));
          localStorage.setItem(`podcast_${podcastId}_timestamp`, Date.now().toString());

          setPodcast(data);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        updateFetching(false);
      }
    };

    fetchData();
  }, [podcastId]);

  return { podcast, isError };
};

export default useGetPodcastById;

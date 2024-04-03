import { useState, useEffect } from 'react';
import { axiosInstance } from '@/axios/config';
import { PodcastDetail } from '@/types';
import axios from 'axios';
import { transformHtmlToText } from '@/utils/functions/transformHTMLToText';
import { usePodcastContext } from './usePodcastContext';

interface PodcastDetailWithDescription extends PodcastDetail {
  description: string;
}

interface UseGetPodcastByIdReturnType {
  podcast: PodcastDetailWithDescription | null;
  isLoading: boolean;
  isError: boolean;
}

const useGetPodcastById = (podcastId: string): UseGetPodcastByIdReturnType => {
  const [podcast, setPodcast] = useState<PodcastDetailWithDescription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { setPodcastDetail } = usePodcastContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // will manage the local persistance
        // check if podcast with the given ID is stored in local storage and valid
        const localPodcast = localStorage.getItem(`podcast_${podcastId}`);
        const localTimestamp = localStorage.getItem(`podcast_${podcastId}_timestamp`);

        if (
          localPodcast &&
          localTimestamp &&
          Date.now() - parseInt(localTimestamp) < 1000 * 60 * 60 * 24 // 24 hours
        ) {
          setPodcastDetail(JSON.parse(localPodcast)); // <--- set podcast in to the PodcastContext
          setPodcast(JSON.parse(localPodcast));
          setIsLoading(false);
        } else {
          // will manage the async persistance & fetching
          const response = await axiosInstance.get(
            `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcast`
          );
          const data = response.data.results[0];
          setPodcastDetail(data); // <--- set podcast in to the PodcastContext

          // get podcast description by a feedUrl, in the future could separate in a independent service if need it
          const descriptionResponse = await axios.get(data.feedUrl, {
            responseType: 'text',
            withCredentials: false
          }); // no need the base url, so use axios directly

          if (window.DOMParser) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(descriptionResponse.data, 'text/xml');

            const desc = xmlDoc.getElementsByTagName('description');

            if (desc[0].textContent) {
              data.description = transformHtmlToText(desc[0].textContent);
            }
          }

          setPodcast(data);
          localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(data));
          localStorage.setItem(`podcast_${podcastId}_timestamp`, Date.now().toString());
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [podcastId, setPodcastDetail]);

  return { podcast, isLoading, isError };
};

export default useGetPodcastById;

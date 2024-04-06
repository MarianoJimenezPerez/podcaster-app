import { getFeed } from '@/services/getFeed';
import { EpisodeDetail, EpisodeFromFeed, PodcastDetail } from '@/types';
import { formatDate } from '@/utils/functions/formatDate';
import { useEffect, useState, useCallback } from 'react';
import { xml2json } from 'xml-js';

interface UseGetPodcastEpisodesReturnType {
  episodes: EpisodeDetail[] | null;
  isError: boolean;
  isLoading: boolean;
}

const useGetPodcastEpisodes = (
  podcastDetail: PodcastDetail | null
): UseGetPodcastEpisodesReturnType => {
  const [episodes, setEpisodes] = useState<EpisodeDetail[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (podcastDetail === null) {
      return;
    }

    try {
      setIsLoading(true);
      const abortController = new AbortController();
      const feedDataXml = await getFeed(podcastDetail.feedUrl, abortController.signal);

      if (feedDataXml) {
        const feedDataJson = xml2json(feedDataXml, { compact: true, spaces: 4 });
        const parsedFeed = JSON.parse(feedDataJson);

        const episodesJson = parsedFeed?.rss?.channel?.item;

        const processedEpisodes: EpisodeDetail[] = episodesJson.map((ep: EpisodeFromFeed) => {
          const duration = ep['itunes:duration']?._text || 'Unknown';
          return {
            guid: ep.guid?._text || ep.guid?._cdata || '',
            title: ep.title?._text || '',
            description: ep.description?._text || '',
            pubDate: formatDate(ep.pubDate?._text) || '',
            duration
          };
        });

        setEpisodes(processedEpisodes);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [podcastDetail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { episodes, isError, isLoading };
};

export default useGetPodcastEpisodes;

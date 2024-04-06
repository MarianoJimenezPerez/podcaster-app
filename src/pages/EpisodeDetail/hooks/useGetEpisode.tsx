import { useState, useEffect } from 'react';
import { transformHtmlToText } from '@/utils/functions/transformHTMLToText';
import { Episode, PodcastDetail } from '@/types';
import { getFeed } from '@/services/getFeed';
import { xml2json } from 'xml-js';

interface useGetEpisodeReturnType {
  episode: Episode[] | null;
  isError: boolean;
  isLoading: boolean;
}

const useGetEpisode = (
  podcastDetail: PodcastDetail | null,
  episodeId: string
): useGetEpisodeReturnType => {
  const [episode, setEpisode] = useState<Episode[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!podcastDetail || !episodeId) {
        return;
      }

      try {
        setIsLoading(true);
        const abortController = new AbortController();
        const xmlFeedData = await getFeed(podcastDetail.feedUrl, abortController.signal);
        const jsonFeedData = xml2json(xmlFeedData, { compact: true, spaces: 4 });
        const parsedFeed = JSON.parse(jsonFeedData);

        const items = parsedFeed.rss.channel.item;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const guid = item.guid._text;
          if (guid === episodeId) {
            console.log(item);
            const title = item.title._text;
            const description = item.description._cdata;

            const enclosure = item.enclosure._attributes.url ?? '';

            setEpisode(() => [
              {
                guid,
                title,
                description: transformHtmlToText(description ?? ''),
                enclosure
              }
            ]);
          }
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [podcastDetail, episodeId]);

  return { episode, isError, isLoading };
};

export default useGetEpisode;

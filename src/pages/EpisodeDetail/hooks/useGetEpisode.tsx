import { useState, useEffect } from 'react';
import axios from 'axios';
import { transformHtmlToText } from '@/utils/functions/transformHTMLToText';
import { Episode } from '@/types';

interface useGetEpisodeReturnType {
  episode: Episode[] | null;
  isLoading: boolean;
  isError: boolean;
}

const useGetEpisode = (feedUrl: string, episodeId: string): useGetEpisodeReturnType => {
  const [episode, setEpisode] = useState<Episode[] | null>(null);
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
          for (let i = 0; i < tags.length; i++) {
            const item = tags[i];
            const guid = item.getElementsByTagName('guid')[0].textContent;
            if (guid === episodeId) {
              console.log(guid);
              const title = item.getElementsByTagName('title')[0].textContent;
              const description = item.getElementsByTagName('description')[0].textContent;

              const enclosureTag = item.getElementsByTagName('enclosure')[0];
              const enclosure = enclosureTag ? enclosureTag.getAttribute('url') : null;

              setEpisode(() => [
                {
                  guid,
                  title,
                  description: transformHtmlToText(description || ''),
                  enclosure
                }
              ]);
            }
          }

          console.log(episode);
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [episodeId, feedUrl]);

  return { episode, isLoading, isError };
};

export default useGetEpisode;

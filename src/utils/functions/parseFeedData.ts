import { EpisodeDetail, EpisodeFromFeed } from '@/types';
import { xml2json } from 'xml-js';
import { formatDate } from '@/utils/functions/formatDate';

export const parseFeedData = (feedDataXml: string): EpisodeDetail[] => {
  const feedDataJson = xml2json(feedDataXml, { compact: true, spaces: 4 });
  const parsedFeed = JSON.parse(feedDataJson);
  const episodesJson = parsedFeed?.rss?.channel?.item;

  if (!Array.isArray(episodesJson)) {
    return [];
  }

  return episodesJson.map((ep: EpisodeFromFeed) => ({
    guid: ep.guid?._text ?? '',
    title: ep.title?._text ?? '',
    description: ep.description?._text ?? '',
    pubDate: formatDate(ep.pubDate?._text) ?? '',
    duration: ep['itunes:duration']?._text ?? 'Unknown'
  }));
};

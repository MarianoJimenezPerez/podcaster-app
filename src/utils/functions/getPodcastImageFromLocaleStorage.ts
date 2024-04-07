import { Podcast } from '@/types';

export const getPodcastImageFromLocalStorage = (podcastId: string) => {
  const storedPodcasts = localStorage.getItem('podcastsData');
  if (storedPodcasts) {
    const podcastsData = JSON.parse(storedPodcasts);
    const found = podcastsData.find((el: Podcast) => el.id.attributes['im:id'] === podcastId);
    if (found) {
      return found['im:image'][0].label;
    }
  }
  return null;
};

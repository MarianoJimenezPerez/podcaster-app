import { PodcastContext } from '@/context/PodcastContext';
import { useContext } from 'react';

export const usePodcastContext = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcastContext must be used in to a PodcastContextProvider');
  }
  return context;
};

import React, { createContext, useState } from 'react';
import { PodcastDetail } from '@/types';

interface ContextType {
  podcastDetail: PodcastDetail | null;
  updatePodcastDetail: (podcast: PodcastDetail | null) => void;
}

export const PodcastContext = createContext<ContextType>({
  podcastDetail: null,
  updatePodcastDetail: () => {}
});

interface PodcastProviderProps {
  children: React.ReactNode;
}

export const PodcastProvider: React.FC<PodcastProviderProps> = ({ children }) => {
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetail | null>(null);

  const updatePodcastDetail = (podcast: PodcastDetail | null) => {
    setPodcastDetail(podcast);
  };

  return (
    <PodcastContext.Provider value={{ podcastDetail, updatePodcastDetail }}>
      {children}
    </PodcastContext.Provider>
  );
};

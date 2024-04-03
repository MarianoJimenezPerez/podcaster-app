import React, { createContext, useState } from 'react';
import { PodcastDetail } from '@/types';

interface ContextType {
  podcastDetail: PodcastDetail | null;
  setPodcastDetail: React.Dispatch<React.SetStateAction<PodcastDetail | null>>;
}

export const PodcastContext = createContext<ContextType | undefined>(undefined);

interface PodcastProviderProps {
  children: React.ReactNode;
}

export const PodcastProvider: React.FC<PodcastProviderProps> = ({ children }) => {
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetail | null>(null);

  return (
    <PodcastContext.Provider value={{ podcastDetail, setPodcastDetail }}>
      {children}
    </PodcastContext.Provider>
  );
};

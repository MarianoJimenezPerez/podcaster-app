import { FetchingContext } from '@/context/FetchingContext';
import { useContext } from 'react';

export const useFetchingContext = () => {
  const context = useContext(FetchingContext);
  if (!context) {
    throw new Error('FetchingContext must be used in to a FetchingProvider');
  }
  return context;
};

import { createContext, useState } from 'react';

interface FetchingContexType {
  isFetching: boolean;
  updateFetching: (bool: boolean) => void;
}

export const FetchingContext = createContext<FetchingContexType>({
  isFetching: false,
  updateFetching: () => {}
});

interface FetchingProviderProps {
  children: React.ReactNode;
}

export const FetchingProvider: React.FC<FetchingProviderProps> = ({ children }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const updateFetching = (bool: boolean) => {
    setIsFetching(bool);
  };

  return (
    <FetchingContext.Provider value={{ isFetching, updateFetching }}>
      {children}
    </FetchingContext.Provider>
  );
};

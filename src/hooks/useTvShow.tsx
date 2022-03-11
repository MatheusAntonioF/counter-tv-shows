import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ISavedEpisodes } from '../dtos/IEpisodes';
import { createTvShow, fetchTvShows } from '../services/http/modules/tvShows';

interface ITVShowContextData {
  tvShows: ISavedEpisodes[];
  setTvShows: React.Dispatch<React.SetStateAction<ISavedEpisodes[]>>;
  addTvShow: (newTvShow: ISavedEpisodes) => Promise<void>;
  deleteTvShow: (id: string) => Promise<void>;
}

const TvShowContext = createContext({} as ITVShowContextData);

export const TVShowProvider: React.FC = ({ children }) => {
  const [tvShows, setTvShows] = useState<ISavedEpisodes[]>([]);

  const addTvShow = useCallback(async (newTvShow: ISavedEpisodes) => {
    try {
      const savedTvShow = await createTvShow(newTvShow);

      setTvShows(oldTvShows => [...oldTvShows, savedTvShow]);
    } catch (error) {
      throw new Error(`Error to save a tv show: ${error}`);
    }
  }, []);

  const deleteTvShow = useCallback(async (id: string) => {}, []);

  const tvShowValues = useMemo(
    () => ({ tvShows, setTvShows, addTvShow, deleteTvShow }),
    [tvShows, setTvShows, addTvShow, deleteTvShow]
  );

  return (
    <TvShowContext.Provider value={tvShowValues}>
      {children}
    </TvShowContext.Provider>
  );
};

export function useTvShow(): ITVShowContextData {
  const context = useContext(TvShowContext);

  if (!context) throw new Error('useTvShow must be used within TvShowProvider');

  return context;
}

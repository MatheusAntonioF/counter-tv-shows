import { ISavedEpisodes } from '../../../../dtos/IEpisodes';
import { api, apiFirebase, DEFAULT_LANGUAGE } from '../../api';
import { IResponse } from './dtos';

const fetchTVShowDetails = async (keyword: string): Promise<IResponse> => {
  const { data } = await api.get<IResponse>(
    `/search/tv?api_key=${
      import.meta.env.VITE_IMDB_API_KEY
    }&language=${DEFAULT_LANGUAGE}&page=1&query=${keyword}`
  );

  return data;
};

const createTvShow = async (
  tvShow: ISavedEpisodes
): Promise<ISavedEpisodes> => {
  const { data } = await apiFirebase.post<ISavedEpisodes>('/tv-shows', tvShow);

  return data;
};

const fetchTvShows = async (): Promise<ISavedEpisodes[]> => {
  const { data } = await apiFirebase.get<ISavedEpisodes[]>('/tv-shows');

  return data;
};

export { fetchTvShows, fetchTVShowDetails, createTvShow };

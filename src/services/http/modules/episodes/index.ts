import { api, DEFAULT_LANGUAGE } from '../../api';
import { IRequest, IResponse } from './dtos';

const fetchTVShowEpisodesFromSeason = async ({
  tv_show_id,
  season,
}: IRequest): Promise<IResponse> => {
  const { data } = await api.get<IResponse>(
    `/tv/${tv_show_id}/season/${season}?api_key=${
      import.meta.env.VITE_IMDB_API_KEY
    }&language=${DEFAULT_LANGUAGE}`
  );

  return data;
};

export { fetchTVShowEpisodesFromSeason };

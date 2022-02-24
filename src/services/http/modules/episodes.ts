import { api, DEFAULT_LANGUAGE } from '../api';

interface IRequest {
  tv_show_id: number;
  season: number;
}

interface IFullEpisodeInfo {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface IResponse {
  _id: string;
  air_date: string;
  episodes: IFullEpisodeInfo[];
}

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

export interface IRequest {
  tv_show_id: number;
  season: number;
}

export interface IFullEpisodeInfo {
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

export interface IResponse {
  _id: string;
  air_date: string;
  episodes: IFullEpisodeInfo[];
}

export interface IEpisode {
  episode_number: string;
  id: number;
  name: string;
  overview: string;
  still_path: string;
  vote_average: string;
  vote_count: string;
}

export interface IEpisodes {
  episodes: IEpisode;
}

export interface ISavedEpisodes {
  id: number;
  name: string;
  description: string;
  number: number;
  thumbnail: string;
  season_number: number;
}

import { api, DEFAULT_LANGUAGE } from '../api';

interface ITVShowFullInfo {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number;
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface IResponse {
  page: number;
  results: ITVShowFullInfo[];
  total_pages: number;
  total_results: number;
}

const fetchTVShowDetails = async (keyword: string): Promise<IResponse> => {
  const { data } = await api.get<IResponse>(
    `/search/tv?api_key=${
      import.meta.env.VITE_IMDB_API_KEY
    }&language=${DEFAULT_LANGUAGE}&page=1&query=${keyword}`
  );

  return data;
};

export { fetchTVShowDetails };

import axios from 'axios';

const DEFAULT_LANGUAGE = 'pt-BR';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export { api, DEFAULT_LANGUAGE };

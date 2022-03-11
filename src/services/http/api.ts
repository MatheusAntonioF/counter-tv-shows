import axios from 'axios';
import { persistTokenInAuthenticatedRequest } from './interceptors';

const DEFAULT_LANGUAGE = 'pt-BR';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const apiFirebase = axios.create({
  baseURL: 'http://localhost:5000/counter-tv-shows-api/us-central1/api',
});

apiFirebase.interceptors.request.use(
  persistTokenInAuthenticatedRequest,
  error => {
    Promise.reject(error);
  }
);

export { api, apiFirebase, DEFAULT_LANGUAGE };

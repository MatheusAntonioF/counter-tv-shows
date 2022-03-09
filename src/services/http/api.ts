import axios from 'axios';

const DEFAULT_LANGUAGE = 'pt-BR';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const apiFirebase = axios.create({
  baseURL: 'http://localhost:5000/counter-tv-shows-api/us-central1/api',
});

export { api, apiFirebase, DEFAULT_LANGUAGE };

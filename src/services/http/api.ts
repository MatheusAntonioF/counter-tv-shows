import axios from 'axios';

const api = axios.create({
  baseURL: 'https://imdb-api.com/br/API',
});

export { api };

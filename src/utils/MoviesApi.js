import {BASE_BEATFILMMOVIES_URL} from './constants'
class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  // Movies
  getMovies() {
    // получить фильмы, метод GET
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(onError);
  }
}

const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Произошла ошибка: ${res.statusText} с кодом ${res.status}`
  );
};

const moviesApi = new MoviesApi({
  baseUrl: BASE_BEATFILMMOVIES_URL,
});

export default moviesApi;

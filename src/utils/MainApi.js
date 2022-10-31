class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // регистрация и авторизация
  register(password, email, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    }).then(onError);
  }

  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(onError);
  }

  tokenValid(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(onError);
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  // функционал
  // User
  getUser() {
    // загружаем имя пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(onError);
  }

  setUserInfo(name, email) {
    // запрос на изменение данных пользователя метод PATCH
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(onError);
  }

  // Movie
  getMovies() {
    // получить фильмы, метод GET
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then(onError);
  }

  addMovie(movie) {
    // добавить карточку метод POST
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then(onError);
  }

  deleteMovie(id) {
    // удалить карточку метотд DELETE
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  }
}

const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`
    ${
      res.status === 409
        ? "Такая почта занята"
        : res.status === 401
        ? "Неверный логин или пароль"
        : "Неизвестная ошибка"
    }
    `);
};

const mainApi = new MainApi({
  baseUrl: "https://api.awesomemoviesexplorer.students.nomoredomains.sbs",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;

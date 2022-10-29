import "./App.css";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// HOC
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// import utils
import mainApi from "../../utils/MainApi";

import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [messageError, setMessageError] = useState({});

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    handlTokenCheck();
  }, []);

  // проверка токена
  function handlTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .tokenValid(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log("Ошибка при провеке токена ", err);
        });
    }
  }
  // регистрация
  function handleRegister(password, email, name) {
    mainApi
      .register(password, email, name)
      .then((user) => {
        if (user) {
          handleLogin(password, user.email);
        }
      })
      .catch(
        setMessageError({
          text: "Такой E-mail уже занят",
        })
      );
  }
  // логирование
  function handleLogin(password, email) {
    mainApi
      .login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          mainApi.updateToken();
          setLoggedIn(true);
          handlTokenCheck();
          history.push("/movies");
        } else {
          setMessageError({
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
        }
      })
      .catch((err) => console.log("Ошибка при провеке авторизации ", err));
  }

  function onSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("moviesInputSearch");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("savedMoviesInputSearch");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {pathname === "/" ||
        pathname === "/profile" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Header loggedIn={!loggedIn} />
        ) : (
          ""
        )}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={!loggedIn}
            component={Movies}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={!loggedIn}
            component={SavedMovies}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={!loggedIn}
            component={Profile}
            onSignOut={onSignOut}
          />

          <Route path="/signup">
            {!loggedIn ? (
              <Register
                onRegister={handleRegister}
                textError={messageError.text}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
          <Route path="/signin">
            {!loggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

import {
  DEVICE_WIDTH_1200,
  DEVICE_WIDTH_900,
  DEVICE_WIDTH_768,
  DEVICE_WIDTH_240,
  ADD_CARDS_1200,
  ADD_CARDS_900,
  ADD_CARDS_768,
  ADD_CARDS_240,
  SEARCH_CARDS_1200,
  SEARCH_CARDS_900,
  SEARCH_CARDS_768,
  SEARCH_CARDS_240,
  SHORT_MOVIE_DURATION,
  URL_REGEX
} from "../../utils/constants";

function Movies() {
  const [moviesAll, setMoviesAll] = useState([]);
  const [movies, setMovies] = useState(null);
  const [saveMovies, setSaveMovies] = useState([]);
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState("");
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([]);
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([]);

  const [MoviesCount, setMoviesCount] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener("resize", handlerResize);

    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []);

  useEffect(() => {
    moviesApi
      .getMovies() // запросили все фильмы и сохранили их в localStorage
      .then((data) => {
        localStorage.setItem("moviesAll", JSON.stringify(data));
        setMoviesAll(JSON.parse(localStorage.getItem("moviesAll")));
      })
      .catch((err) => {
        console.log("Ошибка при запросе ", err);
      });

    mainApi
      .getMovies() // запрашиваем сохраненные фильмы
      .then((data) => {
        setSaveMovies(data);
      })
      .catch((err) => {
        console.log("Ошибка при запросе ", err);
      });

    const localStorageMovies = localStorage.getItem("movies");

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setMovies(filterData);
      setPreloader(false);
    }

    const localStorageMoviesTumbler = localStorage.getItem("moviesTumbler");
    const localStorageMoviesInputSearch =
      localStorage.getItem("moviesInputSearch");

    if (localStorageMoviesTumbler) {
      setMoviesTumbler(localStorageMoviesTumbler === "true");
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      [DEVICE_WIDTH_1200]: [SEARCH_CARDS_1200, ADD_CARDS_1200],
      [DEVICE_WIDTH_900]: [SEARCH_CARDS_900, ADD_CARDS_900],
      [DEVICE_WIDTH_768]: [SEARCH_CARDS_768, ADD_CARDS_768],
      [DEVICE_WIDTH_240]: [SEARCH_CARDS_240, ADD_CARDS_240],
    };
    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  async function savedMoviesToggle(movies, favorite) {
    if (favorite) {
      const objMovies = {
        country: movies.country || "Неизвестно",
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        image: URL_REGEX`${movies.image.url}`,
        trailerLink: movies.trailerLink,
        thumbnail: URL_REGEX`${movies.image.url}`,
        movieId: movies.id,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
      };
      try {
        await mainApi.addMovie(objMovies);
        const newSaved = await mainApi.getMovies();
        setSaveMovies(newSaved);
      } catch (err) {
        console.log("Ошибка", err);
      }
    } else {
      try {
        await mainApi.deleteMovie(movies._id);
        const newSaved = await mainApi.getMovies();
        setSaveMovies(newSaved);
      } catch (err) {
        console.log("Ошибка", err);
      }
    }
  }

  function handleGetMovies(inputSearch, tumbler) {
    if (!inputSearch) {
      setErrorText("Нужно ввести ключевое слово");
      return false;
    }
    setErrorText("");

    if (tumbler) {
      let filterDataDuration = moviesAll.filter(
        ({ duration }) => duration <= SHORT_MOVIE_DURATION
      );
      const filterDataDurationFound = filterDataDuration.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );

      localStorage.setItem("movies", JSON.stringify(filterDataDurationFound));
      localStorage.setItem("moviesInputSearch", inputSearch);

      const spliceDataDuration = filterDataDurationFound.splice(
        0,
        MoviesCount[0]
      );

      setMoviesShowed(spliceDataDuration);
      setMovies(filterDataDurationFound);
      setMoviesShowedWithTumbler(spliceDataDuration);
      setMoviesWithTumbler(filterDataDurationFound);
    } else {
      let filterData = moviesAll.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );

      localStorage.setItem("movies", JSON.stringify(filterData));
      localStorage.setItem("moviesInputSearch", inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);

      setMoviesShowed(spliceData);
      setMovies(filterData);
      setMoviesShowedWithTumbler(spliceData);
      setMoviesWithTumbler(filterData);
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setMoviesShowedWithTumbler(moviesShowed);
      setMoviesWithTumbler(movies);
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
      filterData = movies.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
    } else {
      filterDataShowed = moviesShowedWithTumbler;
      filterData = moviesWithTumbler;
    }

    localStorage.setItem(
      "movies",
      JSON.stringify(filterDataShowed.concat(filterData))
    );
    localStorage.setItem("moviesTumbler", tumbler);
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  function handleMore() {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(
      spliceMovies.splice(0, MoviesCount[1])
    );
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
  }

  return (
    <section className="movies">
      <SearchForm
        handleGetMovies={handleGetMovies}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
      />
      <div className="movies__border"></div>
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader &&
        !errorText &&
        movies !== null &&
        saveMovies !== null &&
        moviesShowed !== null && (
          <MoviesCardList
            movies={moviesShowed}
            saveMovies={saveMovies}
            handleMore={handleMore}
            savedMoviesToggle={savedMoviesToggle}
            moviesMore={movies}
          />
        )}
    </section>
  );
}

export default Movies;

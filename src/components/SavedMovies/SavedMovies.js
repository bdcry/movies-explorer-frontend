import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import {SHORT_MOVIE_DURATION} from '../../utils/constants';

function SavedMovies() {
  const [movies, setMovies] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([]);
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([]);
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch] = useState("");

  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleGetMoviesTumbler(tumbler) {
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
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText("");
    setPreloader(true);
    localStorage.setItem("savedMoviesInputSearch", inputSearch);
    localStorage.setItem("savedMoviesTumbler", tumbler);
    try {
      const data = movies;
      let filterData = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );

      if (tumbler)
        filterData = filterData.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
      setMoviesShowed(filterData);
    } catch (err) {
      setErrorText(`Произошла ошибка - ${err}`);
      setMovies([]);
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movie, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovie(movie._id);
        const newMovies = await mainApi.getMovies();
        setMoviesShowed(newMovies);
        setMovies(newMovies);
      } catch (err) {
        console.log(`Произошла ошибка - ${err}`);
      }
    }
  }

  useEffect(() => {
    const localStorageMovies = localStorage.getItem("savedMovies");

    if (localStorageMovies) {
      setMovies(JSON.parse(localStorageMovies));
      const localStorageMoviesTumbler =
        localStorage.getItem("savedMoviesTumbler");
      if (localStorageMoviesTumbler) {
        setMoviesTumbler(localStorageMoviesTumbler === "true");
      }
    } else {
      mainApi
        .getMovies()
        .then((data) => {
          setMovies(data);
          setMoviesShowed(data);
        })
        .catch((err) => console.log(`Произошла ошибка - ${err}`));
    }
  }, []);

  return (
    <section className="savedmovies">
      <SearchForm
        handleGetMovies={handleGetMovies}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
      />
      <div className="savedmovies__border"></div>
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      <MoviesCardList
        movies={moviesShowed}
        moviesMore={[]}
        savedMoviesToggle={savedMoviesToggle}
      />
    </section>
  );
}

export default SavedMovies;

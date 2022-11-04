import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MOVIESURL } from "../../utils/constants";

import "./MoviesCard.css";

function MoviesCard({ movie, savedMoviesToggle, saveMovies }) {
  const [saved, setSaved] = useState(false);

  const { pathname } = useLocation();

  function handleSavedToggle() {
    const newSaved = !saved;
    savedMoviesToggle(movie, newSaved)
  }

  function handleSavedDelete() {
    alert("Фильм успешно удалён из сохранённых");
    savedMoviesToggle(movie, false);
  }

  function getMovieDuration(min) {
    const time = `${Math.floor(min / 60)}ч ${min % 60}м`;
    return time;
  }

  useEffect(() => {
    if (pathname !== "/saved-movies") {
      const savedMovieCard = saveMovies.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovieCard.length > 0) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [pathname, saveMovies, movie.id]);

  return (
    <article className="movie">
        {pathname === '/movies' && (
          <button
            className={`movie__button_type_${
              saved ? 'liked' : 'default'
            }`}
            aria-label={`${
              saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
            }`}
            type="button"
            onClick={handleSavedToggle}
          >Сохранить</button>
        )}

        {pathname === '/saved-movies' && (
          <button
            className="movie__button movie__delete"
            aria-label="Удалить фильм"
            type="button"
            onClick={handleSavedDelete}
          />
        )}


      <a className="" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={
            pathname === "/saved-movies"
              ? `${movie.image}`
              : `${MOVIESURL}${movie.image.url}`
          }
          alt={movie.nameRU}
          className="movie__photo"
        />
      </a>
      <div className="movie__text">
        <h2 className="movie__title">{movie.nameRU}</h2>
        <p className="movie__duration">{getMovieDuration(movie.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;

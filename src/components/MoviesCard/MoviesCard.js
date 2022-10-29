import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie, savedMoviesToggle, saveMovies }) {
  const [saved, setSaved] = useState(false);

  const { pathname } = useLocation();

  function handleSavedToogle() {
    const newSaved = !saved;
    const savedMovieCard = saveMovies.filter((obj) => {
      // eslint-disable-next-line
      return obj.movieId == movie.id;
    });
    savedMoviesToggle(
      {
        ...movie,
        _id: savedMovieCard.length > 0 ? savedMovieCard[0]._id : null,
      },
      newSaved
    );
  }

  function handleSavedDelete() {
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
      {pathname === "/saved-movies" ? (
        <button
          className="movie__button movie__delete"
          onClick={handleSavedDelete}
        ></button>
      ) : (
        <button
          className={`movie__button movie__like ${
            saved ? "movie__like_active" : ""
          }`}
          onClick={handleSavedToogle}
        ></button>
      )}
      <a className="" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={
            pathname === "/saved-movies"
              ? `${movie.image}`
              : `https://api.nomoreparties.co${movie.image.url}`
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

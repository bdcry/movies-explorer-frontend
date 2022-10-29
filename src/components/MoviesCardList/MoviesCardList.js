import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  saveMovies,
  savedMoviesToggle,
  handleMore,
  moviesMore,
}) {
  const { pathname } = useLocation();
  return (
    <section className="movies-card-list">
      {movies.length > 0 ? (
        <div className="movies-card-list__items">
          {" "}
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              saveMovies={saveMovies}
              savedMoviesToggle={savedMoviesToggle}
            />
          ))}{" "}
        </div>
      ) : (
        <div className="movies-card-list__text">Ничего не найдено</div>
      )}

      {moviesMore.length > 0 && pathname !== "/saved-movies" ? (
        <button
          className="movies-card-list__button"
          type="button"
          name="more"
          onClick={handleMore}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;

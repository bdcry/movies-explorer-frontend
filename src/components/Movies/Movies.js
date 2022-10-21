import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/Movies";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <div className="movies__border"></div>
      <MoviesCardList cards={cards} buttonMore={true} />
    </section>
  );
}

export default Movies;

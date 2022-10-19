import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import savedMovies from '../../utils/savedMovies';

function SavedMovies() {
  return (
    <section className='savedmovies'>
      <SearchForm />
      <div className='savedmovies__border'></div>
      <MoviesCardList
        cards={savedMovies}
        buttonMore={false} />
    </section>
  );
};

export default SavedMovies;
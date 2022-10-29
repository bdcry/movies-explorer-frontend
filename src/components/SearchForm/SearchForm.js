import './SearchForm.css';
import { useState, useEffect } from 'react';

function SearchForm({ handleGetMovies, handleGetMoviesTumbler, moviesTumbler, moviesInputSearch }) {
  // текст поиска
  const [searchText, setSearchText] = useState('')
  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false)

  useEffect(() => {
    setCheckbox(moviesTumbler)
    setSearchText(moviesInputSearch)
  }, [moviesTumbler, moviesInputSearch])

  function handleSubmit(e) {
    e.preventDefault()
    handleGetMovies(searchText)
  }

  function handleInputChange(e) {
    setSearchText(e.target.value)
  }

  function handleCheckboxChange() {
    setCheckbox(!checkbox)
    handleGetMoviesTumbler(!checkbox)
  }
  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <input
          className='search__input'
          value={searchText || ''}
          onChange={handleInputChange}
          type='text'
          name='search'
          placeholder='Фильм' required />
        <button className='search__button' type='submit' />
      </form>
      <div className='search__toggle'>
      <input
          className='search__input-checkbox'
          onChange={handleCheckboxChange}
          value={checkbox}
          checked={!checkbox}
          type='checkbox'
          required  />
        <p className='search__text'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
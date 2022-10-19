import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <input className='search__input' type='text' name='search' placeholder='Фильм' required />
        <button className='search__button' type='submit' />
      </form>
      <div className='search__toggle'>
        <input className='search__input-checkbox' type='checkbox' />
        <p className='search__text'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
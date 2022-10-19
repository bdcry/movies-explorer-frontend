import accountIcon from '../../images/account-icon.svg';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <input className='navigation__toggle' id='navigation__toggle' type="checkbox" />
      <label className='navigation__btn' for='navigation__toggle'>
        <span className='navigation__btn-img'></span>
      </label>
      <div className='navigation__container'>
        <ul className='navigation__items'>
          <li className='navigation__item navigation__item_type_main'>
            <a className='navigation__link' href='/'>Главная</a>
          </li>
          <li className='navigation__item'>
            <a className='navigation__link' href='/movies'>Фильмы</a>
          </li>
          <li className='navigation__item'>
            <a className='navigation__link' href='/saved-movies'>Сохранённые фильмы</a>
          </li>
        </ul>
        <div className='navigation__item navigation__item_account'>
          <img className='navigation__link-img' src={accountIcon} alt='' />
          <a className='navigation__link navigation__link_account' href='/profile'>Аккаунт</a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
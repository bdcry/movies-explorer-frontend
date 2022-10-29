import accountIcon from "../../images/account-icon.svg";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <input
        className="navigation__toggle"
        id="navigation__toggle"
        type="checkbox"
      />
      <label className="navigation__btn" htmlFor="navigation__toggle">
        <span className="navigation__btn-img"></span>
      </label>
      <div className="navigation__container">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_type_main">
            <NavLink className="navigation__link" to="/">
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navigation__item navigation__item_account">
            <img
              className="navigation__link-img"
              src={accountIcon}
              alt="Иконка аккаунта"
            />
            <NavLink
              className="navigation__link navigation__link_account"
              to="/profile"
            >
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Проекта Movies Explorer"
        ></img>
      </Link>
      <div className="header__auth">
        <Link className="header__signup" to="/signup">
          Регистрация
        </Link>
        <Link className="header_signin" to="/signin">
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;

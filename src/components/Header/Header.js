import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import NavTab from "../NavTab/NavTab";
import Navigation from "../Navigation/Navigation";
import accountIcon from "../../images/account-icon.svg";

function Header({ loggedIn }) {
  const { pathname } = useLocation();
  return (
    <header className={`header ${pathname === "/" ? "header_type_auth" : ""}`}>
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Проекта Movies Explorer"
        ></img>
      </Link>
      {loggedIn ? (
        <NavTab />
      ) : (
        <>
          <Navigation />
          <Link className="header__link header__link_account" to="/profile">
            <img className="header__img" src={accountIcon} alt="" /> Аккаунт
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;

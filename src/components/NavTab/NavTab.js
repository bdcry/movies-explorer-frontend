import './NavTab.css';

function NavTab() {
  return (
    <div className="navtab">
      <a className="navtab__signup" href="/signup">Регистрация</a>
      <a className="navtab__signin" href="/signin">Войти</a>
    </div>
  );
}

export default NavTab;
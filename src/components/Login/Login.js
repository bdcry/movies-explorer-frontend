import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" method="post">
          <label className="login__label">E-mail</label>
          <input className="login__input" type="email" required />
          <span className="login__input-error">Что-то пошло не так...</span>
          <label className="login__label">Пароль</label>
          <input className="login__input" type="password" required />
          <span className="login__input-error">Что-то пошло не так...</span>
          <button className="login__submit" type="submit">
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link className="login__link" to="/signup">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" method="post">
          <label className="register__label">Имя</label>
          <input className="register__input" type="text" required />
          <span className="register__input-error">Что-то пошло не так...</span>
          <label className="register__label">E-mail</label>
          <input className="register__input" type="email" required />
          <span className="register__input-error">Что-то пошло не так...</span>
          <label className="register__label">Пароль</label>
          <input className="register__input" type="password" required />
          <span className="register__input-error">Что-то пошло не так...</span>
          <button className="register__submit" type="submit">
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?
            <Link className="register__link" to="/signin">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

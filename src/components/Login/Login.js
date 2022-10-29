import { Link } from "react-router-dom";
import { useState } from "react";

import "./Login.css";

function Login({ onLogin, textError }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValues.password, formValues.email);
  }
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" />
        <h2 className="login__title">Рады видеть!</h2>
        <form
          onSubmit={handleSubmit}
          className="login__form"
          method="post"
          noValidate
        >
          <label className="login__label">E-mail</label>
          <input
            onChange={handleChange}
            value={formValues.email || ""}
            name="email"
            type="email"
            className="login__input"
            required
          />
          <span
            className={`login__input-error ${
              errors.email ? "login__input-error_show" : ""
            }`}
          >
            {errors.email}
          </span>
          <label className="login__label">Пароль</label>
          <input
            onChange={handleChange}
            value={formValues.password || ""}
            minLength="6"
            name="password"
            type="password"
            className="login__input"
            required
          />
          <span
            className={`login__input-error ${
              errors.password ? "login__input-error_show" : ""
            }`}
          >
            {errors.password}
          </span>
          <div className="login__submit-items">
            <span
              className={`login__input-error ${
                textError ? "login__input-error_show" : ""
              }`}
            >
              {textError}
            </span>
            <button
              className={`login__submit ${
                !isValid ? "login__submit_disabled" : ""
              }`}
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
          </div>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="./signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

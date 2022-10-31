import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import "./Register.css";

function Register({ onRegister, textError }) {
  const [formValues, setFormValues] = useState({
    name: "",
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
    if (name === "email") {
      if (!isEmail(value)) {
        e.target.setCustomValidity("E-mail введен не корректно");
      } else {
        e.target.setCustomValidity("");
      }
    }
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValues.password, formValues.email, formValues.name);
  }
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          onSubmit={handleSubmit}
          className="register__form"
          method="post"
          noValidate
        >
          <label className="register__label">Имя</label>
          <input
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            value={formValues.name || ""}
            name="name"
            type="text"
            className="register__input"
            required
          />
          <span
            className={`register__input-error ${
              errors.name ? "register__input-error_show" : ""
            }`}
          >
            {errors.name}
          </span>
          <label className="register__label">E-mail</label>
          <input
            onChange={handleChange}
            value={formValues.email || ""}
            name="email"
            type="email"
            className="register__input"
            required
          />
          <span
            className={`register__input-error  ${
              errors.email ? "register__input-error_show" : ""
            }`}
          >
            {errors.email}
          </span>
          <label className="register__label">Пароль</label>
          <input
            onChange={handleChange}
            value={formValues.password || ""}
            minLength="6"
            name="password"
            type="password"
            className="register__input"
            required
          />
          <span
            className={`register__input-error ${
              errors.password ? "register__input-error_show" : ""
            }`}
          >
            {errors.password}
          </span>
          <div className="register__submit-items">
            <span
              className={`register__input-error ${
                !textError ? "" : "register__input-error_show"
              }`}
            >
              Ошибка при регистрации. <br></br>Возможно, пользователь с такой
              почтой уже зарегистрирован.
            </span>
            <button
              className={`register__submit ${
                !isValid ? "register__submit_disabled" : ""
              }`}
              type="submit"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </div>
          <p className="register__text">
            Уже зарегистрированы?
            <Link to="./signin" className="register__link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

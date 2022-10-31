import "./Profile.css";

import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// utils
import mainApi from "../../utils/MainApi";

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [newUserName, setNewUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [newUserEmail, setNewUserEmail] = useState(currentUser.email);
  const [textInfo, setTextInfo] = useState(null);
  const [isVisibleButton, setVisibleButton] = useState(false);

  function handelSubmit(e) {
    e.preventDefault();

    mainApi
      .setUserInfo(newUserName, newUserEmail)
      .then((res) => {
        console.log("res ===", res);
        setVisibleButton(false);
        setUserName(newUserName);
        setUserEmail(newUserEmail);
        setTextInfo("Данные успешно изменены.");
      })
      .catch((err) => {
        setTextInfo("Что то пошло не так.");
        console.log("Ошибка сохранения данных ", err);
      });
  }

  function handleNameChange(e) {
    const name = e.target.value;
    setNewUserName(name);

    if (name !== userName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(e) {
    const email = e.target.value;
    setNewUserEmail(email);

    if (email !== userEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }
  return (
    <section className="profile">
      <form className="profile" onSubmit={handelSubmit}>
        <div className="profile__content">
          <h2 className="profile__title">{`Привет, ${newUserName}!`}</h2>
          <div className="profile__item">
            <p className="profile__item-input profile__item-input_value">Имя</p>
            <input
              className="profile__item-input profile__item-input_value"
              value={newUserName}
              onChange={handleNameChange}
            />
          </div>
          <div className="profile__item">
            <p className="profile__item-input profile__item-input_value">
              E-mail
            </p>
            <input
              className="profile__item-input profile__item-input_value"
              value={newUserEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="profile__nav-link">
            <span>{textInfo}</span>
            <button
              className="profile__link profile__link_submit"
              type="submit"
              disabled={!isVisibleButton}
            >
              Редактировать
            </button>
            <button
              className="profile__link profile__link_out"
              type="button"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Profile;

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__year">&copy; 2022 | Тимофей Тарасов</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/bdcry"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://tlgg.ru/blackbaccy"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

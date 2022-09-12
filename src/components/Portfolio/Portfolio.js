import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            class="portfolio__link"
            href="https://bdcry.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            class="portfolio__link"
            href="https://bdcry.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            class="portfolio__link"
            href="https://bdcry.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
        <li className="portfolio__item">
          <a
            class="portfolio__link"
            href="https://somethingawesome.nomoredomains.sbs/"
            target="_blank"
            rel="noreferrer"
          >
            Блог сайт
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

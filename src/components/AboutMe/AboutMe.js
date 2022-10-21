import "./AboutMe.css";
import imagme from "../../images/imagme.jpeg";

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <img className="aboutme__image" src={imagme} alt="Фотография автора" />
      <h3 className="aboutme__name">Тимофей</h3>
      <p className="aboutme__text">Фронтенд-разработчик, 18 лет</p>
      <p className="aboutme__info">
        Я родился и живу в Москве, заканчиваю колледж по Инетрнет-Маркетингу.
        Недавно начал кодить. Хочу стать востребованым фронтенд разработчиком.
        После того, как закончу курс, хочу начать заниматься фриланс-заказами и
        поиском стажировки. Продолжаю самостоятельно изучать веб.
      </p>
      <ul className="aboutme__socialnetlinks">
        <li className="aboutme__socialnetlinks-item">
          <a
            className="aboutme__socialnetlink"
            href="https://tlgg.ru/blackbaccy"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
        </li>
        <li className="aboutme__socialnetlinks-item">
          <a
            className="aboutme__socialnetlink"
            href="https://github.com/bdcry"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;

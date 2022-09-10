import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="aboutproject">
      <h2 className="aboutproject__title">О проекте</h2>
      <ul className="aboutproject__list">
        <li className="aboutproject__list-column">
          <h3 className="aboutproject__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutproject__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutproject__list-column">
          <h3 className="aboutproject__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutproject__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <ul className="aboutproject__timeline-list">
        <li className="aboutproject__timeline-list-column">
          <p className="aboutproject__timeline aboutproject__timeline_week">
            1 неделя
          </p>
          <p className="aboutproject__fb">Back-end</p>
        </li>
        <li className="aboutproject__timeline-list-column">
          <p className="aboutproject__timeline">4 недели</p>
          <p className="aboutproject__fb">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;

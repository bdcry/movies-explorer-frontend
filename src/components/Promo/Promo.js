import "./Promo.css";
import { Link } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div>
        <h1 className="promo__title">
          Учебный проект студента факультета <br/>Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link to="/" className="promo__link">Узнать больше</Link>
      </div>
      <div className="promo__image"></div>
    </section>
  );
}

export default Promo;

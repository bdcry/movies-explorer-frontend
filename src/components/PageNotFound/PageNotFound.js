import { Link } from "react-router-dom";
import "./PageNotFound.css";

function Error() {
  return (
    <section className="pagenotfound">
      <h2 className="pagenotfound_title">404</h2>
      <p className="pagenotfound__text">Страница не найдена</p>
      <Link className="pagenotfound__link" to="/">
        Назад
      </Link>
    </section>
  );
}

export default Error;

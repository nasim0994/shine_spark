import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <section className="hidden shadow lg:block">
      <div className="container">
        <ul className="menu_items flex items-center gap-4">
          <li>
            <Link to="/">Sarees</Link>
          </li>
          <li>
            <Link to="/">Salwar Kameez</Link>
          </li>
          <li>
            <Link to="/">Lehengas</Link>
          </li>
          <li>
            <Link to="/">Indo Western</Link>
          </li>
          <li>
            <Link to="/">Blouse</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

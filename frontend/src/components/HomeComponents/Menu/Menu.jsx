import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function Menu() {
  return (
    <div className="text-sm bg-base-100 hidden md:block">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="sm:w-[267.5px] flex justify-between items-center bg-primary px-2 py-2.5 text-base-100">
            <div className="flex gap-2 items-center">
              <FiMenu className="text-xl" />
              <h6>BROWSE CATEGORIES</h6>
            </div>
          </div>

          <nav>
            <ul className="flex items-center font-medium text-neutral">
              <li>
                <NavLink
                  to="/"
                  className="block px-3 hover:text-primary duration-200"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shops"
                  className="block px-3 hover:text-primary duration-200"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className="block px-3 hover:text-primary duration-200"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

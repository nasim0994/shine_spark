import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

export default function Menu() {
  return (
    <div className="hidden bg-base-100 text-sm md:block">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between bg-primary px-2 py-2.5 text-base-100 sm:w-[267.5px]">
            <div className="flex items-center gap-2">
              <FiMenu className="text-xl" />
              <h6>BROWSE CATEGORIES</h6>
            </div>
          </div>

          <nav>
            <ul className="flex items-center font-medium text-neutral">
              <li>
                <NavLink
                  to="/"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shops"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="block px-3 duration-200 hover:text-primary"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

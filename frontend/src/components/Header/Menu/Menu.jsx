import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoriesSidebar from "./CategoriesSidebar/CategoriesSidebar";
import { useEffect, useState } from "react";

export default function Menu() {
  const [categorySidebar, setCategorySidebar] = useState(false);
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        (categorySidebar &&
          !e.target.closest(".category_sidebar") &&
          !e.target.closest(".category_btn")) ||
        e.target.closest(".mobile_categories a")
      ) {
        setCategorySidebar(false);
      }
    });
  }, [categorySidebar]);

  return (
    <div className="border-b py-2 text-sm">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCategorySidebar(!categorySidebar)}
              className="category_btn flex items-center justify-center gap-2 rounded bg-primary px-2 py-2 text-base-100"
            >
              <FiMenu className="text-xl" />
              <h6 className="hidden sm:block">BROWSE CATEGORIES</h6>
            </button>

            <CategoriesSidebar
              categories={categories}
              categorySidebar={categorySidebar}
            />

            <nav className="header_menu">
              <ul className="flex items-center gap-5 font-medium">
                <li>
                  <NavLink to="/"> Home </NavLink>
                </li>
                <li>
                  <NavLink to="/shops"> Shops </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us"> About US </NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us"> Contact US </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

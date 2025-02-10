import { CgSearch } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useState } from "react";
import SearchSidebar from "../SearchSidebar/SearchSidebar";

export default function Menu() {
  const [searchSidebar, setSearchSidebar] = useState(false);
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  return (
    <div className="border-b py-3 text-sm">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <nav className="header_menu">
            <ul className="flex items-center gap-6">
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/shops"> Shops </NavLink>
              </li>
              <ol className="hidden items-center gap-8 sm:flex">
                {categories?.slice(0, 5).map((category) => (
                  <li key={category?._id}>
                    <NavLink to={`/shops/${category?.slug}`}>
                      {category?.name}
                    </NavLink>
                  </li>
                ))}
              </ol>
            </ul>
          </nav>

          <>
            <button
              onClick={() => setSearchSidebar(!searchSidebar)}
              className="duration-300 hover:text-primary"
            >
              <CgSearch className="text-xl" />
            </button>

            <SearchSidebar
              searchSidebar={searchSidebar}
              setSearchSidebar={setSearchSidebar}
            />
          </>
        </div>
      </div>
    </div>
  );
}

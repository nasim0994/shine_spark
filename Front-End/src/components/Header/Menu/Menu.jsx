import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import CategoriesSidebar from "./CategoriesSidebar/CategoriesSidebar";
import { useEffect, useState } from "react";

export default function Menu() {
  const [categorySidebar, setCategorySidebar] = useState(false);
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  const menuCategories =
    categories?.length > 6 ? categories?.slice(0, 5) : categories;

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
    <div className="bg-primary py-2 text-sm text-base-100 sm:py-0">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategorySidebar(!categorySidebar)}
              className="category_btn md:border-r md:pr-4"
            >
              <FiMenu className="text-xl" />
            </button>

            <CategoriesSidebar
              categories={categories}
              categorySidebar={categorySidebar}
            />

            <nav className="hidden md:block">
              <ul className="categories flex items-center font-medium">
                {menuCategories?.map((category) => (
                  <li key={category?._id}>
                    <Link to="/" className="flex items-center gap-2 p-2">
                      {category?.name}

                      {category?.subCategories?.length > 0 && (
                        <IoMdArrowDropdown className="text-xs" />
                      )}
                    </Link>

                    {category?.subCategories?.length > 0 && (
                      <ol className="category_dropdown">
                        {category?.subCategories?.map((subCategory) => (
                          <li key={subCategory?._id}>
                            <Link className="flex items-center justify-between">
                              <p>{subCategory?.name}</p>
                              {subCategory?.subSubCategories?.length > 0 && (
                                <IoMdArrowDropright className="text-xs" />
                              )}
                            </Link>

                            {subCategory?.subSubCategories?.length > 0 && (
                              <ol className="category_sub_dropdown">
                                {subCategory?.subSubCategories?.map(
                                  (subSubCategory) => (
                                    <li key={subSubCategory?._id}>
                                      <Link>{subSubCategory?.name}</Link>
                                    </li>
                                  ),
                                )}
                              </ol>
                            )}
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="-mt-px text-xs" />
            <p>00000000000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

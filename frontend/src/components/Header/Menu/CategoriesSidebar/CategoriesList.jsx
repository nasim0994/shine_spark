import { IoIosArrowForward } from "react-icons/io";
import MobileSubCategoriesList from "./SubCategoriesList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MobileCategoriesList({ category }) {
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown_item")) {
        setDropdown(false);
      }
    });
  }, []);

  if (category?.subCategories?.length > 0) {
    return (
      <li className="dropdown_item relative">
        <div className="flex items-center justify-between p-2 duration-300 hover:bg-gray-100">
          <Link
            to={`/shops/${category?.slug}`}
            className="flex items-center gap-2"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
              alt={category?.name}
              className="h-6 w-6"
              loading="lazy"
            />
            {category?.name}
          </Link>

          <button
            onClick={() => setDropdown(!dropdown)}
            className="text-neutral-content"
          >
            <IoIosArrowForward
              className={`${dropdown && "rotate-90"} duration-150`}
            />
          </button>
        </div>

        <ol className={`mobile_dropdown ${dropdown && "dropdown_active"}`}>
          {category?.subCategories?.map((subCategory) => (
            <MobileSubCategoriesList
              key={subCategory?._id}
              category={category}
              subCategory={subCategory}
            />
          ))}
        </ol>
      </li>
    );
  } else {
    return (
      <li>
        <Link
          to={`/shops/${category?.slug}`}
          className="flex items-center gap-2 p-2 duration-300 hover:bg-gray-100"
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
            alt={category?.name}
            className="h-6 w-6"
            loading="lazy"
          />
          <p>{category?.name}</p>
        </Link>
      </li>
    );
  }
}

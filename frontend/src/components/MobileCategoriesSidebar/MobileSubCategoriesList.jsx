import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function MobileSubCategoriesList({ category, subCategory }) {
  const [subDropdown, setSubDropdown] = useState(false);

  if (subCategory?.subSubCategories?.length > 0) {
    return (
      <li className="relative">
        <div className="p-2 flex items-center justify-between hover:bg-gray-100 duration-300">
          <Link
            to={`/shops/${category?.slug}/${subCategory?.slug}`}
            className="flex items-center gap-2"
          >
            {subCategory?.name}
          </Link>

          <button
            onClick={() => setSubDropdown(!subDropdown)}
            className="text-neutral-content"
          >
            <IoIosArrowForward
              className={`${subDropdown && "rotate-90"} duration-150`}
            />
          </button>
        </div>

        <ol
          className={`mobile_sub_dropdown ${subDropdown && "dropdown_active"}`}
        >
          {subCategory?.subSubCategories?.map((subSubCategory) => (
            <li key={subSubCategory?._id}>
              <Link
                to={`/shops/${category?.slug}/${subCategory?.slug}/${subSubCategory?.slug}`}
                className="flex p-2 hover:bg-gray-100 duration-300"
              >
                {subSubCategory?.name}
              </Link>
            </li>
          ))}
        </ol>
      </li>
    );
  } else {
    return (
      <li>
        <Link
          to={`/shops/${category?.slug}/${subCategory?.slug}`}
          className="flex p-2 hover:bg-gray-100 duration-300"
        >
          {subCategory?.name}
        </Link>
      </li>
    );
  }
}

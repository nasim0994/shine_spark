import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ShopSubCategoriesList({ category, subCategory }) {
  const [subDropdown, setSubDropdown] = useState(false);

  if (subCategory?.subSubCategories?.length > 0) {
    return (
      <li className="relative text-neutral-content">
        <div className="flex items-center justify-between p-1">
          <Link
            to={`/shops?category=${category?.slug}&subCategory=${subCategory?.slug}`}
            className="flex items-center gap-2"
          >
            {subCategory?.name}
          </Link>

          <button onClick={() => setSubDropdown(!subDropdown)}>
            <AiOutlineMinus className={`${!subDropdown && "hidden"}`} />
            <AiOutlinePlus className={`${subDropdown && "hidden"}`} />
          </button>
        </div>

        <ol
          className={`mobile_sub_dropdown ${subDropdown && "dropdown_active"}`}
        >
          {subCategory?.subSubCategories?.map((subSubCategory) => (
            <li key={subSubCategory?._id}>
              <Link
                to={`/shops?category=${category?.slug}&subCategory=${subCategory?.slug}&subSubCategory=${subSubCategory?.slug}`}
                className="flex p-1"
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
          to={`/shops?category=${category?.slug}&subCategory=${subCategory?.slug}`}
          className="flex p-2"
        >
          {subCategory?.name}
        </Link>
      </li>
    );
  }
}

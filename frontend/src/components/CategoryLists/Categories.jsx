import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import SubCategories from "./SubCategories";

export default function Categories({ category }) {
  if (category?.subCategories?.length > 0) {
    return (
      <li className="relative">
        <Link
          to={`/shops/${category?.slug}`}
          className="flex items-center justify-between p-2 duration-300 hover:bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
              alt=""
              className="h-6 w-6"
            />
            {category?.name}
          </div>

          <i className="text-neutral-content">
            <IoIosArrowForward />
          </i>
        </Link>

        <ol className="category_dropdown">
          {category?.subCategories?.map((subCategory) => (
            <SubCategories
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
            alt=""
            className="h-6 w-6"
          />
          {category?.name}
        </Link>
      </li>
    );
  }
}

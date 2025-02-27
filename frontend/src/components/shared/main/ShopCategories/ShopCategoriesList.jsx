import { useEffect, useState } from "react";
import ShopSubCategoriesList from "./ShopSubCategoriesList";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ShopCategoriesList({ category }) {
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
        <div className="flex items-center justify-between p-1">
          <Link
            to={`/shops?category=${category?.slug}`}
            className="flex items-center gap-2"
          >
            {category?.name}
          </Link>

          <button onClick={() => setDropdown(!dropdown)}>
            {/* {dropdown ? <AiOutlineMinus /> : <AiOutlinePlus />} */}
            <AiOutlineMinus className={`${!dropdown && "hidden"}`} />
            <AiOutlinePlus className={`${dropdown && "hidden"}`} />
          </button>
        </div>

        <ol className={`mobile_dropdown ${dropdown && "dropdown_active"}`}>
          {category?.subCategories?.map((subCategory) => (
            <ShopSubCategoriesList
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
          to={`/shops?category=${category?.slug}`}
          className="flex items-center gap-2 p-1"
        >
          <p>{category?.name}</p>
        </Link>
      </li>
    );
  }
}

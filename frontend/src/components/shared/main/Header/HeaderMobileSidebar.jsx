import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HeaderMobileSidebar({
  setShowSidebar,
  categories,
  showSidebar,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if(categories?.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-[90%] -translate-x-full bg-base-100 duration-300 sm:w-[300px] ${showSidebar && "translate-x-0"}`}
    >
      <div className="flex justify-end p-3">
        <button onClick={() => setShowSidebar(false)}>
          <AiOutlineClose className="text-xl opacity-80 duration-200 hover:opacity-100" />
        </button>
      </div>

      <div>
        <ul className="flex items-center border-b">
          {categories?.map((category) => (
            <li key={category?._id}>
              <button
                className={`px-3 py-2.5 ${selectedCategory?._id == category?._id && "border-b-2 border-primary"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category?.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-2">
        {selectedCategory?.subCategories?.length > 0 ? (
          <ul className="flex flex-col gap-2 text-[15px]">
            {selectedCategory?.subCategories?.map((subCategory) => (
              <li key={subCategory?._id}>
                <Link
                  onClick={() => setShowSidebar(false)}
                  to={`/shops?category=${selectedCategory?.slug}&subCategory=${subCategory?.slug}`}
                  className="flex p-1"
                >
                  {subCategory?.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-primary">No Sub-category found</p>
        )}
      </div>
    </div>
  );
}

import { useGetSubCategoriesQuery } from "@/Redux/subCategory/subCategoryApi";
import { Link } from "react-router-dom";

export default function Menu() {
  const { data } = useGetSubCategoriesQuery({ limit: 7 });
  const subCategories = data?.data;

  return (
    <section className="hidden shadow lg:block">
      <div className="container">
        <ul className="menu_items relative flex items-center gap-4">
          {subCategories?.map((subCategory) => (
            <li key={subCategory?._id} className="menu_subCategory_item">
              <Link
                to={`/shops?category=${subCategory?.category?.slug}&subCategory=${subCategory?.slug}`}
              >
                {subCategory?.name}
              </Link>

              <div className="menu_subCategory_dropdown flex">
                <div className="min-h-full w-72 bg-primary/5 p-2 pr-0">
                  <p className="bg-base-100 p-2 font-medium text-neutral">
                    STYLE
                  </p>
                </div>
                <div className="w-[calc(100%-288px)]">
                  <ul>
                    <h3 className="p-3">See All {subCategory?.name}</h3>
                    {subCategory?.subSubCategories?.map((subSUbCategory) => (
                      <li key={subSUbCategory?._id}>
                        <Link
                          to={`/shops?category=${subCategory?.category?.slug}&subCategory=${subCategory?.slug}&subSubCategory=${subSUbCategory?.slug}`}
                        >
                          {subSUbCategory?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
          <li>
            <Link to="/shops">Ready To Ship</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

export default function ChooseByCategory() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  let content = null;
  if (isLoading) {
    content = <CategoryCard />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((category) => (
      <Link
        key={category?._id}
        to={`shops/${category.slug}`}
        className="flex items-center justify-center text-center"
      >
        <div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
            alt=""
            className="mx-auto h-20 w-20 rounded-full border-8 border-base-100 shadow"
          />
          <h6 className="mt-2 text-sm font-medium md:text-base">
            {category?.name}
          </h6>
        </div>
      </Link>
    ));
  }

  return (
    <div className="hidden py-10 md:block">
      <div className="container">
        <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {content}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

export default function ChooseByCategory() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.data;

  let content = null;
  if (isLoading) {
    content = <CategoryCard />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = categories?.map((category) => (
      <Link
        key={category?._id}
        to={`shops/${category.slug}`}
        className="flex items-center justify-center text-center"
      >
        <div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
            alt={category?.name}
            className="mx-auto h-28 w-28 rounded-full border-8 border-base-100 shadow"
            loading="lazy"
          />
          <h6 className="mt-2 text-sm font-medium md:text-base">
            {category?.name}
          </h6>
        </div>
      </Link>
    ));
  }

  if (categories?.length > 0) {
    return (
      <div className="hidden py-5 md:block">
        <div className="container">
          <h2 className="mb-4 text-center text-3xl font-semibold text-secondary">
            Featured Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-14">{content}</div>
        </div>
      </div>
    );
  }
}

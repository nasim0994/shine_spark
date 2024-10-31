import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

const ChooseByCategory = () => {
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
        className="flex items-center justify-center rounded border p-4 text-center duration-300 hover:bg-primary/5"
      >
        <div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
            alt={category?.name}
            className="mx-auto h-14 w-14"
            loading="lazy"
          />
          <h6 className="mt-2 text-sm font-medium md:text-base">
            {category?.name}
          </h6>
        </div>
      </Link>
    ));
  }

  if (categories?.length === 0) return;

  return (
    <div className="mt-6 hidden md:block">
      <div className="container rounded bg-base-100 p-3 shadow-lg">
        <div className="items-center gap-8 border-b border-primary pb-2 sm:flex">
          <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
            Choose By Category
          </h1>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChooseByCategory;

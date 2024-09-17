import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

const ChooseByCategory = () => {
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
        className="shadow border rounded p-4 flex justify-center items-center text-center hover:bg-primary/10 duration-200"
      >
        <div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/categories/${
              category?.icon
            }`}
            alt=""
            className="w-14 h-14 mx-auto"
          />
          <h6 className="mt-2 font-medium text-sm md:text-base">
            {category?.name}
          </h6>
        </div>
      </Link>
    ));
  }

  return (
    <div className="mt-6 hidden md:block">
      <div className="container">
        <div className="sm:flex gap-8 items-center border-b pb-2 border-primary">
          <h1 className="md:text-xl font-medium md:font-semibold text-neutral">
            Choose By Category
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChooseByCategory;

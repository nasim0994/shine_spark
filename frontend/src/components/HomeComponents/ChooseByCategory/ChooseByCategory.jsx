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
        className="flex items-center w-[230px] justify-center rounded border p-4 text-center duration-300 hover:bg-primary/5"
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
    <div className="mt-16 hidden md:block">
      <div className="container rounded bg-base-100 p-3">
        <div className="items-center gap-8 pb-2 sm:flex">
          <h1 className="font-medium text-neutral mx-auto
           md:text-xl">
            We believe in using only the finest and 100% natural ingredients,
            making new stuff the old fashioned way.
          </h1>
        </div>

        <div className="mt-4 flex flex-wrap justify-center mx-auto  gap-2 ">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChooseByCategory;

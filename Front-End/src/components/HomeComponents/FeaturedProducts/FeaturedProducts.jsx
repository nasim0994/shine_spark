import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetFeaturedProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";

export default function FeaturedProducts() {
  let query = {
    limit: 5,
  };

  const { data, isLoading, isError, error } =
    useGetFeaturedProductsQuery(query);

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <ProductCard key={product?._id} product={product} />
    ));
  }

  return (
    <div className="mt-2">
      <div className="container rounded-lg bg-base-100 p-4">
        <div className="flex justify-between pb-2 sm:items-center">
          <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
            Featured Products
          </h1>

          <div>
            <Link
              to="/shops"
              className="hover-go flex w-max items-center font-semibold text-primary"
            >
              <h1 className="text-sm font-normal md:text-[15px]">Shop More</h1>
              <MdKeyboardArrowRight className="pt-px text-[22px] duration-200" />
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-[25%]">
            <img className="h-full" src="/images/side-img.jpeg" alt="side_img" />
          </div>
          <div className="w-full h-full mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";

const PopularProducts = () => {
  const query = {
    limit: 10,
  };
  const { data, isLoading, isError, error } = useGetAllProductsQuery(query);
  const products = data?.data;

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && products?.length > 0) {
    content = products?.map((product) => (
      <ProductCard key={product?._id} product={product} />
    ));
  }

  if (products?.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="container rounded-lg bg-base-100 p-4 shadow-lg">
        <div className="flex justify-between border-b border-primary pb-2 sm:items-center">
          <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
            Popular Products
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

        {/* Product Card */}
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;

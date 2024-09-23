import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";

export default function ProductsSection({ category }) {
  const query = {};
  query["page"] = 1;
  query["limit"] = 5;
  query["category"] = category?.slug;
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    ...query,
  });

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

  if (data?.data?.length > 0) {
    return (
      <div className="mt-4">
        <div className="container rounded-lg p-4">
          <div className="flex justify-between pb-2 sm:items-center">
            <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
              {category?.name}
            </h1>

            <div>
              <Link
                to={`/shops/${category?.slug}`}
                className="hover-go flex w-max items-center font-semibold text-primary"
              >
                <h1 className="text-sm font-normal md:text-[15px]">
                  Shop More
                </h1>
                <MdKeyboardArrowRight className="pt-px text-[22px] duration-200" />
              </Link>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

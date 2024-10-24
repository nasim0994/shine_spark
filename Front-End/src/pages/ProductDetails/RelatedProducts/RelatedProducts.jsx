import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import ProductCard from "../../../components/ProductCard/ProductCard";
import ProductCards from "../../../components/Skeleton/ProductCards/ProductCards";

export default function RelatedProducts({ category }) {
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

  return (
    <section className="mt-6">
      <div>
        <div className="flex justify-between border-b border-primary pb-2 sm:items-center">
          <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
            Related Products
          </h1>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
      </div>
    </section>
  );
}

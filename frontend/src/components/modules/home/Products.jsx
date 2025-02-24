import ProductCard from "@/components/shared/main/ProductCard";
import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";
import { useGetAllProductsQuery } from "@/Redux/product/productApi";

export default function Products() {
  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading && <ProductCards />}
          {!isLoading &&
            products?.length > 0 &&
            products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}

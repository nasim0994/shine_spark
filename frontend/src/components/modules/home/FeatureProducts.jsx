import ProductCard from "@/components/shared/main/ProductCard";
import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";
import { useGetFeaturedProductsQuery } from "@/Redux/product/productApi";

export default function FeatureProducts() {
  const { data, isLoading } = useGetFeaturedProductsQuery();
  const products = data?.data;

  return (
    <section className="py-2 lg:py-5">
      <div className="container">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
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

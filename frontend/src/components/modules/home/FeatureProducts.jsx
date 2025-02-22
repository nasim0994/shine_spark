import ProductCard from "@/components/shared/main/ProductCard";

export default function FeatureProducts() {
  return (
    <section className="py-2 lg:py-5">
      <div className="container">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

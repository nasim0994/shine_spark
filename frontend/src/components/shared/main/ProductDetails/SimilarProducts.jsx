import { useGetAllProductsQuery } from "@/Redux/product/productApi";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";
import ProductCard from "../ProductCard";

export default function SimilarProducts({ category }) {
  const { data, isLoading } = useGetAllProductsQuery({ category });
  const products = data?.data;

  return (
    products?.length > 0 && (
      <div className="mt-10">
        <h2 className="text-2xl">Similar Products</h2>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading && <ProductCards />}
          {!isLoading &&
            products?.length > 0 &&
            products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    )
  );
}

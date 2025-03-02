import { useGetAllProductsQuery } from "@/Redux/product/productApi";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";

export default function SimilarProducts({ category, currentProduct }) {
  const { data, isLoading } = useGetAllProductsQuery({ category });
  const products = data?.data;
  const [targetedProducts, setTargetedProducts] = useState([]);
  useEffect(() => {
    if (products?.length) {
      const targetedProducts = products?.filter(
        (product) => product?._id !== currentProduct,
      );
      setTargetedProducts(targetedProducts);
    }
  }, [products, currentProduct]);

  return (
    targetedProducts?.length > 0 && (
      <div className="mt-10">
        <h2 className="text-2xl">Similar Products</h2>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading && <ProductCards />}
          {!isLoading &&
            targetedProducts?.length > 0 &&
            targetedProducts?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
        </div>
      </div>
    )
  );
}

import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { Link } from "react-router-dom";

export default function Categories() {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data;

  return (
    <section className="py-2 lg:py-5">
      <div className="container">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {isLoading && <ProductCards />}
          {!isLoading &&
            categories?.length > 0 &&
            categories?.map((category) => (
              <Link
                key={category?._id}
                to={`/shops?category=${category?.slug}`}
                className="relative"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
                  alt={category?.name}
                  width={400}
                  height={400}
                  className="h-[280px] w-full object-cover sm:h-[350px] md:h-[400px] lg:h-[450px]"
                />

                <div className="absolute bottom-10 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col gap-2 text-center">
                  <h2 className="text-xl text-base-100 md:text-[28px]">
                    {category?.name}
                  </h2>
                  <p className="-mt-2 text-base-100">On Sale</p>
                  <button className="mx-auto w-max border border-primary bg-base-100 px-6 py-1 text-sm text-neutral md:py-1.5 md:text-[17px]">
                    Shop Now
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

export default function ChooseByBrand() {
  const { data, isLoading } = useAllBrandsQuery();
  const brands = data?.data;

  if (isLoading) return <CategoryCard />;

  if (brands?.length > 0) {
    return (
      <section className="mt-8">
        <div className="container">
          <h2 className="mb-4 text-center text-3xl font-semibold text-secondary">
            Featured Brands
          </h2>
          <div className="flex flex-wrap justify-center gap-14">
            {brands?.map((category) => (
              <Link
                key={category?._id}
                to={`shops/${category.slug}`}
                className="flex items-center justify-center text-center"
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
                    alt={category?.name}
                    className="mx-auto h-28 w-28 rounded-full border-8 border-base-100 shadow"
                    loading="lazy"
                  />
                  <h6 className="mt-2 text-sm font-medium md:text-base">
                    {category?.name}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

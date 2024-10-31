import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function MobileCategories() {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data;

  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-2">
        <CategoryCard />
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="mt-2 md:hidden">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            100: {
              slidesPerView: 2,
              spaceBetween: 3,
            },
            350: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
            600: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {categories?.map((category) => (
            <SwiperSlide key={category?._id}>
              <Link
                to={`shops/${category.slug}`}
                className="flex h-[90px] items-center justify-center rounded border p-2 text-center shadow"
              >
                <div>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
                    alt={category?.name}
                    className="mx-auto h-9 w-10"
                    loading="lazy"
                  />
                  <h6 className="mt-2 text-[10px] font-medium">
                    {category?.name}
                  </h6>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

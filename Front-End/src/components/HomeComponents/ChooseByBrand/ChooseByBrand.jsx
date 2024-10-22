import { Link } from "react-router-dom";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function ChooseByBrand() {
  const { data, isLoading } = useAllBrandsQuery();

  if (isLoading) return <CategoryCard />;

  if (data?.data?.length > 0) {
    return (
      <div className="mt-3">
        <div className="container rounded-lg bg-base-100 p-4 shadow-lg">
          <div className="items-center gap-8 border-b border-primary pb-2 sm:flex">
            <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
              Featured Brands
            </h1>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              100: {
                slidesPerView: 3,
                spaceBetween: 3,
              },
              350: {
                slidesPerView: 4,
                spaceBetween: 3,
              },
              750: {
                slidesPerView: 5,
                spaceBetween: 3,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            className="mt-2"
          >
            {data?.data?.map((brand) => (
              <SwiperSlide key={brand?._id}>
                <Link
                  to={`shops/brand/${brand?.slug}`}
                  className="flex items-center justify-center rounded border p-4 text-center shadow duration-200 hover:bg-primary/10"
                >
                  <div>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${brand?.icon}`}
                      alt={brand?.name}
                      className="mx-auto h-10 w-10 rounded sm:h-14 sm:w-14"
                      loading="lazy"
                    />
                    <h6 className="mt-2 text-xs font-medium sm:text-sm lg:text-base">
                      {brand?.name}
                    </h6>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

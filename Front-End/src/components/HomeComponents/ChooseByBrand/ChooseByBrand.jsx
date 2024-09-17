import { Link } from "react-router-dom";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function ChooseByBrand() {
  const { data, isLoading, isError, error } = useAllBrandsQuery();

  let content = null;
  if (isLoading) {
    content = <CategoryCard />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((brand) => (
      <SwiperSlide key={brand?._id}>
        <Link
          to={`shops/brand/${brand?.slug}`}
          className="shadow border rounded p-4 flex justify-center items-center text-center hover:bg-primary/10 duration-200"
        >
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/brands/${brand?.icon}`}
              alt=""
              className="w-10 sm:w-14 h-10 sm:h-14 mx-auto"
            />
            <h6 className="mt-2 font-medium text-xs sm:text-sm lg:text-base">
              {brand?.name}
            </h6>
          </div>
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <div className="mt-4">
      <div className="container">
        <div className="sm:flex gap-8 items-center border-b pb-2 border-primary">
          <h1 className="md:text-xl font-medium md:font-semibold text-neutral">
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
          {content}
        </Swiper>
      </div>
    </div>
  );
}

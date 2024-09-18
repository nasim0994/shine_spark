import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";

export default function FlashSection({ deal, isLoading }) {
  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }

  if (!isLoading && deal?.flashProducts?.length > 0) {
    content = deal?.flashProducts?.map((product) => (
      <SwiperSlide key={product._id}>
        <ProductCard key={product?._id} product={product?.product} />
      </SwiperSlide>
    ));
  }

  return (
    <div className="container rounded-lg bg-base-100 shadow-lg">
      <div className="flex justify-between border-b border-primary p-2 sm:items-center">
        <h1 className="font-medium text-neutral md:text-xl md:font-semibold">
          {deal?.title}
        </h1>

        <div>
          <Link
            to="/shops"
            className="hover-go flex w-max items-center font-semibold text-primary"
          >
            <h1 className="text-sm font-normal md:text-[15px]">Shop More</h1>
            <MdKeyboardArrowRight className="pt-px text-[22px] duration-200" />
          </Link>
        </div>
      </div>

      <div className="sm:p-3">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          className="mySwiper h-full w-full"
        >
          {content}
        </Swiper>
      </div>
    </div>
  );
}

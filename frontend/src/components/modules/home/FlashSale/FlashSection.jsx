import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";
import ProductCard from "@/components/shared/main/ProductCard";

export default function FlashSection({ deal, isLoading }) {
  let content = null;
  if (isLoading) content = <ProductCards />;

  if (!isLoading && deal?.flashProducts?.length > 0) {
    content = deal?.flashProducts?.map((product) => (
      <SwiperSlide key={product._id}>
        <ProductCard
          key={product?._id}
          product={product?.product}
          discount={product?.discount}
        />
      </SwiperSlide>
    ));
  }

  return (
    <div className="container">
      <h2 className="mb-3 text-center text-xl sm:mb-6 sm:text-2xl">
        {deal?.title}
      </h2>

      <div>
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

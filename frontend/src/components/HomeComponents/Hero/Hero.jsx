import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";
import { Link } from "react-router-dom";

export default function Hero() {
  const { data, isLoading, isError } = useGetBannersQuery();

  let content = null;

  if (isLoading) {
    content = <Banner />;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((banner) => (
      <SwiperSlide key={banner._id}>
        <Link to={banner?.link}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.image}`}
            alt="banner"
            className="h-full w-full"
            loading="lazy"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="mt-2 relative h-40 sm:h-60 lg:mt-0 lg:h-[480px]">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper h-full w-full"
        >
          {content}
        </Swiper>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-center z-10">
          <p className="px-5 py-1.5 bg-white text-black border-b-[2px] border-black uppercase font-normal tracking-wider text-xs md:text-sm" >Made in Bangladesh</p>
        </div>
      </div>
    </section>
  );
}

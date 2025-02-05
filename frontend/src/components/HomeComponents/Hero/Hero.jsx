import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";
import { Link } from "react-router-dom";

export default function Hero() {
  const { data, isLoading, isError } = useGetBannersQuery();
  const tagLine = data?.data?.[0]?.tag;

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
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="relative mt-2 h-40 sm:h-60 lg:mt-0 lg:h-[520px]">
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
        <div className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 transform text-center">
          <p className="border-b-[2px] border-black bg-white px-5 py-1.5 text-xs font-normal uppercase tracking-wider text-black md:text-sm">
            {tagLine}
          </p>
        </div>
      </div>
    </section>
  );
}

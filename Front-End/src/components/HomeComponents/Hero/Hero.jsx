import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";

export default function Hero() {
  const { data, isLoading } = useGetBannersQuery();

  if (isLoading) return <Banner />;

  return (
    <section>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        loop={true}
      >
        {data?.data?.map((banner) => (
          <SwiperSlide key={banner._id}>
            <Link to={banner?.link}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.image}`}
                alt="banner"
                className="h-60 w-full sm:h-[400px] md:h-[500px]"
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

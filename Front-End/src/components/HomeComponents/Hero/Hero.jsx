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
            alt=""
            className="h-40 w-full sm:h-80"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
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
    </section>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import { Link } from "react-router-dom";
import BannerSkeleton from "@/components/shared/Skeleton/BannerSkeleton";

export default function Banner() {
  const { data, isLoading, isError } = useGetBannersQuery();

  let content = null;
  if (isLoading) return (content = <BannerSkeleton />);

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
    <section className="py-3">
      <div className="container">
        <div className="relative h-40 sm:h-60 lg:h-[520px]">
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
        </div>
      </div>
    </section>
  );
}

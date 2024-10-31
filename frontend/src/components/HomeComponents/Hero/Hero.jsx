import CategoryLists from "../../CategoryLists/CategoryLists";
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
            className="h-full w-full rounded"
            loading="lazy"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="container">
        <div className="items-start gap-4 lg:flex">
          <div className="hidden rounded-b border md:h-[400px] lg:block">
            <CategoryLists />
          </div>

          <div className="hero_slider mt-2 h-36 sm:h-52 lg:mt-0 lg:h-[400px]">
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
      </div>
    </section>
  );
}

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
            alt=""
            className="w-full h-full rounded"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="container">
        <div className="lg:flex items-start gap-4">
          <div className="hidden lg:block border rounded-b md:h-[400px]">
            <CategoryLists />
          </div>

          <div className="hero_slider h-36 sm:h-52 lg:h-[400px] mt-2 lg:mt-0">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="mySwiper w-full h-full"
            >
              {content}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

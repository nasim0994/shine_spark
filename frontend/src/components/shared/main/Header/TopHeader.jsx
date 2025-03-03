import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetAllTopHeaderQuery } from "@/Redux/topHeader/topHeaderApi";

export default function TopHeader() {
  const { data } = useGetAllTopHeaderQuery();
  const topHeaders = data?.data;

  return (
    <section className="bg-primary py-1.5 text-base-100">
      <div className="container">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 9000,
            disableOnInteraction: false,
          }}
          className="mySwiper h-full w-full"
        >
          {topHeaders?.map((topHeader) => (
            <SwiperSlide key={topHeader?._id}>
              <h2 className="text-center text-[13.5px]">{topHeader?.title}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetCampaignBannersQuery } from "@/Redux/campaignBanner/campaignBannerApi";

export default function CampaignBanner1() {
  const { data, isLoading } = useGetCampaignBannersQuery();
  const banners = data?.data;

  if (isLoading) {
    return (
      <>
        <div className="h-40 w-full rounded bg-base-100 shadow sm:h-52"></div>{" "}
        <div className="h-40 w-full rounded bg-base-100 shadow sm:h-52"></div>
      </>
    );
  }

  if (banners?.length === 0) return null;

  return (
    <section className="pt-5">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
          className="w-full"
        >
          {banners?.map((banner) => (
            <SwiperSlide key={banner?._id}>
              <Link to={`/${banner?.link}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
                    banner?.image
                  }`}
                  alt="Campaign Banner"
                  className="w-full rounded md:h-60"
                  loading="lazy"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

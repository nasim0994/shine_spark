import { Link } from "react-router-dom";
import { useGetTopCampaignBannersQuery } from "../../../../Redux/topCampaignBanner";

export default function ShopBannerCom() {
  const { data, isLoading } = useGetTopCampaignBannersQuery();

  if (isLoading) {
    return (
      <div className="h-28 w-full rounded bg-gray-100 sm:h-40 lg:h-60"></div>
    );
  }

  if (!data?.data[0]?.image) return null;

  return (
    <section className="py-4">
      <div className="container">
        <div className="mx-auto sm:w-3/4">
          <div className="relative h-28 w-full sm:h-40 lg:h-60">
            <Link to="/shops">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
                  data?.data[0]?.image
                }`}
                alt="shopcampaign"
                className="h-full w-full rounded"
                loading="lazy"
              />
            </Link>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Link
                to="/shops"
                className="animate_btn block rounded-full bg-primary px-6 py-2 text-[10px] text-base-100 sm:text-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { useGetTopCampaignBannersQuery } from "../../../../Redux/topCampaignBanner";

export default function TopCampaignBanner() {
  const { data, isLoading } = useGetTopCampaignBannersQuery();

  if (isLoading) {
    return (
      <div className="w-full h-28 sm:h-40 lg:h-60 bg-gray-100 rounded"></div>
    );
  }

  return (
    <section className="py-4">
      <div className="container">
        <div className="sm:w-3/4 mx-auto">
          <div className="w-full h-28 sm:h-40 lg:h-60 relative">
            <Link to="/shops">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                  data?.data[0]?.image
                }`}
                alt=""
                className="w-full h-full rounded"
              />
            </Link>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Link
                to="/shops"
                className="block bg-green-700 text-base-100 px-6 py-2 rounded-full text-[10px] sm:text-sm animate_btn"
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

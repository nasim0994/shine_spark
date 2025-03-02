import { useGetTopCampaignBannersQuery } from "@/Redux/topCampaignBanner";

export default function CampaignBanner1() {
  const { data } = useGetTopCampaignBannersQuery();
  const banner = data?.data && data?.data[0];

  return (
    banner?.image && (
      <section className="py-5">
        <div className="container">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
              banner?.image
            }`}
            alt="campaign1"
            width={800}
            height={500}
            className="w-full"
          />
        </div>
      </section>
    )
  );
}

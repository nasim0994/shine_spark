import usePageView from "../../hooks/usePageView";
import Categories from "@/components/modules/home/Categories";
import CampaignBanner1 from "@/components/modules/home/CampaignBanner1";
import FeatureProducts from "@/components/modules/home/FeatureProducts";
import CampaignBanner2 from "@/components/modules/home/CampaignBanner2";
import Products from "@/components/modules/home/Products";
// import CustomerStories from "@/components/modules/home/CustomerStories";
import Banner from "@/components/modules/home/Banner";
import FlashSale from "@/components/modules/home/FlashSale/FlashSale";

export default function Home() {
  window.scroll(0, 0);
  usePageView("Home");

  return (
    <>
      <Banner />
      <Categories />
      <FlashSale />
      <FeatureProducts />
      <CampaignBanner1 />
      <Products />
      <CampaignBanner2 />
      {/* <CustomerStories /> */}
    </>
  );
}

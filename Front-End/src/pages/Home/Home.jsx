import TopCampaignBanner from "../../components/HomeComponents/Campaign/TopCampaignBanner/TopCampaignBanner";
import CategoryWaysProducts from "../../components/HomeComponents/CategoryWaysProducts/CategoryWaysProducts";
import ChooseByBrand from "../../components/HomeComponents/ChooseByBrand/ChooseByBrand";
import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import Hero from "../../components/HomeComponents/Hero/Hero";
import MobileCategories from "../../components/HomeComponents/MobileCategories/MobileCategories";

export default function Home() {
  window.scroll(0, 0);
  return (
    <>
      <Hero />
      <MobileCategories />
      <ChooseByCategory />
      <FlashSale />
      <FeaturedProducts />
      <TopCampaignBanner />
      <CategoryWaysProducts />
      <ChooseByBrand />
    </>
  );
}

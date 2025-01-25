import CampaignBanner from "../../components/HomeComponents/Campaign/CampaignBanner/CampaignBanner";
import ShopBannerCom from "../../components/HomeComponents/Campaign/ShopBannerCom/ShopBannerCom";
import CategoryWaysProducts from "../../components/HomeComponents/CategoryWaysProducts/CategoryWaysProducts";
import ChooseByBrand from "../../components/HomeComponents/ChooseByBrand/ChooseByBrand";
import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import Hero from "../../components/HomeComponents/Hero/Hero";
import MobileCategories from "../../components/HomeComponents/MobileCategories/MobileCategories";
import PopularProducts from "../../components/HomeComponents/PopularProducts/PopularProducts";
import Services from "../../components/HomeComponents/Services/Services";
import usePageView from "../../hooks/usePageView";

export default function Home() {
  window.scroll(0, 0);
  usePageView("Home");

  return (
    <>
      <Hero />
      <ChooseByCategory />
      <MobileCategories />
      <ShopBannerCom />
      <FlashSale />
      <FeaturedProducts />
      <CampaignBanner />
      <ChooseByBrand />
      <PopularProducts />
      <CategoryWaysProducts />
      <Services />
    </>
  );
}

import ProductCards from "@/components/shared/Skeleton/ProductCards/ProductCards";
import { useGetActiveFlashDealQuery } from "@/Redux/flashDeal/flashDeal";
import FlashSection from "./FlashSection";

export default function FlashSale() {
  const { data, isLoading, isError, error } = useGetActiveFlashDealQuery();

  let content = null;
  if (isLoading) content = <ProductCards />;
  if (!isLoading && isError) content = <p>{error.error}</p>;

  if (!isLoading && !isError) {
    content = data?.data?.map((deal) => (
      <FlashSection key={deal?._id} deal={deal} isLoading={isLoading} />
    ));
  }

  if (data?.data?.length > 0) {
    return <div className="mt-2">{content}</div>;
  }
}

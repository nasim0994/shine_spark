import { useState } from "react";
import parcer from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";
import Spinner from "../../components/Spinner/Spinner";
import ProductInfo from "./ProductInfo";
import RightSideInfo from "./RightSideInfo";
import Reviews from "./Review/Reviews";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  window.scroll(0, 0);
  const params = useParams();

  const [tab, setTab] = useState("description");
  let slug = params?.id;

  const { data, isLoading } = useGetProductBySlugQuery(slug);

  const description = data?.data?.description ? data?.data?.description : "";
  const parcerDescription = parcer(description);

  let content = null;

  if (isLoading) return (content = <Spinner />);

  if (!isLoading) {
    content = (
      <div>
        <div className="mt-4 overflow-hidden lg:flex">
          <div className="text-neutral lg:w-[75%]">
            <ProductInfo product={data?.data} />
          </div>

          <div className="bg-stone-50 p-4 text-sm lg:w-[25%]">
            <RightSideInfo service={data?.data?.service} />
          </div>
        </div>

        {/* Details */}
        <div className="mt-6">
          <div className="flex items-center gap-6 border-b">
            <button
              onClick={() => setTab("description")}
              className={`${
                tab === "description" && "border-b border-primary"
              } pb-2`}
            >
              Description
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={`${
                tab === "reviews" && "border-b border-primary"
              } pb-2`}
            >
              Reviews
            </button>
          </div>

          <div>
            {tab === "description" && (
              <div className="mt-3 pl-2 text-sm text-neutral-content">
                {parcerDescription}
              </div>
            )}
            {tab === "reviews" && <Reviews product={data?.data} />}
          </div>
        </div>

        <RelatedProducts category={data?.data?.category} />
      </div>
    );
  }

  return (
    <section className="pb-8">
      <div className="container">{content}</div>
    </section>
  );
}

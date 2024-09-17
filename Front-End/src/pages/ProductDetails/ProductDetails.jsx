import parcer from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";
import Spinner from "../../components/Spinner/Spinner";
import ProductInfo from "./ProductInfo";
import RightSideInfo from "./RightSideInfo";
import { useEffect, useState } from "react";
import Reviews from "./Review/Reviews";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [tab, setTab] = useState("description");
  const params = useParams();
  let slug = params?.id;
  const { data, isLoading, isError, error, isSuccess } =
    useGetProductBySlugQuery(slug);

  const description = isSuccess ? data?.data?.description : "";
  const parcerDescription = parcer(description);

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && isSuccess) {
    content = (
      <div>
        <div className="lg:flex shadow-lg mt-4 rounded overflow-hidden">
          <div className="lg:w-[75%] bg-base-100 p-4 text-neutral">
            <ProductInfo product={data?.data} />
          </div>

          <div className="lg:w-[25%] bg-stone-50 p-4 text-sm">
            <RightSideInfo service={data?.data?.service} />
          </div>
        </div>

        {/* Details */}
        <div className="bg-base-100 shadow-lg p-4 rounded mt-6">
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

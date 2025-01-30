import { useEffect, useState } from "react";
import parcer from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";
import Spinner from "../../components/Spinner/Spinner";
import ProductInfo from "./ProductInfo";
import Reviews from "./Review/Reviews";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import usePageView from "../../hooks/usePageView";

export default function ProductDetails() {
  usePageView("Product Details");
  const params = useParams();

  const [tab, setTab] = useState("description");
  let slug = params?.id;

  const { data, isLoading } = useGetProductBySlugQuery(slug);

  useEffect(() => {
    window.scroll(0, 0);

    // set meta description
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = data?.data?.description;

    // set meta image
    const metaImage = document.createElement("meta");
    metaImage.property = "og:image";
    metaImage.content =
      import.meta.env.VITE_BACKEND_URL + "/products/" + data?.data?.thumbnail;

    if (data?.data?.thumbnail) {
      document.getElementsByTagName("head")[0].appendChild(metaImage);
    }

    if (data?.data?.description) {
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    // Push product view event to the Data Layer
    if (data?.success) {
      const discountPrice = parseInt(
        data?.data?.sellingPrice -
          (data?.data?.sellingPrice * data?.data?.discount) / 100,
      );

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "view_item",
        customer: {},
        ecommerce: {
          currency: "BDT",
          value: discountPrice,
          items: [
            {
              item_id: data?.data?._id,
              item_name: data?.data?.title,
              quantity: 1,
              price: discountPrice,
              discount: data?.data?.discount,
              item_brand: data?.data?.brand,
              item_category: data?.data?.category?.name,
              item_category2: data?.data?.subCategory?.name,
              item_category3: data?.data?.subSubCategory?.name,
            },
          ],
        },
      });
    }
  }, [data]);

  const description = data?.data?.description ? data?.data?.description : "";
  const parcerDescription = parcer(description);

  let content = null;

  if (isLoading) return (content = <Spinner />);

  if (!isLoading) {
    content = (
      <div>
        <div className="mt-4 w-full overflow-hidden lg:flex">
          <div className="text-neutral">
            <ProductInfo product={data?.data} />
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

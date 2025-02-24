import IHeart from "@/components/shared/icons/IHeart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetProductBySlugQuery } from "@/Redux/product/productApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import SimilarProducts from "@/components/shared/main/ProductDetails/SimilarProducts";
import BreadcrumbCom from "@/components/shared/main/ProductDetails/BreadcrumbCom";

export default function ProductDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();

  const { data, isLoading } = useGetProductBySlugQuery(slug);
  const product = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-2">
      <div className="container">
        <BreadcrumbCom title={product?.title} />

        <div className="mt-4 grid gap-10 lg:grid-cols-5">
          {/* left-images */}
          <div className="grid gap-3 md:grid-cols-7 md:gap-4 lg:col-span-3">
            <div className="order-2 flex gap-2 md:order-1 md:flex-col md:gap-3">
              {product?.galleries?.map((gallery, i) => (
                <img
                  key={i}
                  src={`${import.meta.env.VITE_BACKEND_URL}/products/${gallery}`}
                  alt={`product`}
                  width={100}
                  height={60}
                  className="w-12 md:h-32 md:w-full"
                />
              ))}
            </div>

            <div className="order-1 md:order-2 md:col-span-6">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.thumbnail}`}
                alt={product?.title}
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          {/* right-info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium">{product?.title}</h2>
            <div className="flex items-center justify-between">
              <p className="text-neutral">Style No SG263271</p>
              <button>
                <IHeart width={22} height={22} />
              </button>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-lg">
                {product?.discount > 0 ? (
                  <>
                    <p className="text-lg">
                      {parseInt(
                        product?.sellingPrice -
                          (product?.sellingPrice * product?.discount) / 100,
                      )}
                    </p>
                    <del className="text-neutral-content opacity-80">
                      {product?.sellingPrice}
                    </del>
                    <p className="text-[15px] text-red-500">
                      {product?.discount}% off
                    </p>
                  </>
                ) : (
                  <p>{product?.sellingPrice}</p>
                )}
              </div>

              <small className="block text-xs text-neutral-content opacity-60">
                Inclusive of all taxes
              </small>
            </div>

            {/* Sizes */}
            {product?.sizes?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Select Size</p>
                  <button className="text-primary hover:underline">
                    Size Guide
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-start gap-2">
                  {product?.sizes?.map((size, i) => (
                    <button
                      key={i}
                      className="rounded-xl border px-4 py-1.5 duration-300 hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product?.colors?.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg">Select Color</p>
                </div>

                <div className="mt-2 flex flex-wrap items-start gap-2">
                  {product?.colors?.map((color, i) => (
                    <TooltipProvider key={i}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/products/${color?.image}`}
                            alt={`primport { parser } from 'html-react-parser';
oduct`}
                            width={20}
                            height={20}
                            className="h-12 w-12 cursor-pointer rounded"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{color?.color}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 uppercase">
              <button className="rounded border border-primary py-2 text-primary duration-300 hover:bg-primary hover:text-base-100">
                Add to Cart
              </button>
              <button className="rounded border border-primary bg-primary py-2 text-base-100 duration-300 hover:bg-transparent hover:text-primary">
                Buy Now
              </button>
            </div>

            {/* details */}
            <div className="mt-5">
              <p className="text-lg">Product Details</p>

              <div className="mt-2 opacity-80">
                {product?.description && parser(product?.description)}
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts category={product?.category?._id} />
      </div>
    </section>
  );
}

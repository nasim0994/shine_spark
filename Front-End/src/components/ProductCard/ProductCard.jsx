import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import { FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product }) {
  const {
    slug,
    images,
    title,
    sellingPrice,
    discount,
    variants,
    rating,
    reviewer,
  } = product;

  return (
    <div className="product_card">
      <div className="flex h-full flex-col justify-between rounded shadow">
        <Link to={`/product/${slug}`}>
          <div className="relative h-56 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${images[0]}`}
              alt=""
              className="product_img h-full w-full"
            />

            {discount > 0 && (
              <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
                <p>{discount}%</p>
              </div>
            )}
          </div>

          <h1 className="title mb-1 p-2 text-sm font-medium sm:text-base">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h1>
        </Link>

        <div>
          <div className="p-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-primary sm:text-lg">
                ৳
                {variants?.length > 0
                  ? parseInt(
                      variants[0]?.sellingPrice -
                        (variants[0]?.sellingPrice * discount) / 100,
                    )
                  : parseInt(sellingPrice - (sellingPrice * discount) / 100)}
              </p>
              {discount > 0 && (
                <del className="text-xs text-neutral/70 sm:text-sm">
                  ৳
                  {variants?.length > 0
                    ? parseInt((variants[0]?.sellingPrice * discount) / 100)
                    : parseInt((sellingPrice * discount) / 100)}
                </del>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Rating rating={rating || 0} />
              <p className="text-neutral-content text-xs">
                ({reviewer ? reviewer : 0})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2">
            <button className="rounded bg-primary/20 py-1.5 text-sm text-primary duration-300 hover:bg-primary hover:text-base-100">
              Buy Now
            </button>
            <button className="flex items-center justify-center gap-2 rounded bg-gray-200 py-1.5 text-sm duration-300 hover:bg-gray-500 hover:text-base-100">
              <span className="hidden sm:block">Add to Cart</span>
              <FaCartPlus className="sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

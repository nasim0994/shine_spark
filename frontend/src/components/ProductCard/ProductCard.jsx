import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

export default function ProductCard({ product, discount: flashDiscount = 0 }) {
  const { slug, thumbnail, title, sellingPrice, discount, rating, reviewer } =
    product;

  const newDiscount = parseInt(flashDiscount) + discount;

  return (
    <>
      <div className="product_card">
        <div className="flex h-full flex-col justify-between rounded shadow">
          <Link
            onClick={() => {
              sessionStorage.setItem("discount", newDiscount);
            }}
            to={`/product/${slug}`}
          >
            <div className="relative h-40 overflow-hidden sm:h-[280px]">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
                alt={title}
                className="product_img h-full w-full object-cover rounded"
                loading="lazy"
              />

              {newDiscount > 0 && (
                <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
                  <p>{newDiscount}%</p>
                </div>
              )}
            </div>

            <h1 className="title p-2 text-sm font-medium sm:text-base">
              {title.length > 45 ? `${title.slice(0, 45)}...` : title}
            </h1>
          </Link>

          <div>
            <div className="p-2 pt-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-primary sm:text-lg">
                  ৳{parseInt(sellingPrice - (sellingPrice * newDiscount) / 100)}
                </p>

                {newDiscount > 0 && (
                  <del className="text-xs text-red-400 sm:text-sm">
                    ৳{parseInt(sellingPrice)}
                  </del>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Rating rating={rating || 0} />
                <p className="text-xs text-neutral-content">
                  ({reviewer ? reviewer : 0})
                </p>
              </div>

              <div className="mt-2">
                <Link
                  onClick={() => {
                    sessionStorage.setItem("discount", newDiscount);
                  }}
                  to={`/product/${slug}`}
                  className="block rounded bg-primary py-1.5 text-center text-sm text-base-100"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

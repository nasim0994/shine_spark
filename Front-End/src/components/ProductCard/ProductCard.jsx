import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const ProductCard = ({ product }) => {
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
    <div className="product_card mt-2 overflow-hidden rounded border duration-300 hover:shadow-lg sm:border-0">
      <Link to={`/product/${slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${images[0]}`}
            alt=""
            className="product_img h-full w-full"
          />
          {/* Discount */}
          {discount > 0 && (
            <div className="absolute right-0 top-1 w-max rounded-l-full bg-red-600 px-2 py-px text-base-100">
              <p>{discount}%</p>
            </div>
          )}
        </div>

        <div className="p-2">
          <h1 className="mb-1 h-14 text-sm font-medium min-[410px]:h-10 sm:text-[15px]">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h1>
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
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Rating rating={rating || 0} />
            <p className="text-neutral-content text-xs">
              ({reviewer ? reviewer : 0})
            </p>
          </div>
        </div>

        <div className="p-2">
          <button className="w-full bg-primary py-1.5 text-sm text-base-100">
            Buy Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

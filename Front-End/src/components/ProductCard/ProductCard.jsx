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
    <div className="mt-2 hover:shadow-lg rounded overflow-hidden duration-300 border sm:border-0 product_card">
      <Link to={`/product/${slug}`}>
        <div className="overflow-hidden relative h-44 sm:h-56">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${images[0]}`}
            alt=""
            className="w-full h-full product_img"
          />
          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
              <p>{discount}%</p>
            </div>
          )}
        </div>

        <div className="p-2">
          <h1 className="font-medium mb-1 text-sm sm:text-[15px] h-14 min-[410px]:h-10">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-primary text-sm sm:text-lg">
              ৳
              {variants?.length > 0
                ? parseInt(
                    variants[0]?.sellingPrice -
                      (variants[0]?.sellingPrice * discount) / 100
                  )
                : parseInt(sellingPrice - (sellingPrice * discount) / 100)}
            </p>
            {discount > 0 && (
              <del className="text-neutral/70 text-xs sm:text-sm">
                ৳
                {variants?.length > 0
                  ? parseInt((variants[0]?.sellingPrice * discount) / 100)
                  : parseInt((sellingPrice * discount) / 100)}
              </del>
            )}
          </div>
          <div className="flex gap-1 items-center text-sm mt-1">
            <Rating rating={rating || 0} />
            <p className="text-xs text-neutral-content">
              ({reviewer ? reviewer : 0})
            </p>
          </div>
        </div>

        <div className="p-2">
          <button className="bg-primary text-base-100 w-full text-sm py-1.5">
            Buy Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

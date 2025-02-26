import { Link } from "react-router-dom";
import WishlistBtn from "./WishlistBtn";

export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="relative overflow-hidden">
        <div className="absolute right-3 top-3 z-20">
          <WishlistBtn product={product} color="#fff" />
        </div>

        <Link to={`/product/${product?.slug}`}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.thumbnail}`}
            alt={product?.title}
            width={500}
            height={500}
            className="relative z-10 h-[300px] w-full object-cover md:h-[380px]"
          />
          <button className="absolute -bottom-full z-20 w-full bg-gray-200/90 px-8 py-1.5 text-sm uppercase text-neutral duration-300 hover:bg-gray-200 group-hover:bottom-0">
            Buy Now
          </button>
        </Link>
      </div>
      <Link href={`/product/${`slug`}`}>
        <h2 className="mt-2 text-[15px] text-neutral">{product?.title}</h2>
        <div className="mt-1 flex items-center gap-2">
          {product?.discount > 0 ? (
            <>
              <p>
                {parseInt(
                  product?.sellingPrice -
                    (product?.sellingPrice * product?.discount) / 100,
                )}
              </p>
              <del className="text-sm text-neutral-content opacity-80">
                {product?.sellingPrice}
              </del>
              <p className="text-red-500">{product?.discount}%</p>
            </>
          ) : (
            <p>{product?.sellingPrice}</p>
          )}
        </div>
      </Link>
    </div>
  );
}

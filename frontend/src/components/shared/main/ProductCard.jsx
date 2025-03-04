import { Link } from "react-router-dom";
import WishlistBtn from "./WishlistBtn";
import { currencyFormatter } from "@/lib/currencyFormatter";

export default function ProductCard({ product, discount: flashDiscount = 0 }) {
  const newDiscount = parseInt(flashDiscount) + product?.discount;

  return (
    <div className="group">
      <div className="relative overflow-hidden">
        <div className="absolute right-3 top-3 z-20">
          <WishlistBtn product={product} color="#fff" />
        </div>

        <Link
          onClick={() => {
            sessionStorage.setItem("discount", newDiscount);
          }}
          to={`/product/${product?.slug}`}
        >
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
      <Link
        onClick={() => {
          sessionStorage.setItem("discount", newDiscount);
        }}
        href={`/product/${`slug`}`}
      >
        <h2 className="mt-2 text-[15px] text-neutral">{product?.title}</h2>
        <div className="mt-1 flex items-center gap-2">
          {newDiscount > 0 ? (
            <>
              <p>
                {currencyFormatter(
                  product?.sellingPrice -
                    (product?.sellingPrice * newDiscount) / 100,
                )}
              </p>
              <del className="text-sm text-neutral-content opacity-80">
                {currencyFormatter(product?.sellingPrice)}
              </del>
              <p className="text-red-500">{newDiscount}%</p>
            </>
          ) : (
            <p>{currencyFormatter(product?.sellingPrice)}</p>
          )}
        </div>
      </Link>
    </div>
  );
}

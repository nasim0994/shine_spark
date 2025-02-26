import { currencyFormatter } from "@/lib/currencyFormatter";
import { removeFromWishlist } from "@/Redux/wishlist/wishlistSlice";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function WishlistCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => dispatch(removeFromWishlist(product?._id))}
          className="absolute right-3 top-3 z-20"
        >
          <AiOutlineClose className="text-xl text-base-100 opacity-70" />
        </button>

        <Link to={`/product/${product?.slug}`}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.thumbnail}`}
            alt={product?.title}
            width={500}
            height={500}
            className="relative z-10 h-[300px] w-full object-cover md:h-[380px]"
          />
          <button className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 bg-gray-200/90 px-8 py-1.5 text-sm uppercase text-neutral duration-300 hover:bg-gray-200">
            Buy Now
          </button>
        </Link>
      </div>
      <Link to={`/product/${product?.slug}`} className="mt-2">
        <h2 className="text-[15px] text-neutral">{product?.title}</h2>
        <div className="mt-1 flex items-center gap-2">
          <p>{currencyFormatter(product?.price)}</p>
        </div>
      </Link>
    </div>
  );
}

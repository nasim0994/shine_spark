import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../../Redux/wishlist/wishlistSlice";
import usePageView from "../../../hooks/usePageView";

export default function Wishlist() {
  usePageView("Wishlist");
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b text-sm uppercase text-neutral/90">
          <tr>
            <th className="px-6 py-3 font-semibold">Product</th>
            <th className="px-6 py-3 font-semibold">Price</th>
            <th className="px-6 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlists?.map((product) => (
            <tr key={product?.id} className="border-b text-neutral/80">
              <td className="p-2">
                <div className="flex w-max items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.thumbnail
                    }`}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <Link to={`/product/${product?.slug}`}>
                    <h3 className="text-neutral">
                      {product?.title?.length > 40
                        ? product?.title.slice(0, 40) + "..."
                        : product?.title}
                    </h3>
                  </Link>
                </div>
              </td>

              <td className="px-6 py-2 font-medium">
                <p className="w-max">
                  ৳<span>{product?.sellingPrice}</span>
                </p>
              </td>

              <td className="px-6 py-2">
                <div className="flex gap-2">
                  <Link
                    to={`/product/${product?.slug}`}
                    className="rounded bg-primary px-4 py-1 text-sm text-base-100"
                  >
                    Buy Now
                  </Link>
                  <button
                    onClick={() => dispatch(removeFromWishlist(product))}
                    className="rounded bg-red-600 px-4 py-1 text-sm text-base-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

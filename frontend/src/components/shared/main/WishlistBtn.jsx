import {
  addToWishlist,
  checkIsProductInWishlist,
} from "@/Redux/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import IHeart from "../icons/IHeart";

export default function WishlistBtn({ product, color }) {
  const dispatch = useDispatch();
  const isExistWishlist = useSelector((state) =>
    checkIsProductInWishlist(state, product?._id),
  );

  return (
    <button
      onClick={() => dispatch(addToWishlist(product))}
      disabled={isExistWishlist}
    >
      {isExistWishlist ? (
        <IHeart width={22} height={22} color="#ffa500" />
      ) : (
        <IHeart width={22} height={22} color={color} />
      )}
    </button>
  );
}

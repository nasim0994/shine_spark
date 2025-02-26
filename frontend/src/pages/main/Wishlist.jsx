import WishlistCard from "@/components/shared/main/WishlistCard";
import { Button } from "@/components/ui/button";
import { clearWishlist } from "@/Redux/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Wishlist() {
  window.scrollTo(0, 0);
  const { wishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <section className="py-2 sm:py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">
            My Wishlist{" "}
            <small>
              {wishlists?.length} {wishlists?.length > 1 ? "items" : "item"}
            </small>
          </h2>

          <Button
            onClick={() => dispatch(clearWishlist())}
            size="sm"
            variant="destructive"
          >
            Clear Wishlist
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {wishlists?.map((product) => (
            <WishlistCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

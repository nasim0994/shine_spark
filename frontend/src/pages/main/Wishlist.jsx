import WishlistCard from "@/components/shared/main/WishlistCard";

export default function Wishlist() {
  return (
    <section className="py-2 sm:py-4">
      <div className="container">
        <h2 className="text-lg">
          My Wishlist <small>1 items</small>
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
        </div>
      </div>
    </section>
  );
}

import CartItems from "./CartItems/CartItems";
import CartDetails from "./CartDetails/CartDetails";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cart() {
  window.scroll(0, 0);
  const carts = useSelector((state) => state.cart.carts);

  return (
    <div className="py-5 min-h-[60vh]">
      <div className="container">
        {carts?.length > 0 ? (
          <>
            <p className="text-center text-xl font-medium mb-8">
              Your Cart - <span>{carts?.length ? carts.length : "0"}</span>{" "}
              {carts?.length ? (carts.length < 2 ? "Item" : "Items") : "Item"}
            </p>
            <div className="lg:flex gap-6">
              <div className="lg:w-[75%] shadow-lg border rounded-md">
                <CartItems carts={carts} />
              </div>
              <div className="lg:w-[25%]">
                <CartDetails carts={carts} />
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center gap-3 justify-center">
            <MdOutlineRemoveShoppingCart className="text-6xl text-primary" />
            <h2 className="text-xl">Your cart is Emtry</h2>
            <Link
              to="/shops"
              className="px-6 py-2 bg-primary text-base-100 rounded text-sm"
            >
              Continue to shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

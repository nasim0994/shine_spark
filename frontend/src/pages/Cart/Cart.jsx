import CartItems from "./CartItems/CartItems";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";
import { clearCart } from "../../Redux/cart/cartSlice";
import { useEffect } from "react";
import usePageView from "../../hooks/usePageView";

export default function Cart() {
  usePageView("Cart");
  const { loggedUser } = useSelector((state) => state.user);
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const total = carts?.reduce(
    (price, item) =>
      price +
      item.quantity * parseInt(item.price - (item.price * item.discount) / 100),
    0,
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (carts?.length > 0) {
      const user = loggedUser?.data;
      let custom = {};

      if (user) {
        custom = {
          name: user?.name,
          phone_number: user?.phone,
          email: user?.email,
          address: user?.address,
          country: "Bangladesh",
        };
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cart_view",
        custom,
        ecommerce: {
          currency: "BDT",
          value: total,

          items: [
            carts?.map((product) => ({
              item_id: product?._id,
              item_name: product?.title,
              price:
                product?.price -
                (product?.price * parseInt(product?.discount)) / 100,
              quantity: product?.quantity,
              item_discount: parseInt(product?.discount),
            })),
          ],
        },
      });
    }
  }, [carts, loggedUser, total]);

  return (
    <div className="min-h-[60vh] py-5">
      <div className="container">
        {carts?.length > 0 ? (
          <>
            <p className="mb-8 text-center text-xl font-medium">
              Your Cart - <span>{carts?.length || "0"}</span>{" "}
              {carts?.length ? (carts.length < 2 ? "Item" : "Items") : "Item"}
            </p>

            <div className="rounded-md border shadow-lg">
              <CartItems carts={carts} />
              <div className="flex items-center gap-4 p-3 text-sm">
                <Link
                  to="/shops"
                  className="primary_btn flex items-center gap-2"
                >
                  <FaArrowRight className="-rotate-180" /> Continue to shopping
                </Link>

                <button
                  onClick={() => {
                    const isConfirm = window.confirm(
                      "Are you sure clear all carts?",
                    );

                    if (isConfirm) {
                      dispatch(clearCart());
                    }
                  }}
                  className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-base-100"
                >
                  Clear Carts <MdOutlineDeleteSweep className="text-base" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="mt-1 min-w-full rounded-md border bg-base-100 p-4 shadow-lg sm:min-w-[500px]">
                <div className="flex items-center justify-between border-b pb-2 text-lg font-medium">
                  <h3>Total</h3>
                  <p>৳{total}</p>
                </div>

                <div className="mt-4">
                  <Link
                    to="/checkout"
                    className="flex scale-[.99] items-center justify-center gap-4 rounded bg-primary p-2 text-center text-sm font-semibold text-base-100 duration-300 hover:scale-[1]"
                  >
                    PROCEED TO CHECKOUT <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
            <MdOutlineRemoveShoppingCart className="text-6xl text-primary" />
            <h2 className="text-xl">Your cart is Emtry</h2>
            <Link
              to="/shops"
              className="rounded bg-primary px-6 py-2 text-sm text-base-100"
            >
              Continue to shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

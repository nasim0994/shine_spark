import CartItem from "@/components/modules/cart/CartItem";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  clearCart,
  discountAmountSelector,
  subTotalSelector,
} from "@/Redux/cart/cartSlice";
import { useEffect } from "react";
import {
  MdOutlineDeleteSweep,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { carts } = useSelector((state) => state.cart);
  const subTotal = useSelector(subTotalSelector);
  const discountAmount = useSelector(discountAmountSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="py-2 sm:py-5">
      <div className="container">
        {carts?.length > 0 ? (
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {carts?.map((product) => (
                  <CartItem key={product?._id} product={product} />
                ))}

                <div>
                  <button
                    onClick={() => {
                      const isConfirm = window.confirm(
                        "Are you sure clear all carts?",
                      );

                      if (isConfirm) {
                        dispatch(clearCart());
                        navigate("/shops");
                      }
                    }}
                    className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-sm text-base-100"
                  >
                    <MdOutlineDeleteSweep className="text-[15px]" /> Clear Carts
                  </button>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <div className="rounded border p-3">
              <h2 className="text-lg">Order summary</h2>

              <div className="mt-4 flex flex-col gap-2 text-sm text-neutral">
                <div className="flex items-center justify-between border-b pb-2">
                  <p>Subtotal</p>
                  <p>{currencyFormatter(subTotal)}</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <p>Discount on MRP</p>
                  <p className="text-red-500">
                    {currencyFormatter(discountAmount)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <p>Promo Code?</p>
                  <button className="font-medium underline">
                    Apply Coupon
                  </button>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <p>Total Price</p>
                  <p className="text-primary">{currencyFormatter(subTotal)}</p>
                </div>
              </div>

              <div className="mt-6 rounded bg-red-50 px-2 py-1.5 text-center text-sm text-neutral">
                <p>
                  Congrats! You saved total{" "}
                  <span className="text-red-500">
                    {currencyFormatter(discountAmount)}
                  </span>{" "}
                  on this order.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="primary_btn block text-center uppercase"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
            <MdOutlineRemoveShoppingCart className="text-6xl text-primary" />
            <h2 className="text-xl">Your cart is Empty</h2>
            <Link
              to="/shops"
              className="rounded bg-primary px-6 py-2 text-sm text-base-100"
            >
              Continue to shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

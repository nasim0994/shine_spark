import { AiOutlineDelete } from "react-icons/ai";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, subTotalSelector } from "@/Redux/cart/cartSlice";
import { currencyFormatter } from "@/lib/currencyFormatter";
import WishlistBtn from "../WishlistBtn";

export default function CartSidebar() {
  const { carts } = useSelector((state) => state.cart);
  const subTotal = useSelector(subTotalSelector);
  const dispatch = useDispatch();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="font-medium text-neutral">
          Your Cart{" "}
          <small>
            {carts?.length} {carts?.length > 1 ? "items" : "item"}
          </small>
        </SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col justify-between">
        <div className="hideScroll flex flex-col gap-2 overflow-y-auto border-t pt-5">
          {carts?.map((product, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.thumbnail}`}
                  alt={product?.title}
                  width={80}
                  height={50}
                  className="w-16"
                />
                <div>
                  <h2>{product?.title}</h2>
                  {product?.discount > 0 ? (
                    <div className="mt-1 flex items-center gap-2">
                      <p>
                        {currencyFormatter(
                          product?.price -
                            (product?.price * product?.discount) / 100,
                        )}
                      </p>
                      <del className="text-[11px] text-sm text-neutral-content opacity-80">
                        {currencyFormatter(product?.price)}
                      </del>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center gap-2">
                      <p>{currencyFormatter(product?.price)}</p>
                    </div>
                  )}

                  <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-neutral">
                    {product?.size && (
                      <p className="rounded bg-gray-100 px-2 py-1">
                        Size: {product?.size}
                      </p>
                    )}
                    {product?.color && (
                      <p className="rounded bg-gray-100 px-2 py-1">
                        Color: {product?.color}
                      </p>
                    )}
                    <p className="rounded bg-gray-100 px-2 py-1">
                      Qty: {product?.quantity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <WishlistBtn product={product} />
                <p>-</p>
                <button onClick={() => dispatch(removeFromCart(product))}>
                  <AiOutlineDelete className="text-xl opacity-60" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <div className="w-full border-t pb-6 pt-2">
            <div className="flex items-center justify-between text-lg font-medium">
              <p>Subtotal</p>
              <p>{currencyFormatter(subTotal)}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 uppercase">
              <SheetClose asChild>
                <Link
                  to="/checkout"
                  className="rounded border border-primary py-2 text-center text-primary duration-300 hover:bg-primary hover:text-base-100"
                >
                  Continue To Checkout
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/cart"
                  className="rounded border border-primary bg-primary py-2 text-center text-base-100 duration-300 hover:bg-transparent hover:text-primary"
                >
                  View Cart
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </div>
    </SheetContent>
  );
}

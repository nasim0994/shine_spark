import { currencyFormatter } from "@/lib/currencyFormatter";
import { changeQuantity, removeFromCart } from "@/Redux/cart/cartSlice";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CartItem({ product }) {
  const {
    _id,
    slug,
    title,
    price,
    discount,
    thumbnail,
    quantity,
    size,
    color,
  } = product;

  const dispatch = useDispatch();

  const handelIncreaseQuantity = (id, color, size) => {
    dispatch(changeQuantity({ id, color, size, quantity: quantity + 1 }));
  };

  const handelDecreaseQuantity = (id, color, size) => {
    if (quantity < 1) {
      toast.error("Quantity can't be less than 1");
      return;
    }
    dispatch(changeQuantity({ id, color, size, quantity: quantity - 1 }));
  };

  return (
    <div className="flex items-start gap-3">
      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
          alt={title}
          width={100}
          height={80}
        />
      </div>

      <div className="w-full items-start justify-between border-b pb-3 sm:flex">
        <div>
          <Link
            to={`/product/${slug}`}
            className="duration-300 hover:text-primary"
          >
            {title}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral">
            <p className="rounded bg-gray-100 px-2 py-1">Select Size: {size}</p>
            <p className="rounded bg-gray-100 px-2 py-1">
              Select Color: {color}
            </p>
            <div className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1">
              <button onClick={() => handelDecreaseQuantity(_id, color, size)}>
                <FaMinus />
              </button>
              <p className="rounded border bg-base-100 px-6 py-px">
                {quantity}
              </p>
              <button onClick={() => handelIncreaseQuantity(_id, color, size)}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="text-end">
          <div className="mt-1 flex items-center justify-end gap-2">
            {discount > 0 ? (
              <div className="mt-1 flex items-center gap-2">
                <p>{currencyFormatter(price - (price * discount) / 100)}</p>
                <del className="text-[11px] text-sm text-neutral-content opacity-80">
                  {currencyFormatter(price)}
                </del>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <p>{currencyFormatter(price)}</p>
              </div>
            )}
          </div>
          <div className="mt-1">
            <button
              onClick={() => dispatch(removeFromCart(product))}
              className="text-sm text-blue-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { MdOutlineDelete } from "react-icons/md";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { changeQuantity, removeFromCart } from "../../../Redux/cart/cartSlice";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  const { _id, thumbnail, title, discount, price, quantity, sku, stock } =
    product;

  const discountPrice = parseInt(price - (price * discount) / 100);
  const total =
    parseInt(discount >= 1 ? discountPrice : price) * parseInt(quantity);

  const handelDeleteCartItem = (id, sku) => {
    const isConfirm = window.confirm("Are you sure delete this item?");
    if (isConfirm) dispatch(removeFromCart({ id, sku }));
  };

  const handelIncreaseQuantity = (id, sku) => {
    if (stock > quantity) {
      dispatch(changeQuantity({ id, sku, quantity: quantity + 1 }));
    } else {
      Swal.fire("", "Sorry! We don't have enough stock", "warning");
    }
  };

  const handelDecreaseQuantity = (id, sku) => {
    if (quantity > 1) {
      dispatch(changeQuantity({ id, sku, quantity: quantity - 1 }));
    } else {
      Swal.fire(
        "",
        "Sorry! You can't decrease quantity. You can remove it from the remove button",
        "warning",
      );
    }
  };

  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
            alt={title}
            className="h-10 w-10 rounded-lg"
            loading="lazy"
          />
          <div className="leading-4">
            <h3 className="text-neutral">
              {title.length > 50 ? `${title.slice(0, 50)}...` : title}
            </h3>
            <p className="text-neutral-content">{sku}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-2 font-medium">
        <p>
          {discount >= 1 ? (
            <>
              <span>৳{discountPrice}</span>
              <del className="pl-1 text-xs text-red-500">৳{price}</del>
            </>
          ) : (
            <span>৳{price}</span>
          )}
        </p>
      </td>

      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handelDecreaseQuantity(_id, sku)}
            className="text-lg text-neutral-content duration-200 hover:text-neutral"
          >
            <FiMinusCircle />
          </button>
          <div>
            <p className="w-max rounded-lg py-px text-center text-neutral">
              {quantity}
            </p>
          </div>
          <button
            onClick={() => handelIncreaseQuantity(_id, sku)}
            className="text-lg text-neutral-content duration-200 hover:text-neutral"
          >
            <FiPlusCircle />
          </button>
        </div>
      </td>

      <td className="px-6 py-3 font-medium">
        <p>
          ৳<span>{total}</span>
        </p>
      </td>

      <td className="px-6 py-3">
        <button
          onClick={() => handelDeleteCartItem(_id, sku)}
          className="text-xl text-red-600 hover:underline"
        >
          <MdOutlineDelete />
        </button>
      </td>
    </tr>
  );
}

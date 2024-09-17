import { MdOutlineDelete } from "react-icons/md";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { changeQuantity, removeFromCart } from "../../../Redux/cart/cartSlice";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  const { slug, image, title, discount, price, quantity, size, color, stock } =
    product;

  console.log(product);

  const discountPrice = parseInt(price - (price * discount) / 100);
  const total =
    parseInt(discount >= 1 ? discountPrice : price) * parseInt(quantity);

  const handelDeleteCartItem = (data) => {
    const isConfirm = window.confirm("Are you sure delete this item?");
    if (isConfirm) dispatch(removeFromCart(data));
  };

  const handelIncreaseQuantity = () => {
    if (stock > quantity) {
      dispatch(changeQuantity({ ...product, quantity: quantity + 1 }));
    } else {
      Swal.fire("", "Sorry! We don't have enough stock", "warning");
    }
  };

  const handelDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({ ...product, quantity: quantity - 1 }));
    } else {
      Swal.fire(
        "",
        "Sorry! You can't decrease quantity. You can remove it from the remove button",
        "warning"
      );
    }
  };

  return (
    <tr>
      <td className="p-3">
        <div className="flex gap-2 items-center">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${image}`}
            alt={title}
            className="w-10 h-10 rounded-lg"
          />
          <Link to={`/product/${slug}`} className="leading-4">
            <h3 className="text-neutral">
              {/* {title.length > 30 ? `${title.slice(0, 30)}...` : title} */}
              {title}
            </h3>
            <p className="text-neutral-content">
              {size && <small>size: {size}</small>}{" "}
              {color && <small>color: {color}</small>}
            </p>
          </Link>
        </div>
      </td>

      <td className="px-6 py-2 font-medium">
        <p>
          {discount >= 1 ? (
            <>
              <span>৳{discountPrice}</span>
              <del className="text-xs text-neutral/80 pl-1">৳{price}</del>
            </>
          ) : (
            <span>৳{price}</span>
          )}
        </p>
      </td>

      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handelDecreaseQuantity}
            className="text-lg text-neutral-content hover:text-neutral duration-200"
          >
            <FiMinusCircle />
          </button>
          <div>
            <p className="w-max  text-neutral text-center rounded-lg py-px">
              {quantity}
            </p>
          </div>
          <button
            onClick={handelIncreaseQuantity}
            className="text-lg text-neutral-content hover:text-neutral duration-200"
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
          onClick={() => handelDeleteCartItem(product)}
          className="text-red-600 hover:underline text-xl"
        >
          <MdOutlineDelete />
        </button>
      </td>
    </tr>
  );
}

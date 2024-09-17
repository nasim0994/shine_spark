import { Link } from "react-router-dom";

const CartDetails = ({ carts }) => {
  // Subtotal - discount amount
  const subTotal = carts?.reduce(
    (price, item) =>
      price +
      item.quantity * parseInt(item.price - (item.price * item.discount) / 100),
    0
  );

  const tax = 0;
  const grandTotal = subTotal + tax;

  return (
    <div className="mt-8 lg:mt-0 px-4 pt-8 pb-5 shadow-lg text-neutral rounded border">
      {/* Cart Details */}
      <div className="flex justify-between items-center border-b border-neutral text-lg mb-4 font-semibold">
        <h1>SubTotal</h1>
        <p>
          ৳<span>{subTotal}</span>
        </p>
      </div>

      <div className="text-neutral/90">
        <div className="flex justify-between items-center border-b py-1">
          <p>Tax</p>
          <p>
            ৳<span> 00</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-lg mt-2 font-semibold">
        <h1>Grand Total</h1>
        <p>
          ৳<span> {grandTotal}</span>
        </p>
      </div>

      <div className="my-2 mt-8">
        <Link
          to="/checkout"
          className="block text-center bg-primary text-base-100 p-2 font-semibold text-sm rounded scale-[.98] hover:scale-[1] duration-300"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;

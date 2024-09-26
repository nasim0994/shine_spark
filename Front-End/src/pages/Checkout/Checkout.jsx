import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { clearCart } from "../../Redux/cart/cartSlice";
import { useAddOrderMutation } from "../../Redux/order/orderApi";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useApplyCouponMutation } from "../../Redux/coupon/couponApi";
import { useGetShippingConfigQuery } from "../../Redux/shippingConfigApi";

export default function Checkout() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const { data } = useGetShippingConfigQuery();
  const shippingConfig = data?.data[0];

  const [addOrder, { isLoading }] = useAddOrderMutation();

  const [applyCoupon, { isLoading: couponLoading }] = useApplyCouponMutation();

  const { loggedUser } = useSelector((state) => state.user);

  const [shipping, setShipping] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Subtotal - discount amount
  const subTotal = carts?.reduce(
    (price, item) =>
      price +
      item.quantity * parseInt(item.price - (item.price * item.discount) / 100),
    0,
  );

  const tax = 0;
  const discountTk = ((subTotal + tax + parseInt(shipping)) * discount) / 100;
  const grandTotal = subTotal + tax + parseInt(shipping) - discountTk;

  const handelDiscount = async () => {
    const couponInfo = {
      coupon: couponCode,
      totalShopping: subTotal,
    };
    const res = await applyCoupon(couponInfo);
    if (res?.error) {
      setCouponError(res?.error?.data?.error);
    } else {
      setCouponError("");
    }

    if (res?.data?.success) {
      setDiscount(res?.data?.data?.discount);
      toast.success("Coupon add success");
      setCouponCode("");
    }
  };

  const handelPlaceOrder = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;

    const city = form.city.value;
    const area = form.area.value;
    const street = form.street.value;

    if (shipping === 0) {
      return Swal.fire("", "Please select shipping area", "warning");
    }

    const products = [];
    carts.map((product) =>
      products.push({
        productId: product._id,
        quantity: product.quantity,
        size: product.size,
        color: product.color,
        variant: product?.variant,
        discount: product?.discount,
      }),
    );

    const order = {
      userId: loggedUser?.data?._id,
      shippingInfo: {
        name,
        phone: number,
        email,
        city,
        area,
        street,
      },
      shippingCharge: shipping,
      paymentMethod,
      products,
      totalPrice: grandTotal,
    };

    if (paymentMethod === "cod") {
      const res = await addOrder(order);
      if (res?.data?.success) {
        Swal.fire("", "order success", "success");
        dispatch(clearCart());
        form.reset();
        navigate(
          `/order/success?orderId=${res?.data?.data?._id}&user=${number}`,
        );
      } else {
        toast.error("Something Wrong");
        console.log(res);
      }
    }
  };

  return (
    <div className="py-8">
      <div className="container">
        <form
          onSubmit={handelPlaceOrder}
          className="mt-6 grid gap-10 lg:grid-cols-3"
        >
          {/* Shipping Details */}
          <div className="lg:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase">
                Shipping Details
              </h3>

              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <h3>Full Name *</h3>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={loggedUser?.data?.name}
                  />
                </div>
                <div>
                  <h3>Phone *</h3>
                  <input
                    type="number"
                    name="number"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={loggedUser?.data?.phone}
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div>
                  <h3>Email Address</h3>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    defaultValue={loggedUser?.data?.email}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="city relative">
                  <div className="mt-2 text-sm">
                    <h3>City *</h3>

                    <input
                      type="text"
                      className="mt-2 w-full rounded border-2 p-2 outline-none"
                      name="city"
                      required
                    />
                  </div>
                </div>

                <div className="area relative">
                  <div className="mt-2 text-sm">
                    <h3>Area</h3>
                    <input
                      type="text"
                      className="mt-2 w-full rounded border-2 p-2 outline-none"
                      name="area"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 text-sm">
                <h3>Street address *</h3>
                <textarea
                  name="street"
                  rows="3"
                  placeholder="House number and street name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                  required
                ></textarea>
              </div>

              <div className="mt-2 text-sm">
                <h3>Order Note</h3>
                <textarea
                  name="note"
                  rows="4"
                  placeholder="House number and street name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div>
            <div className="checkout-output relative bg-gray-50 p-6">
              <div className="mb-4 border-b pb-4">
                <h3 className="text-[17px] font-medium text-neutral">
                  Discounts
                </h3>
                <div>
                  <small className="text-neutral-content text-xs">
                    REFERRAL OR PROMO CODE
                  </small>
                  <div className="flex items-center gap-px">
                    <input
                      onChange={(e) => setCouponCode(e.target.value)}
                      type="text"
                      className="w-full rounded border px-3 py-[7px] text-sm outline-none"
                      placeholder="Enter Code"
                      value={couponCode}
                    />
                    <div
                      onClick={handelDiscount}
                      className="primary_btn cursor-pointer"
                      style={{ fontSize: "13px" }}
                      disabled={couponLoading && "disabled"}
                    >
                      {couponLoading ? "Loading..." : "Apply"}
                    </div>
                  </div>
                  <p className="text-xs text-red-500">{couponError}</p>
                </div>
              </div>

              <div className="mb-4 border-b pb-4">
                <h3 className="font-medium text-neutral">Payment Method</h3>

                <ul className="text-neutral-content mt-2 flex flex-col gap-1 pl-2 text-sm">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="cod"
                        type="radio"
                        name="payment_method"
                        className="h-3 w-3 cursor-pointer"
                        checked={paymentMethod === "cod" && true}
                        onClick={() => setPaymentMethod("cod")}
                      />
                      <label htmlFor="cod" className="ms-2 cursor-pointer">
                        Cash On Delivery
                      </label>
                    </div>

                    <div>
                      <img src="" alt="" className="h-4 w-4" />
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="tetx-xl font-medium text-neutral">
                  Order Summary
                </h3>

                <div className="flex justify-between border-b py-1.5 text-sm">
                  <h3>Subtotal</h3>
                  <p>
                    ৳<span>{subTotal}.00</span>
                  </p>
                </div>

                <div className="flex items-center justify-between border-b py-1.5 text-sm">
                  <h3>Shipping Area</h3>
                  <div className="text-end">
                    <select
                      className="rounded border p-1 outline-none"
                      required
                      onChange={(e) => setShipping(parseInt(e.target.value))}
                    >
                      <option value="0">Select Shipping Area</option>
                      <option value={shippingConfig?.dhakaCity?.charge}>
                        Inside Dhaka - {shippingConfig?.dhakaCity?.charge}tk
                      </option>
                      <option value={shippingConfig?.dhakaOutCity?.charge}>
                        Outside Dhaka City -{" "}
                        {shippingConfig?.dhakaOutCity?.charge}tk
                      </option>
                      <option value={shippingConfig?.outsideDhaka?.charge}>
                        Outside Dhaka - {shippingConfig?.outsideDhaka?.charge}tk
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b py-1.5 text-sm">
                  <h3>Shipping Charge</h3>
                  <div className="text-end">
                    ৳<span>{shipping}.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b py-1.5 text-sm">
                  <h3>Tax</h3>
                  <div className="text-end">
                    ৳<span>{tax}.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b py-1.5 text-sm text-red-500">
                  <h3>Discount</h3>
                  <div className="text-end">
                    - ৳<span>{discountTk}.00</span>
                  </div>
                </div>

                {/* <!-- Total --> */}
                <div className="flex justify-between border-b py-2 text-lg font-medium">
                  <h3 className="text-title">Total</h3>
                  <p className="text-primary">
                    ৳ <span>{grandTotal}.00 </span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary py-2 text-base-100 shadow"
              >
                {isLoading ? (
                  <ButtonSpinner />
                ) : paymentMethod === "cod" ? (
                  "PLACE ORDER"
                ) : (
                  "Payment"
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}

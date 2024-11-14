import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { clearCart } from "../../Redux/cart/cartSlice";
import { useAddOrderMutation } from "../../Redux/order/orderApi";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useApplyCouponMutation } from "../../Redux/coupon/couponApi";
import { useGetShippingConfigQuery } from "../../Redux/shippingConfigApi";
import usePageView from "../../hooks/usePageView";

export default function Checkout() {
  usePageView("Checkout");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.carts);

  useEffect(() => {
    window.scroll(0, 0);

    if (carts?.length === 0) {
      navigate("/shops");
    }

    // Push addToCart event to the Data Layer
    if (carts?.length > 0) {
      const totalPrice = carts?.reduce(
        (price, item) => price + item.quantity * item.price,
        0,
      );

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "begin_checkout",
        customer: {},
        ecommerce: {
          currency: "BDT",
          value: totalPrice,
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
  }, [carts, navigate]);

  const [addOrder, { isLoading }] = useAddOrderMutation();

  const [applyCoupon, { isLoading: couponLoading }] = useApplyCouponMutation();

  const { loggedUser } = useSelector((state) => state.user);

  const { data } = useGetShippingConfigQuery();
  const shippingConfig = data?.data?.shipping;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
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

  const handelPlaceOrder = async (e) => {
    e.preventDefault();

    if (shipping == 0) {
      return toast.error("Please select shipping area");
    }

    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const address = form.fullAdress.value;
    const note = form.note.value;

    const products = [];
    carts.map((product) =>
      products.push({
        productId: product._id,
        discount: product?.discount,
        quantity: product.quantity,
        sku: product.sku,
        price: product.price,
      }),
    );

    const order = {
      user: {
        id: loggedUser?.data?._id,
        name,
        email,
        phone: number,
      },
      shippingInfo: {
        address,
        note,
      },
      paymentMethod,
      products,
      totalPrice: grandTotal,
      shippingCharge: shipping,
    };

    if (paymentMethod === "cod") {
      const res = await addOrder(order);

      if (res?.data?.success) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "purchase",
          customer: {
            name: name,
            phone_number: number,
            email: email,
            address: address,
            country: "Bangladesh",
          },
          ecommerce: {
            currency: "BDT",
            value: grandTotal,
            shipping: shipping,
            transaction_id: res?.data?.data?._id,

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

        Swal.fire({
          title: '<h2 className="text-3xl">Order Success</h2>',
          html: `
            <div>
              <img src="/images/success.png" alt="success" className="mx-auto w-40" />
              <p className="mt-4 text-center">Your order has been placed successfully</p>
              <p className="text-center text-sm text-neutral-content/90">Your order id: #${res?.data?.data?._id}</p>

              <div className="mt-4 flex justify-center gap-3">
                <a href="/shops" className="primary_btn flex items-center gap-2 text-sm">
                  Continue Shopping
                </a>
              </div>
            </div>
          `,
          showConfirmButton: false,
          customClass: {
            popup: "sweetalert-custom-popup",
          },
          willClose: () => {
            navigate("/shops");
          },
        });
        dispatch(clearCart());
        form.reset();
      } else {
        toast.error("Something Wrong");
        console.log(res);
      }
    }
  };

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

  return (
    <div className="pt-5">
      <div className="container">
        <form onSubmit={handelPlaceOrder} className="grid gap-4 lg:grid-cols-3">
          {/* Shipping Details */}
          <div className="rounded bg-base-100 p-6 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase">
                Shipping Details
              </h3>

              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <h3>Full name</h3>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={loggedUser?.data?.name}
                  />
                </div>
                <div>
                  <h3>Phone</h3>
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
                  <h3>Email address</h3>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    defaultValue={loggedUser?.data?.email}
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <h3>Full Adress</h3>
                <textarea
                  name="fullAdress"
                  rows="3"
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                  required
                ></textarea>
              </div>

              <div className="mt-2 text-sm">
                <h3>Order Note</h3>
                <textarea
                  name="note"
                  rows="4"
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div className="checkout-output relative rounded bg-base-100 p-6">
            <div className="mb-4 border-b pb-4">
              <h3 className="text-[17px] font-medium text-neutral">
                Discounts
              </h3>
              <div>
                <small className="text-xs text-neutral-content">
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

              <ul className="mt-2 flex flex-col gap-1 pl-2 text-sm text-neutral-content">
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
                    <img src="/images/cod.png" alt="" className="h-6" />
                  </div>
                </li>

                {/* <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="ssl"
                        type="radio"
                        name="payment_method"
                        className="w-3 h-3 cursor-pointer"
                        checked={paymentMethod === "ssl" && true}
                        onClick={() => setPaymentMethod("ssl")}
                      />
                      <label htmlFor="ssl" className="ms-2 cursor-pointer">
                        SSL
                      </label>
                    </div>

                    <div>
                      <img src="/images/ssl.png" alt="" className="h-4" />
                    </div>
                  </li> */}
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
                    {shippingConfig?.map((shipping) => (
                      <option key={shipping?._id} value={shipping?.charge}>
                        {shipping?.area} - {shipping?.charge}
                        tk
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Charge</h3>
                <div className="text-end">
                  ৳<span>{shipping}.00</span>
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
              {isLoading ? <ButtonSpinner /> : "PLACE ORDER"}
            </button>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}

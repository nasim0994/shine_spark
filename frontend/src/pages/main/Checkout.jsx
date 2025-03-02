import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import usePageView from "@/hooks/usePageView";
import { useAddOrderMutation } from "@/Redux/order/orderApi";
import { useApplyCouponMutation } from "@/Redux/coupon/couponApi";
import { useGetShippingConfigQuery } from "@/Redux/shippingConfigApi";
import Swal from "sweetalert2";
import { clearCart, subTotalSelector } from "@/Redux/cart/cartSlice";
import ButtonSpinner from "@/components/shared/ButtonSpinner";
import { currencyFormatter } from "@/lib/currencyFormatter";

export default function Checkout() {
  usePageView("Checkout");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subTotal = useSelector(subTotalSelector);

  const { carts } = useSelector((state) => state.cart);

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

  const [coupon, setCoupon] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const tax = 0;
  const discountTk = ((subTotal + tax + parseInt(shipping)) * discount) / 100;
  const grandTotal = subTotal + tax + parseInt(shipping) - discountTk;

  const handelDiscount = async () => {
    const couponInfo = {
      coupon: couponCode,
      totalShopping: subTotal,
    };
    const res = await applyCoupon(couponInfo);

    if (res?.data?.success) {
      const discountOnCoupon = res?.data?.data?.discount;
      setDiscount(discountOnCoupon);
      setCoupon(res?.data?.data?.code);
      toast.success("Coupon add success");
      setCouponCode("");
      setCouponError("");
    } else {
      setCouponError(res?.data?.message);
      console.log(res);
    }
  };

  const handelPlaceOrder = async (e) => {
    e.preventDefault();

    if (shipping == 0) {
      return toast.error("Please select shipping area");
    }

    const form = e.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const address = form.fullAddress.value;
    const note = form.note.value;

    const products = [];
    carts.map((product) =>
      products.push({
        productId: product._id,
        discount: product?.discount,
        quantity: product.quantity,
        price: product.price,
        sku: product.sku,
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
      couponDiscountTK: discountTk,
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
          title: '<h2 class="text-3xl">Order Success</h2>',
          html: `
            <div>
              <img src="/images/success.png" alt="success" class="mx-auto w-40" />
              <p class="mt-4 text-center">Your order has been placed successfully</p>
              <p class="text-center text-sm text-neutral-content/90">Your order id: #${res?.data?.data?._id}</p>
              <div class="mt-4 flex justify-center gap-3">
                <a href="/shops" class="primary_btn flex items-center gap-2 text-sm">
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
                <h3>Full Address</h3>
                <textarea
                  name="fullAddress"
                  rows="3"
                  placeholder="House number and fullAddress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                  required
                ></textarea>
              </div>

              <div className="mt-2 text-sm">
                <h3>Order Note</h3>
                <textarea
                  name="note"
                  rows="4"
                  placeholder="House number and fullAddress name"
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
                {coupon ? (
                  <div className="flex items-center justify-between">
                    <p className="rounded bg-primary/10 px-4 py-1 text-sm text-primary">
                      {coupon}-{currencyFormatter(discountTk)}
                    </p>
                    <div
                      onClick={() => {
                        setCoupon("");
                        setDiscount(0);
                      }}
                      className="cursor-pointer text-sm text-red-500"
                    >
                      Remove
                    </div>
                  </div>
                ) : (
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
                      disabled={couponLoading}
                    >
                      {couponLoading ? "Loading..." : "Apply"}
                    </div>
                  </div>
                )}

                <p className="text-xs text-red-500">{couponError}</p>
              </div>
            </div>

            <div className="mb-2 border-b pb-4">
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
              <h3 className="text-lg font-medium text-neutral">
                Order Summary
              </h3>

              <div className="flex justify-between border-b py-1.5 text-sm">
                <h3>Subtotal</h3>
                <p>{currencyFormatter(subTotal)}</p>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Area</h3>
                <div className="text-end">
                  <select
                    className="rounded border p-1 text-end outline-none"
                    required
                    onChange={(e) => setShipping(parseInt(e.target.value))}
                  >
                    <option value="0">Select Shipping Area</option>
                    {shippingConfig?.map((shipping) => (
                      <option key={shipping?._id} value={shipping?.charge}>
                        {shipping?.area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Charge</h3>
                <p className="text-end">{currencyFormatter(shipping)}</p>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm text-red-500">
                <h3>Discount</h3>
                <div className="text-end">-{currencyFormatter(discountTk)}</div>
              </div>

              {/* <!-- Total --> */}
              <div className="flex justify-between border-b py-2 text-lg font-medium">
                <h3 className="text-title">Total</h3>
                <p className="text-primary">{currencyFormatter(grandTotal)}</p>
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

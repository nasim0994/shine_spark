import { currencyFormatter } from "@/lib/currencyFormatter";
import { useGetOrderByTransactionIdQuery } from "@/Redux/order/orderApi";
import moment from "moment";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const { t_id } = useParams();
  const { data } = useGetOrderByTransactionIdQuery(t_id);
  const order = data?.data;
  const products = order?.products;

  return (
    <section className="flex min-h-[80vh] items-center justify-center py-5">
      <div className="flex w-[95%] flex-col items-center justify-center gap-2 sm:w-[600px]">
        <div className="text-center">
          <p className="mb-2 flex items-center justify-center">
            <AiFillCheckCircle className="text-6xl text-primary" />
          </p>
          <h2 className="text-2xl font-semibold text-primary">
            Thank you. Your order has been received.
          </h2>
        </div>

        <div className="mt-4 grid w-full grid-cols-3 bg-gray-100 text-sm text-neutral">
          <div className="border-r p-3">
            <h3 className="mb-1 font-medium">Order Number</h3>
            <p>INV-{order?.invoiceNumber}</p>
          </div>
          <div className="border-r p-3">
            <h3 className="mb-1 font-medium">Date</h3>
            <p>{moment(order?.createdAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="p-3">
            <h3 className="mb-1 font-medium">Payment</h3>
            <p>
              {order?.paymentMethod}-{currencyFormatter(order?.totalPrice)}
            </p>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 p-3 text-sm text-neutral">
          <h3 className="text-base font-medium">Order Details</h3>

          <div className="relative mt-2 overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, i) => (
                  <tr key={product?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/product/${
                            product?.product?.img
                          }`}
                          alt={product?.product?.title}
                          className="h-9 w-9 rounded-full"
                          loading="lazy"
                        />

                        <p>{product?.productId?.title}</p>
                      </div>
                    </td>
                    <td>{product?.quantity}</td>
                    <td>
                      <del className="text-red-500">
                        {currencyFormatter(product.price)}
                      </del>
                    </td>
                    <td>{product?.discount}%</td>
                    <td>
                      {currencyFormatter(
                        product?.price * product?.quantity -
                          (product?.price *
                            product?.quantity *
                            product?.discount) /
                            100,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5} className="text-end">
                    SubTotal
                  </th>
                  <th>
                    {currencyFormatter(
                      order?.totalPrice - order?.shippingCharge,
                    )}
                  </th>
                </tr>

                <tr>
                  <td colSpan={5} className="text-end">
                    Shipping Charge
                  </td>
                  <td>{currencyFormatter(order?.shippingCharge)}</td>
                </tr>

                <tr>
                  <td colSpan={5} className="text-end text-red-500">
                    Discount
                  </td>
                  <td className="text-red-500">
                    {currencyFormatter(order?.couponDiscountTK)}
                  </td>
                </tr>

                <tr>
                  <th colSpan={5} className="text-end">
                    Total
                  </th>
                  <th>{currencyFormatter(order?.totalPrice)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 p-3 text-sm text-neutral">
          <h3 className="text-base font-medium">Billing Address</h3>

          <div className="mt-3">
            <p>Name: {order?.user?.name}</p>
            <p>Phone: {order?.user?.phone}</p>
            <p>Address: {order?.shippingInfo?.address}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-[13px]">
          <Link to="/" className="primary_btn">
            Go To Home
          </Link>
        </div>
      </div>
    </section>
  );
}

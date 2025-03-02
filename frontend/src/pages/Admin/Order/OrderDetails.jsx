import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { FaPrint } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import {
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useStatusUpdateMutation,
} from "@/Redux/order/orderApi";
import Spinner from "@/components/shared/Spinner/Spinner";
import { currencyFormatter } from "@/lib/currencyFormatter";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const { data, isLoading } = useGetOrderByIdQuery(id);
  const order = data?.data;
  const products = data?.data?.products;

  const subTotal = products?.reduce((acc, item) => {
    const price = item?.price;
    const discount = item?.discount;
    const discountPrice = price - (price * discount) / 100;
    const totalPrice = item?.quantity * discountPrice;
    return acc + totalPrice;
  }, 0);

  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (id) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    try {
      if (isConfirm) {
        const result = await deleteOrder(id);
        if (result?.data?.success) {
          toast.success(result?.data?.message);
          navigate("/admin/order/all-orders");
        } else {
          toast.error(result?.data?.message || "Something went wrong");
          console.log(result);
        }
      }
    } catch (error) {
      toast.error(error?.data?.error);
      console.log(error);
    }
  };

  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/admin/order/all-orders"
            className="primary_btn flex w-max items-center gap-2 text-xs"
          >
            <IoMdArrowBack /> Go Back
          </Link>

          <div>
            <h1 className="text-xs text-primary">order/order-details</h1>
            <p>Order: #{order?._id}</p>
          </div>
        </div>

        <button
          onClick={() => deleteOrderHandler(order?._id)}
          className="whitespace-nowrap rounded bg-red-500 px-4 py-2 text-sm text-base-100"
        >
          Delete order
        </button>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div>
            <h2 className="text-xl">Invoice INV-{order?.invoiceNumber}</h2>
            <p className="mt-1 w-max rounded bg-green-100 px-2 py-1 text-[11px] text-primary">
              {order?.status}
            </p>
            <div className="gap-2 sm:flex">
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Placed On:{" "}
                {moment(order?.createdAt).format("Do MMMM YYYY hh:mm a")}
              </p>
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Updated:{" "}
                {moment(order?.updatedAt).format("Do MMMM YYYY hh:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/admin/order/print/${order?._id}`}
              target="_blank"
              className="flex items-center gap-2 rounded border border-gray-400 px-2 py-1 text-sm text-neutral-content duration-200 hover:text-neutral"
            >
              <FaPrint className="text-neutral" /> Print
            </Link>

            {statusLoading ? (
              "Loading..."
            ) : (
              <select
                value={order?.status}
                onChange={async (e) => {
                  const res = await statusUpdate({
                    id: order?._id,
                    status: e.target.value,
                  });
                  if (res?.data?.success) {
                    toast.success("Status updated");
                  } else {
                    toast.error("Something went wrong");
                  }
                }}
                className={`cursor-pointer rounded border bg-transparent p-1 text-xs ${
                  order?.status == "pending" &&
                  "border-yellow-500 text-yellow-500"
                } ${
                  order?.status == "shipped" && "border-blue-400 text-blue-400"
                } ${
                  order?.status == "delivered" &&
                  "border-green-400 text-green-400"
                } ${
                  order?.status == "cancelled" && "border-red-400 text-red-400"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Customer Info</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>Name: {order?.user?.name}</p>
            <p>Email: {order?.user?.email}</p>
            <p>Phone: {order?.user?.phone}</p>
            <p>Payment: {order?.paymentMethod}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Address</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.shippingInfo?.address}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Note</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.shippingInfo?.note}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <h2 className="text-lg">Ordered Items</h2>

        <div className="relative mt-2 overflow-x-auto rounded-md border">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>SKU</th>
                <th>Discount</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => {
                const price = product?.price;
                const discount = product?.discount;
                const discountPrice = price - (price * discount) / 100;
                const totalPrice = product?.quantity * discountPrice;

                // const variants = product?.productId?.variants;
                // const variant = variants?.find((v) => v.sku == sku);
                // const price = product?.productId?.isVariant
                //   ? variant?.sellingPrice
                //   : product?.productId?.sellingPrice;
                // const discountPrice = price - (price * product?.discount) / 100;
                // const totalPrice = product?.quantity * discountPrice;

                return (
                  <tr key={order?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                            product?.productId?.thumbnail
                          }`}
                          alt={product?.productId?.title}
                          className="h-9 w-9 rounded-full"
                          loading="lazy"
                        />

                        <p>{product?.productId?.title}</p>
                      </div>
                    </td>
                    <td>{product?.quantity}</td>
                    <td>{product?.sku}</td>
                    <td>{product?.discount}%</td>
                    <td>
                      <p>
                        {currencyFormatter(discountPrice)}
                        <del className="text-sm text-red-500">
                          {currencyFormatter(price)}
                        </del>
                      </p>
                    </td>
                    <td>{currencyFormatter(totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="text-end">
                  Subtotal
                </td>
                <td>{currencyFormatter(subTotal)}</td>
              </tr>

              <tr>
                <td colSpan={6} className="text-end text-red-500">
                  Discount
                </td>
                <td className="text-red-500">
                  {currencyFormatter(order?.couponDiscountTK)}
                </td>
              </tr>

              <tr>
                <td colSpan={6} className="text-end">
                  Shipping Charge
                </td>
                <td>{currencyFormatter(order?.shippingCharge)}</td>
              </tr>

              <tr>
                <th colSpan={6} className="text-end">
                  Total
                </th>
                <th>{currencyFormatter(order?.totalPrice)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

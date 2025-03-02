import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  useDeleteOrderMutation,
  useStatusUpdateMutation,
} from "@/Redux/order/orderApi";
import moment from "moment";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function OrderTable({ orders }) {
  const [deleteOrder] = useDeleteOrderMutation();
  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  const deleteOrderHandler = async (id) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    try {
      if (isConfirm) {
        const result = await deleteOrder(id);
        if (result?.data?.success) {
          toast.success(result?.data?.message);
        } else {
          toast.error(result?.data?.message || "Something went wrong");
          console.log(result);
        }
      }
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>SL</th>
          <th>Order</th>
          <th>Customer</th>
          <th>Products</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, i) => (
          <tr key={order?._id}>
            <td>{i + 1}</td>
            <td>
              <p>INV-{order?.invoiceNumber}</p>
              <p>#{order?._id}</p>
              <p className="text-neutral">
                {moment(order?.createdAt).format("DD MMM YYYY")}
              </p>
            </td>
            <td>
              <p>Name: {order?.user?.name}</p>
              <div className="text-sm text-neutral-content">
                <p>Phone: {order?.user?.phone}</p>
                <p>Address: {order?.shippingInfo?.address}</p>
              </div>
            </td>
            <td>
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {order?.products?.map((product) => (
                  <img
                    key={product?._id}
                    className="h-8 w-8 rounded-full border-2 border-white"
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.productId?.thumbnail
                    }`}
                    alt={product?.productId?.title}
                  />
                ))}
              </div>
            </td>
            <td>{currencyFormatter(order?.totalPrice)}</td>
            <td>
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
                    order?.status == "shipped" &&
                    "border-blue-400 text-blue-400"
                  } ${
                    order?.status == "delivered" &&
                    "border-green-400 text-green-400"
                  } ${
                    order?.status == "cancelled" &&
                    "border-red-400 text-red-400"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              )}
            </td>
            <td>
              <div className="flex gap-3">
                <Link
                  to={`/admin/order/${order?._id}`}
                  className="hover:text-blue-700"
                >
                  <GrView />
                </Link>
                <button
                  onClick={() => deleteOrderHandler(order?._id)}
                  className="hover:text-red-700"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

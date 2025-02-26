import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetMyOrdersQuery } from "@/Redux/order/orderApi";

export default function Orders() {
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?._id;

  const { data, isLoading, isError } = useGetMyOrdersQuery(userId);
  const orders = data?.data;

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (!isLoading && isError) {
    content = <p className="mt-5 text-red-500">Order get failed</p>;
  }
  if (!isLoading && !isError) {
    content = orders?.map((order) => (
      <tr key={order?._id}>
        <td>
          <div className="w-max">
            <Link to={`/account/orders/${order?._id}`}>
              <span className="text-primary">#{order?._id}</span>
            </Link>
            <p className="text-xs text-neutral/70">
              Placed on: {moment(order?.createdAt).format("Do MMMM YYYY")}
            </p>
          </div>
        </td>

        <td>{order?.products?.length}</td>

        <td>{order?.totalPrice}TK</td>

        <td
          className={`text-sm ${order?.status == "pending" ? "text-yellow-500" : order?.status == "shipped" ? "text-blue-500" : order?.status == "delivered" ? "text-primary" : "text-red-500"}`}
        >
          {order?.status}
        </td>
        <td>
          <Link to={`/account/orders/${order?._id}`}>
            <FaEye />
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="mb-3 border-b pb-1">
        <h3>All Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4">Order Id</th>
              <th className="px-4">Total Items</th>
              <th className="px-4">Total Price</th>
              <th className="px-4"> Status</th>
              <th className="px-4"> Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}

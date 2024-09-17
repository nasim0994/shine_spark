import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../../Redux/order/orderApi";

export default function Orders() {
  const { loggedUser } = useSelector((state) => state.user);
  const userId = loggedUser?.data?._id;

  const { data, isLoading, isError } = useGetMyOrdersQuery(userId);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p className="text-red-500 mt-5">Order get failed</p>;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((order) => (
      <tr key={order?._id}>
        <td className="py-2 px-4">
          <div className="w-max">
            <Link to={`/account/orders/${order?._id}`}>
              <span className="text-primary">#{order?._id}</span>
            </Link>
            <p className="text-xs text-neutral/70">
              Placed on {order?.createdAt}
            </p>
          </div>
        </td>

        <td className="py-2 px-4">
          <div className="flex flex-col gap-1">{order?.products?.length}</div>
        </td>

        <td className="py-2 px-4 text-sm">{order?.status}</td>
        <td className="">
          <Link to={`/account/orders/${order?._id}`}>
            <FaEye />
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="border-b pb-1 mb-3">
        <h3>All Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4">Order Id</th>
              <th className="px-4">Total items</th>
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

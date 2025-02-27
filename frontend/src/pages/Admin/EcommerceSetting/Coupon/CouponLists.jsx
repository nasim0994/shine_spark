import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useUpdateStatusMutation,
} from "@/Redux/coupon/couponApi";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";

export default function CouponLists() {
  const { data, isLoading } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const handleDeleteCoupon = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this coupon?");
    if (isConfirm) {
      const res = await deleteCoupon(id);
      if (res?.data?.success) {
        toast.success("Coupon deleted successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  const handleUpdateStatus = async (coupon) => {
    const id = coupon?._id;
    const status = {
      status: !coupon?.status,
    };

    const isConfirm = window.confirm("Are you sure update this coupon status?");
    if (isConfirm) {
      const res = await updateStatus({ id, status });

      if (res?.data?.success) {
        toast.success("Coupon status updated successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Coupon Lists</h3>
        <Link to="/admin/promo/coupon/add" className="primary_btn">
          Add New Coupon
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-lg">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Minimum Amount</th>
                <th>Start Date-Time</th>
                <th>End Date-Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 &&
                data?.data?.map((coupon, i) => (
                  <tr key={coupon?._id}>
                    <td>{i + 1}</td>
                    <td>{coupon?.code}</td>
                    <td>{coupon?.discount}%</td>
                    <td>{coupon?.minimumShopping}tk</td>
                    <td>
                      {coupon?.startDate}-{coupon?.startTime}
                    </td>
                    <td>
                      {coupon?.endDate}-{coupon?.endTime}
                    </td>
                    <td>
                      <button onClick={() => handleUpdateStatus(coupon)}>
                        <input
                          type="checkbox"
                          name=""
                          checked={coupon?.status}
                        />
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link
                          to={`/admin/promo/coupon/edit/${coupon?._id}`}
                          className="duration-200 hover:text-red-500"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteCoupon(coupon?._id)}
                          className="duration-200 hover:text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

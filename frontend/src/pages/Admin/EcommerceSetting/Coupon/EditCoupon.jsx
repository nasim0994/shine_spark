import {
  useEditCouponMutation,
  useGetCouponByIdQuery,
} from "@/Redux/coupon/couponApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCoupon() {
  const { id } = useParams();
  const { data } = useGetCouponByIdQuery(id);
  const [editCoupon, { isLoading }] = useEditCouponMutation();
  const navigate = useNavigate();

  const handleEditCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const minimumShopping = form.minimumShopping.value;
    const discount = form.discount.value;
    const startDate = form.startDate.value;
    const startTime = form.startTime.value;
    const endDate = form.endDate.value;
    const endTime = form.endTime.value;

    const coupon = {
      code,
      minimumShopping,
      discount,
      startDate,
      startTime,
      endDate,
      endTime,
      status: data?.data?.status,
    };

    const res = await editCoupon({ id, coupon });

    if (res?.data?.success) {
      toast.success("Coupon Updated Successfully");
      navigate("/admin/promo/coupon/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow md:w-[600px]">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Add New Coupon</h3>
      </div>
      <form onSubmit={handleEditCoupon} className="p-4">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Coupon code</p>
          <input
            type="text"
            name="code"
            placeholder="Enter Code"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
            defaultValue={data?.data?.code}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <p className="text-neutral-content">Minimum Shopping</p>
          <input
            type="number"
            name="minimumShopping"
            placeholder="Enter Minimum Shopping Amount"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
            defaultValue={data?.data?.minimumShopping}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <p className="text-neutral-content">Discount (%)</p>
          <input
            type="number"
            name="discount"
            placeholder="Enter Discount %"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
            defaultValue={data?.data?.discount}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">Start Date</p>
            <input
              type="date"
              name="startDate"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={data?.data?.startDate}
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">Start Time</p>
            <input
              type="time"
              name="startTime"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={data?.data?.startTime}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">End Date</p>
            <input
              type="date"
              name="endDate"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={data?.data?.endDate}
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">End Time</p>
            <input
              type="time"
              name="endTime"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={data?.data?.endTime}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t p-4">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Coupon"}
          </button>
        </div>
      </form>
    </section>
  );
}

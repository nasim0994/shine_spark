import { useAddCouponMutation } from "@/Redux/coupon/couponApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddCoupon() {
  const navigate = useNavigate();
  const [addCoupon, { isLoading }] = useAddCouponMutation();

  const handleAddCoupon = async (e) => {
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
      status: true,
    };

    const res = await addCoupon(coupon);

    if (res?.data?.success) {
      toast.success("Coupon Added Successfully");
      form.reset();
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
      <form onSubmit={handleAddCoupon} className="p-4">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Coupon code</p>
          <input
            type="text"
            name="code"
            placeholder="Enter Code"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
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
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">Start Time</p>
            <input
              type="time"
              name="startTime"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
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
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-neutral-content">End Time</p>
            <input
              type="time"
              name="endTime"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t p-4">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Add Coupon"}
          </button>
        </div>
      </form>
    </section>
  );
}

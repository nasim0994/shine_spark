import { BiSolidPencil } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteFlashDealMutation,
  useToggleFlashDealStatusMutation,
} from "@/Redux/flashDeal/flashDeal";
import toast from "react-hot-toast";

export default function FlashDealTable({ flashDeal, i }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(flashDeal?.status);
  }, [flashDeal]);

  const [deleteFlashDeal] = useDeleteFlashDealMutation();
  const [toggleFlashDealStatus] = useToggleFlashDealStatusMutation();

  const handleUpdateStatus = async (id) => {
    const isConfirm = window.confirm("Are you sure update status?");
    if (isConfirm) {
      const res = await toggleFlashDealStatus(id);
      if (res?.data?.success) {
        toast.success("Status Updated Successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  // Delete FlashDeal
  const handleDeleteFlashDeal = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this FlashDeal");
    if (isConfirm) {
      const result = await deleteFlashDeal(id);
      if (result?.data?.success) {
        toast.success("FlashDeal Deleted Successfully");
      } else {
        toast.error(result?.data?.message || "Something went wrong");
        console.log(result);
      }
    }
  };

  return (
    <tr>
      <td>{i + 1}</td>
      <td>{flashDeal?.title}</td>
      <td>{flashDeal?.flashProducts?.length}</td>
      <td>{flashDeal?.startDate}</td>
      <td>{flashDeal?.endDate}</td>
      <td>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            defaultChecked={status}
            type="checkbox"
            value={status}
            className="peer sr-only"
            onClick={() => handleUpdateStatus(flashDeal?._id)}
          />
          <div className="peer h-[23px] w-11 rounded-full bg-gray-200 after:absolute after:start-[1px] after:top-[1.5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
        </label>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/promo/flash-sale/edit/${flashDeal?._id}`}
            className="duration-200 hover:text-green-700"
          >
            <BiSolidPencil />
          </Link>
          <button
            onClick={() => handleDeleteFlashDeal(flashDeal?._id)}
            className="text-lg duration-200 hover:text-red-600"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </td>
    </tr>
  );
}

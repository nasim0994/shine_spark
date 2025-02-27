import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "@/Redux/banner/bannerApi";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";

export default function Banner() {
  const { data, isLoading, isError } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();

  const handleDeleteBanner = async (id) => {
    const isConfirm = window.confirm("are you sure delete this banner?");
    if (isConfirm) {
      const res = await deleteBanner(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Banner deleted successfully");
      } else {
        toast.error(
          res?.data?.message || "Something went wrong, please try again",
        );
      }
    }
  };

  if (isLoading) return <TableSkeleton />;
  if (isError) return <p>Fail fetch </p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Banner Lists</h3>
        <Link to="/admin/business/section/banner/add" className="primary_btn">
          Add Banner
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-lg">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Banner Image</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((banner) => (
                <tr key={banner?._id}>
                  <td>{banner?.order}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                          banner?.image
                        }`}
                        alt=""
                        className="h-10 w-16"
                      />
                    </div>
                  </td>
                  <td>{banner?.link}</td>
                  <td>
                    <div className="flex items-center gap-2 text-lg">
                      <Link
                        to={`/admin/business/section/banner/edit/${banner?._id}`}
                        className="duration-200 hover:text-red-500"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteBanner(banner?._id)}
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

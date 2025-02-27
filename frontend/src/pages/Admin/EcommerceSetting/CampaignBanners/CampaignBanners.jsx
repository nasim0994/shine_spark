import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  useDeleteCampaignBannerMutation,
  useGetCampaignBannersQuery,
} from "@/Redux/campaignBanner/campaignBannerApi";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";

export default function CampaignBanners() {
  const { data, isLoading } = useGetCampaignBannersQuery();
  const [deleteCampaignBanner] = useDeleteCampaignBannerMutation();

  const handleDeleteBanner = async (id) => {
    const isConfirm = window.confirm("are you sure delete this banner?");
    if (isConfirm) {
      await deleteCampaignBanner(id);
      toast.success("Banner Deleted Successfully");
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Campaign Banner Lists</h3>
        <Link
          to="/admin/business/section/campaign-banner/add"
          className="primary_btn"
        >
          Add Campaign Banner
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto">
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
              {data?.data?.length > 0 ? (
                data?.data?.map((banner) => (
                  <tr key={banner?._id}>
                    <td>{banner?.order}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/campaignBanner/${banner?.image}`}
                          alt="campaignBanner"
                          className="h-10 w-16"
                        />
                      </div>
                    </td>
                    <td>{banner?.link}</td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link
                          to={`/admin/business/section/campaign-banner/edit/${banner?._id}`}
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
                ))
              ) : (
                <p className="p-4 text-neutral-content">No Banner Available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

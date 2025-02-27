import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useAllBrandsQuery,
  useDeleteBrandMutation,
} from "@/Redux/brand/brandApi";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AllBrands() {
  const { data, isLoading, isError, error } = useAllBrandsQuery();
  const [deleteBrand] = useDeleteBrandMutation();

  // Delete Brand
  const handleDeleteBrand = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Brand");
    if (isConfirm) {
      const result = await deleteBrand(id);
      if (result?.data?.success) {
        toast.success("Brand Deleted Successfully");
      } else {
        toast.error(result?.data?.message || "An error occurred");
        console.log(result);
      }
    }
  };

  let content = null;
  if (isLoading) content = <TableSkeleton />;

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((brand, i) => (
      <tr key={brand?._id}>
        <td>{i + 1}</td>
        <td>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${brand?.icon}`}
            alt={brand?.name}
            className="h-10 w-10 rounded-full border"
          />
        </td>
        <td>{brand?.name}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/product/brand/edit/${brand?._id}`}
              className="duration-200 hover:text-green-700"
            >
              <BiSolidPencil />
            </Link>
            <button
              onClick={() => handleDeleteBrand(brand?._id)}
              className="text-lg duration-200 hover:text-red-600"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg">All Brands</h2>
        <Link to="/admin/product/brand/add" className="primary_btn text-sm">
          Add New Brand
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Brand Icon</th>
              <th>Brand Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-sm text-red-500">
                  No brand found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/Redux/category/categoryApi";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AllCategories() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Delete Category
  const handleDeleteCategory = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Category?");
    if (isConfirm) {
      const res = await deleteCategory(id);
      if (res?.data?.success) {
        toast.success("Category deleted successfully");
      } else {
        toast.error(res?.data?.message || "Failed to delete category");
        console.log(res);
      }
    }
  };

  let content = null;
  if (isLoading) content = <TableSkeleton />;

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = (
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Category</th>
            <th>Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((category, i) => (
            <tr key={category?._id}>
              <td>{i + 1}</td>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
                    alt={category?.name}
                    className="h-10 w-10 rounded-full border"
                  />
                  {category?.name}
                </div>
              </td>
              <td>{category?.order}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/product/category/edit/${category?._id}`}
                    className="duration-200 hover:text-green-700"
                  >
                    <BiSolidPencil />
                  </Link>
                  <button
                    onClick={() => handleDeleteCategory(category?._id)}
                    className="text-lg duration-200 hover:text-red-600"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between rounded bg-base-100 p-3 shadow">
        <h2>All Categories</h2>
        <Link to="/admin/product/category/add" className="primary_btn text-sm">
          Add New Category
        </Link>
      </div>

      <div className="relative mt-1 overflow-x-auto bg-base-100 shadow-lg">
        {content}
        {data?.data?.length === 0 && !isLoading && (
          <p className="p-4 text-sm text-neutral-content">No data found</p>
        )}
      </div>
    </section>
  );
}

import Spinner from "@/components/shared/Spinner/Spinner";
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

  if (isLoading) content = <Spinner />;
  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category, i) => (
      <tr key={category?._id}>
        <td>{i + 1}</td>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${category?.icon}`}
              alt=""
              className="h-10 w-10 rounded-full border"
            />
            {category?.name}
          </div>
        </td>
        <td>{category?.order}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/category/edit/${category?._id}`}
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
    ));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-lg">All Categories</h1>
        <Link to="/admin/category/add-category" className="primary_btn text-sm">
          Add New Category
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
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
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-sm text-red-500">
                  No category found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

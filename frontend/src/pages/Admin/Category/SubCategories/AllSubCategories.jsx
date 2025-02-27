import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "@/Redux/subCategory/subCategoryApi";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AllSubCategories() {
  const { data, isLoading, isError, error } = useGetSubCategoriesQuery();
  const subCategories = data?.data;

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  // Delete Sub Category
  const handleDeleteSubCategory = async (subCategory) => {
    const id = subCategory?._id;
    const categoryId = subCategory?.category?._id;

    const isConfirm = window.confirm("Are you sure delete this Sub Category?");

    if (isConfirm) {
      const result = await deleteSubCategory({ id, categoryId });
      if (result?.data?.success) {
        toast.success("Sub Category deleted successfully");
      } else {
        toast.error(result?.data?.message || "Failed to delete sub category");
        console.log(result);
      }
    }
  };

  let content = null;
  if (isLoading) content = <TableSkeleton />;
  if (!isLoading && isError) content = <p>{error?.data?.error}</p>;

  if (!isLoading && !isError && subCategories?.length > 0) {
    content = (
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Sub Category</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories?.map((subCategory, i) => (
            <tr key={subCategory?._id}>
              <td>{i + 1}</td>
              <td>{subCategory?.name}</td>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      subCategory?.category?.icon
                    }`}
                    alt=""
                    className="h-10 w-10 rounded-full border"
                  />
                  {subCategory?.category?.name}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/product/category/sub-category/edit/${subCategory?._id}`}
                    className="flex items-center gap-1 duration-300 hover:text-green-700"
                  >
                    <BiSolidPencil />
                  </Link>
                  <button
                    onClick={() => handleDeleteSubCategory(subCategory)}
                    className="hover:text-red-500"
                  >
                    <MdOutlineDelete />
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
    <div>
      <div className="flex items-center justify-between rounded bg-base-100 p-3 shadow">
        <h2>All Sub Categories</h2>
        <Link
          to="/admin/product/category/sub-category/add"
          className="primary_btn text-sm"
        >
          Add New Sub Category
        </Link>
      </div>

      <div className="relative mt-1 overflow-x-auto rounded bg-base-100 shadow-lg">
        {content}
        {subCategories?.length === 0 && !isLoading && (
          <p className="p-4 text-sm text-neutral-content">No data found</p>
        )}
      </div>
    </div>
  );
}

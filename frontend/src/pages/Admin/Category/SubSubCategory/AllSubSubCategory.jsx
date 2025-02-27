import TableSkeleton from "@/components/shared/Skeleton/TableSkeleton";
import {
  useDeleteSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
} from "@/Redux/subSubCategory/subSubCategoryApi";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AllSubSubCategory() {
  const { data, isLoading, isError, error } = useGetSubSubCategoriesQuery();
  const [deleteSubSubCategory] = useDeleteSubSubCategoryMutation();

  // Delete Sub Sub Category
  const handleDeleteSubSubCategory = async (subSubCategory) => {
    const id = subSubCategory?._id;
    const subCategoryId = subSubCategory?.subCategory?._id;

    const isConfirm = window.confirm("are you sure delete this category");

    if (isConfirm) {
      const result = await deleteSubSubCategory({ id, subCategoryId });
      if (result?.data?.success) {
        toast.success("Sub Sub Category deleted successfully");
      } else {
        toast.error(
          result?.data?.message || "Failed to delete sub sub category",
        );
        console.log(result);
      }
    }
  };

  let content = null;
  if (isLoading) content = <TableSkeleton />;

  if (!isLoading && isError) content = <p>{error?.data?.error}</p>;

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = (
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Sub SubCategory</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((subSubCategory, i) => (
            <tr key={subSubCategory?._id}>
              <td>{i + 1}</td>
              <td>{subSubCategory?.name}</td>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      subSubCategory?.category?.icon
                    }`}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  {subSubCategory?.category?.name}
                </div>
              </td>
              <td>{subSubCategory?.subCategory?.name}</td>
              <td>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/product/category/sub-sub-category/edit/${subSubCategory?._id}`}
                    className="flex items-center gap-1 duration-300 hover:text-green-700"
                  >
                    <BiSolidPencil />
                  </Link>
                  <button
                    onClick={() => handleDeleteSubSubCategory(subSubCategory)}
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
      <div className="flex items-center justify-between rounded bg-base-100 p-3">
        <h2>All Sub Sub Categories</h2>
        <Link
          to="/admin/product/category/sub-sub-category/add"
          className="primary_btn text-sm"
        >
          Add New Sub Category
        </Link>
      </div>

      <div className="relative mt-1 overflow-x-auto rounded bg-base-100 shadow-lg">
        {content}
        {data?.data?.length === 0 && !isLoading && (
          <p className="p-3 text-sm text-neutral-content">No data found</p>
        )}
      </div>
    </div>
  );
}

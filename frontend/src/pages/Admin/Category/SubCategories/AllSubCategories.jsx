import Spinner from "@/components/shared/Spinner/Spinner";
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
  if (isLoading) return (content = <Spinner />);

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && subCategories?.length > 0) {
    content = subCategories?.map((subCategory, i) => (
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
              to={`/admin/category/edit-sub-category/${subCategory?._id}`}
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
    ));
  }

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <Link
          to="/admin/category/add-sub-category"
          className="primary_btn text-sm"
        >
          Add New
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
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
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-sm text-red-500">
                  No subcategory found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

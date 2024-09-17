import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "../../../../Redux/subCategory/subCategoryApi";
import Swal from "sweetalert2";

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
        Swal.fire("", "Delete Success", "success");
      } else {
        Swal.fire("", "Somethin went worng", "error");
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }

  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && subCategories?.length > 0) {
    content = subCategories?.map((subCategory, i) => (
      <tr key={subCategory?._id}>
        <td>{i + 1}</td>
        <td>{subCategory?.name}</td>
        <td>
          <div className="flex items-center gap-2 ">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                subCategory?.category?.icon
              }`}
              alt=""
              className="w-10 h-10 rounded-full border"
            />
            {subCategory?.category?.name}
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/category/edit-sub-category/${subCategory?._id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
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
      <div className="flex justify-end mb-2">
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
                <td colSpan={4} className="text-center text-red-500 text-sm">
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

import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  useDeleteSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
} from "../../../../Redux/subSubCategory/subSubCategoryApi";
import Swal from "sweetalert2";

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
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((subSubCategory, i) => (
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
              className="w-10 h-10 rounded-full"
            />
            {subSubCategory?.category?.name}
          </div>
        </td>
        <td>{subSubCategory?.subCategory?.name}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/category/edit-sub-sub-category/${subSubCategory?._id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
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
    ));
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Link
          to="/admin/category/add-sub-sub-category"
          className="primary_btn text-sm"
        >
          Add New Sub Category
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg">
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
            {content ? (
              content
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-red-500 text-sm">
                  No sub subcategory found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import { useAddSubCategoryMutation } from "../../../../Redux/subCategory/subCategoryApi";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoriesQuery();
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const categoryId = e.target.category.value;

    if (!categoryId) {
      return Swal.fire("", "Category is required", "warning");
    }

    const subCategory = {
      name,
      categoryId,
    };

    const result = await addSubCategory(subCategory);
    if (result?.data?.success) {
      Swal.fire("", "add success", "success");
      navigate("/admin/category/sub-categories");
    } else {
      Swal.fire("", "Somethin went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub Category name</p>
        <input type="text" name="name" required />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category</p>
        <select name="category">
          {isSuccess &&
            data?.data?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-4">
        <button
          className="primary_btn text-sm"
          disabled={isLoading && "disabled"}
        >
          {isLoading ? "Loading.." : "Add Sub Category"}
        </button>
      </div>
    </form>
  );
}

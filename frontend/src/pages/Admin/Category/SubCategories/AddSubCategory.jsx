import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { useAddSubCategoryMutation } from "@/Redux/subCategory/subCategoryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoriesQuery();
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const categoryId = e.target.category.value;

    if (!categoryId) {
      return toast.error("Category is required");
    }

    const subCategory = {
      name,
      categoryId,
    };

    const result = await addSubCategory(subCategory);
    if (result?.data?.success) {
      toast.success("Sub Category added successfully");
      navigate("/admin/product/category/sub-category/all");
    } else {
      toast.error(result?.data?.message || "Failed to add sub category");
      console.log(result);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
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
        <button className="primary_btn text-sm" disabled={isLoading}>
          {isLoading ? "Loading.." : "Add Sub Category"}
        </button>
      </div>
    </form>
  );
}

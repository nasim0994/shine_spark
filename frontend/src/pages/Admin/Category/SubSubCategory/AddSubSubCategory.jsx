import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { useAddSubSubCategoryMutation } from "@/Redux/subSubCategory/subSubCategoryApi";
import toast from "react-hot-toast";

export default function AddSubSubCategory() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data, isSuccess } = useGetCategoriesQuery();

  const category = selectedCategory && JSON.parse(selectedCategory);
  const subCategories = category?.subCategories ? category?.subCategories : [];

  const [addSubSubCategory, { isLoading }] = useAddSubSubCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const subCategoryId = e.target.subCategory.value;

    const subSubCategory = {
      name,
      categoryId: category?._id,
      subCategoryId,
    };

    const result = await addSubSubCategory(subSubCategory);

    if (result?.data?.success) {
      toast.success("Sub SubCategory added successfully");
      navigate("/admin/product/category/sub-sub-category/all");
    } else {
      toast.error(result?.data?.message || "Failed to add sub subcategory");
      console.log(result);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub SubCategory Name</p>
        <input type="text" name="name" required />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category *</p>
        <select
          name="category"
          required
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {isSuccess &&
            data?.data?.map((category) => (
              <option key={category?._id} value={JSON.stringify(category)}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub Category *</p>
        <select name="subCategory" required>
          <option value="">Select Sub Category</option>
          {subCategories?.length > 0 &&
            subCategories?.map((subCategory) => (
              <option key={subCategory?._id} value={subCategory?._id}>
                {subCategory?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-4">
        <button className="primary_btn text-sm" disabled={isLoading}>
          {isLoading ? "Loading.." : "Add Sub SubCategory"}
        </button>
      </div>
    </form>
  );
}

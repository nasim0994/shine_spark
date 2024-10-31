import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import { useAddSubSubCategoryMutation } from "../../../../Redux/subSubCategory/subSubCategoryApi";

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
      Swal.fire("", "add success", "success");
      navigate("/admin/category/sub-sub-categories");
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
        <button
          className="primary_btn text-sm"
          disabled={isLoading && "disabled"}
        >
          {isLoading ? "Loading.." : "Add Sub SubCategory"}
        </button>
      </div>
    </form>
  );
}

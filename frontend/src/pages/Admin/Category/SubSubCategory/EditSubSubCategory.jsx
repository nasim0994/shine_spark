import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import {
  useGetSubSubCategoryQuery,
  useUpdateSubSubCategoryMutation,
} from "../../../../Redux/subSubCategory/subSubCategoryApi";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../../Redux/category/categoryApi";

export default function EditSubSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { data: category, isSuccess } = useGetCategoriesQuery();
  const categories = category?.data ? category?.data : [];

  const { data: singleCategory } = useGetCategoryQuery(selectedCategory);
  const subCategories = singleCategory?.data?.subCategories;

  const { data, isLoading } = useGetSubSubCategoryQuery(id);

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.data?.category);
      setSelectedSubCategory(data?.data?.subCategory);
    }
  }, [data]);

  const [updateSubSubCategory, { isLoading: updateLoading }] =
    useUpdateSubSubCategoryMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const categoryId = e.target.category.value;
    const subCategoryId = e.target.subCategory.value;
    const data = {
      name,
      categoryId,
      subCategoryId,
    };

    const res = await updateSubSubCategory({ id, data });
    if (res?.data?.success) {
      Swal.fire("", "Update Success", "success");
      navigate("/admin/category/sub-sub-categories");
    } else {
      Swal.fire("", "Somethin went worng", "error");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p>Sub SubCategory Name</p>
        <input
          type="text"
          name="name"
          defaultValue={data?.data?.name}
          required
        />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category *</p>
        <select
          name="category"
          required
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Select Category</option>
          {isSuccess &&
            categories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}{" "}
              </option>
            ))}
        </select>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub Category *</p>
        <select
          name="subCategory"
          required
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        >
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
          className="bg-primary text-base-100 px-6 py-1.5 rounded"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}

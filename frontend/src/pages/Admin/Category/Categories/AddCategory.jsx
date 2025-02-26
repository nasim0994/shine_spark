import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "@/Redux/category/categoryApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const { data } = useGetCategoriesQuery();

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const orderNum = data?.data?.length ? data?.data?.length + 1 : 1;

  const handleAddCategory = async (e) => {
    e.preventDefault();

    let icon = icons[0]?.file;
    const name = e.target.name.value;
    const order = e.target.order.value;

    if (!icon) {
      return toast.error("Icon is required");
    }

    // check image size
    if (icon?.size > 1024 * 1024) {
      return toast.error("Image size should be less than 1mb");
    }

    if (name === "") {
      return toast.error("Category name is required");
    }

    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    formData.append("order", order);

    const res = await addCategory(formData);

    if (res?.data?.success) {
      toast.success("Category added successfully");
      setIcons([]);
      navigate("/admin/product/category/all");
    } else {
      toast.error(res?.data?.message || "Failed to add category");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleAddCategory}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div>
        <p className="text-neutral-content">Icon</p>
        <ImageUploading
          value={icons}
          onChange={(icn) => setIcons(icn)}
          dataURLKey="data_url"
        >
          {({ onImageUpload, onImageRemove, dragProps }) => (
            <div
              className="w-max rounded border border-dashed p-4"
              {...dragProps}
            >
              <div className="flex items-center gap-2">
                <span
                  onClick={onImageUpload}
                  className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                >
                  Choose Image
                </span>

                <p className="text-neutral-content">or Drop here</p>
              </div>

              <div className={`${icons?.length > 0 && "mt-4"} `}>
                {icons?.map((img, index) => (
                  <div key={index} className="image-item relative">
                    <img src={img["data_url"]} alt="" className="w-40" />
                    <div
                      onClick={() => onImageRemove(index)}
                      className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category name</p>
        <input type="text" name="name" />
      </div>
      <div className="form_group mt-2">
        <p className="text-neutral-content">Category Order</p>
        <input type="number" defaultValue={orderNum} name="order" />
      </div>

      <div className="mt-4">
        <button className="primary_btn text-sm" disabled={isLoading}>
          {isLoading ? "Loading.." : "Add category"}
        </button>
      </div>
    </form>
  );
}

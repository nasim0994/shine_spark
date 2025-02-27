import {
  useBrandByIdQuery,
  useEditBrandMutation,
} from "@/Redux/brand/brandApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBrand() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [icons, setIcons] = useState([]);
  const { data } = useBrandByIdQuery(id);
  const [editBrand, { isLoading: editLoading }] = useEditBrandMutation();

  const handleAEditBrand = async (e) => {
    e.preventDefault();
    let icon = icons[0]?.file;
    const name = e.target.name.value;

    const formData = new FormData();
    formData.append("name", name);
    if (icon) formData.append("icon", icon);

    const res = await editBrand({ formData, id });
    if (res?.data?.success) {
      toast.success("Brand Edited Successfully");
      navigate("/admin/product/brand/all");
    } else {
      toast.error(res?.data?.message || "An error occurred");
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleAEditBrand}
      className="rounded bg-base-100 p-4 shadow sm:w-1/2"
    >
      <div>
        <p className="text-neutral-content">Icon</p>
        <div className="flex items-start justify-between">
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
                      <img src={img["data_url"]} alt="" className="w-20" />
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

          {data?.data?.icon && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${data?.data?.icon}`}
              alt="brand"
              className="mt-4 w-20 rounded"
            />
          )}
        </div>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Brand name</p>
        <input type="text" name="name" defaultValue={data?.data?.name} />
      </div>

      <div className="mt-4">
        <button className="primary_btn text-sm" disabled={editLoading}>
          {editLoading ? "Loading" : "Edit Brand"}
        </button>
      </div>
    </form>
  );
}

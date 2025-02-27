import { useAddBrandMutation } from "@/Redux/brand/brandApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";

export default function AddBrand() {
  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [name, setName] = useState("");

  const [addBrand, { isLoading }] = useAddBrandMutation();

  const handleAddBrand = async () => {
    let icon = icons[0]?.file;

    if (!icon) {
      return toast.error("Icon is required");
    }

    if (name === "") {
      return toast.error("Name is required");
    }

    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);

    const res = await addBrand(formData);
    if (res?.data?.success) {
      toast.success("Brand added successfully");
      setIcons([]);
      setName("");
      navigate("/admin/product/brand/all");
    } else {
      toast.error("Something went wrong");
      console.log(res);
    }
  };

  return (
    <div className="rounded bg-base-100 p-4 shadow sm:w-1/2">
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
        <p className="text-neutral-content">Brand name</p>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddBrand}
          className="primary_btn text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Brand"}
        </button>
      </div>
    </div>
  );
}

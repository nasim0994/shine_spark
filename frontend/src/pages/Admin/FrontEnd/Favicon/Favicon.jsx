import {
  useAddFaviconMutation,
  useGetFaviconQuery,
  useUpdateFaviconMutation,
} from "@/Redux/favicon/faviconApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";

export default function Favicon() {
  const [images, setImages] = useState([]);

  const { data } = useGetFaviconQuery();
  const favicon = data?.data;
  const id = favicon?._id;

  const [addFavicon, { isLoading: addLoading }] = useAddFaviconMutation();
  const [updateFavicon, { isLoading: updateLoading }] =
    useUpdateFaviconMutation();

  const handleAddBanner = async (e) => {
    e.preventDefault();

    const icon = images[0]?.file;

    if (!icon) return toast.error("Please select an icon");
    if (icon.size > 1024 * 1024)
      return toast.error("Image size must be less than 1MB");

    const formData = new FormData();
    formData.append("icon", icon);

    if (id) {
      const res = await updateFavicon({ id, formData });

      if (res?.data?.success) {
        setImages([]);
        toast.success("Favicon update successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    } else {
      const res = await addFavicon(formData);
      if (res?.data?.success) {
        setImages([]);
        toast.success("Favicon add successfully");
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Favicon</h3>
      </div>

      <form onSubmit={handleAddBanner} className="p-4">
        <div className="w-full md:w-1/2">
          <p className="mb-1">Icon</p>
          <div>
            <ImageUploading
              defaultValue={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="items-center gap-10 rounded border border-dashed p-4 md:flex"
                  {...dragProps}
                >
                  <div className="flex items-center gap-2">
                    <span
                      onClick={onImageUpload}
                      className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className={`${images?.length > 0 && "mt-4"} `}>
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt=""
                          className="h-20 w-32"
                        />
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
        </div>
        <div className="mt-4">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/favicon/${favicon?.icon}`}
            alt="icon"
            className="w-32"
          />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button disabled={addLoading} className="primary_btn">
              {addLoading || updateLoading
                ? "Loading..."
                : favicon?._id
                  ? "Update Icon"
                  : "Add Icon"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

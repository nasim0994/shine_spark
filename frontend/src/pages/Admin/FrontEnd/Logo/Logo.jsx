import Spinner from "@/components/shared/Spinner/Spinner";
import {
  useAddLogoMutation,
  useGetMainLogoQuery,
  useUpdateMainLogoMutation,
} from "@/Redux/logo/logoApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";

export default function Logo() {
  const [logos, setLogos] = useState([]);
  const { data, isLoading } = useGetMainLogoQuery();
  const [addLogo, { isLoading: addLoading }] = useAddLogoMutation();

  const [updateMainLogo, { isLoading: updateLoading }] =
    useUpdateMainLogoMutation();

  const id = data?.data[0]?._id;

  const handleUpdateAddMainLogo = async () => {
    const logo = logos[0]?.file;
    if (!logo) return toast.error("Please select a logo");

    if (logo.size > 1024 * 1024) {
      return toast.error("Image size must be less than 1MB");
    }

    let formData = new FormData();
    formData.append("logo", logo);

    if (data?.data?.length > 0) {
      const res = await updateMainLogo({ id, formData });
      if (res?.data?.success) {
        toast.success("Logo updated successfully");
      } else {
        toast.error(res?.data?.message || "Failed to update logo");
        console.log(res);
      }
    } else {
      const res = await addLogo(formData);
      if (res?.data?.success) {
        toast.success("Logo added successfully");
        setLogos([]);
      } else {
        toast.error(res?.data?.message || "Failed to update logo");
        console.log(res);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <h1 className="font-medium text-neutral">Logo Setting</h1>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded bg-base-100 shadow">
          <div>
            <p className="border-b p-3 text-neutral-content">
              Logo <small>(max 120px/56px)</small>
            </p>
            <div className="items-center gap-4 p-4 sm:flex">
              <ImageUploading
                value={logos}
                onChange={(file) => setLogos(file)}
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

                    <div className={`${logos?.length > 0 && "mt-4"} `}>
                      {logos?.map((img, index) => (
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

              {data?.data[0]?.logo && logos?.length >= 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                    data?.data[0]?.logo
                  }`}
                  alt=""
                  className="mt-4 w-32"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t p-4">
            <button
              disabled={updateLoading || addLoading}
              onClick={handleUpdateAddMainLogo}
              className="primary_btn"
            >
              {updateLoading || addLoading
                ? "Loading"
                : id
                  ? "Update Logo"
                  : "Add Logo"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

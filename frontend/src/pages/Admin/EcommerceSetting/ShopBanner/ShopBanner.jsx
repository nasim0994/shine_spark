import Spinner from "@/components/shared/Spinner/Spinner";
import {
  useAddTopCampaignBannerMutation,
  useGetTopCampaignBannersQuery,
  useUpdateTopCampaignBannerMutation,
} from "@/Redux/topCampaignBanner";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";

export default function ShopBanner() {
  const [images, setImages] = useState([]);
  const { data, isLoading } = useGetTopCampaignBannersQuery();
  const [addBanner, { isLoading: addLoading }] =
    useAddTopCampaignBannerMutation();

  const [updateBanner, { isLoading: updateLoading }] =
    useUpdateTopCampaignBannerMutation();

  const id = data?.data[0]?._id;

  const handleUpdateAddMainBanner = async () => {
    const image = images[0]?.file;
    if (!image) {
      return toast.error("Please select an image");
    }

    if (image?.size > 1024 * 1024) {
      return toast.error("Image size should be less than 1mb");
    }

    let formData = new FormData();
    formData.append("image", image);

    if (data?.data?.length > 0) {
      const res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        toast.success("Banner Update success");
        setImages([]);
      } else {
        toast.error("Something wrong, please try again letter");
      }
    } else {
      const res = await addBanner(formData);
      if (res?.data?.success) {
        toast.success("Banner Add success");
        setImages([]);
      } else {
        toast.error("Something wrong, please try again letter");
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="border-b bg-base-100 p-4">
        <h1 className="font-medium text-neutral">Campaign Banner 1</h1>
      </div>

      <div className="bg-base-100 shadow">
        <div className="p-4">
          <div>
            <p className="border-b text-neutral-content">Banner</p>
            <div className="flex flex-col p-4">
              <ImageUploading
                value={images}
                onChange={(file) => setImages(file)}
                dataURLKey="data_url"
              >
                {({ onImageUpload, onImageRemove, dragProps }) => (
                  <div
                    className="rounded border border-dashed p-4 md:w-1/2"
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

                    <div className={`${images?.length > 0 && "mt-4"} `}>
                      {images?.map((img, index) => (
                        <div key={index} className="image-item relative">
                          <img
                            src={img["data_url"]}
                            alt="banner"
                            className="h-44 w-full rounded"
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

              {data?.data[0]?.image && images?.length >= 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
                    data?.data[0]?.image
                  }`}
                  alt="banner"
                  className="mt-4 h-44 w-full rounded md:w-1/2"
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button
            disabled={updateLoading || addLoading}
            onClick={handleUpdateAddMainBanner}
            className="primary_btn"
          >
            {updateLoading || addLoading
              ? "Loading"
              : id
                ? "Update Banner"
                : "Add Banner"}
          </button>
        </div>
      </div>
    </section>
  );
}

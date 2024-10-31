import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import Spinner from "../../../../components/Spinner/Spinner";

import {
  useAddTopCampaignBannerMutation,
  useGetTopCampaignBannersQuery,
  useUpdateTopCampaignBannerMutation,
} from "../../../../Redux/topCampaignBanner";

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
      return Swal.fire("", "image is required", "error");
    }

    let formData = new FormData();
    formData.append("image", image);

    if (data?.data?.length > 0) {
      const res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        Swal.fire("", "Banner Update success", "success");
        setImages([]);
      } else {
        Swal.fire("", "Somethin wrong, please try again letter", "error");
      }
    } else {
      const res = await addBanner(formData);
      if (res?.data?.success) {
        Swal.fire("", "Banner Add success", "success");
        setImages([]);
      } else {
        Swal.fire("", "Somethin wrong, please try again letter", "error");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <h1 className="font-medium text-neutral">Top Campaign Banner</h1>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded bg-base-100 shadow">
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

                      <div className={`${images?.length > 0 && "mt-4"} `}>
                        {images?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="h-28 w-full rounded"
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
                    alt=""
                    className="mt-4 h-28 w-full rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t p-4">
            <button
              disabled={(updateLoading || addLoading) && "disabled"}
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
      </div>
    </section>
  );
}

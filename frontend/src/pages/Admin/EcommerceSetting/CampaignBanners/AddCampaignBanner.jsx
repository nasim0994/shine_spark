import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddCampaignBannerMutation } from "@/Redux/campaignBanner/campaignBannerApi";
import toast from "react-hot-toast";

export default function AddCampaignBanner() {
  const [images, setImages] = useState([]);

  const [addBanner, { isLoading, isError, error }] =
    useAddCampaignBannerMutation();

  const navigate = useNavigate();

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    const image = images[0]?.file;
    if (!image) {
      return toast.error("Please select an image");
    }

    if (image.size > 1024 * 1024) {
      return toast.error("Image size should be less than 1mb");
    }

    const form = e.target;
    const link = form.link.value;
    const order = form.order.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", link);
    formData.append("order", order);

    const res = await addBanner(formData);
    if (res?.data?.success) {
      toast.success("Campaign Banner Added Successfully");
      navigate("/admin/business/section/campaign-banner/all");
      setImages([]);
      form.reset();
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Add New Campaign Banner</h3>
      </div>
      <form onSubmit={handleAddCampaign} className="flex flex-col gap-4 p-4">
        <div>
          <ImageUploading
            value={images}
            onChange={(icn) => setImages(icn)}
            dataURLKey="data_url"
          >
            {({ onImageUpload, onImageRemove, dragProps }) => (
              <div
                className="w-max rounded border border-dashed p-4"
                {...dragProps}
              >
                <div className="flex flex-col items-center gap-2 sm:flex-row">
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

        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Link</p>
          <input
            type="text"
            name="link"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Order</p>
          <input
            type="number"
            name="order"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
          />
        </div>

        {isError && (
          <p className="text-xs text-red-500">
            {error?.data?.error ? error?.data?.error : "Something went wrong"}
          </p>
        )}

        <div>
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Add Campaign Banner"}
          </button>
        </div>
      </form>
    </section>
  );
}

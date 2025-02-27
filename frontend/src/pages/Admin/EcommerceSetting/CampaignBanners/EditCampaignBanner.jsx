import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCampaignBannerMutation,
  useGetCampaignBannerByIdQuery,
} from "@/Redux/campaignBanner/campaignBannerApi";
import toast from "react-hot-toast";

export default function EditCampaignBanner() {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const { data } = useGetCampaignBannerByIdQuery(id);
  const [editCampaignBanner] = useEditCampaignBannerMutation();

  const navigate = useNavigate();

  const handleEditCampaign = async (e) => {
    e.preventDefault();
    const image = images[0]?.file;
    const link = e.target.link.value;
    const order = e.target.order.value;

    if (image && image?.size > 1024 * 1024) {
      return toast.error("Image size should be less than 1mb");
    }

    const formData = new FormData();
    if (images?.length > 0) formData.append("image", image);
    formData.append("link", link);
    formData.append("order", order);

    const res = await editCampaignBanner({ formData, id });
    if (res?.data?.success) {
      toast.success("Campaign Banner Updated Successfully");
      navigate("/admin/business/section/campaign-banner/all");
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Edit Campaign Banner</h3>
      </div>
      <form onSubmit={handleEditCampaign} className="flex flex-col gap-4 p-4">
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

          {data?.data?.image && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
                data?.data?.image
              }`}
              alt=""
              className="mt-4 w-40 rounded"
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Link</p>
          <input
            type="text"
            name="link"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
            defaultValue={data?.data?.link}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-neutral-content">Order</p>
          <input
            type="text"
            name="order"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            required
            defaultValue={data?.data?.order}
          />
        </div>

        <div className="mt-6 flex justify-end border-t p-4">
          <button className="primary_btn">Edit Campaign Banner</button>
        </div>
      </form>
    </section>
  );
}

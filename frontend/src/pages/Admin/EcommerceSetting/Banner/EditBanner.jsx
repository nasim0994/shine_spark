import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBannerMutation,
  useGetBannerByIdQuery,
} from "@/Redux/banner/bannerApi";
import toast from "react-hot-toast";

export default function EditBanner() {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const { data } = useGetBannerByIdQuery(id);
  const [editCampaignBanner] = useEditBannerMutation();

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
      toast.success(res?.data?.message || "Banner updated successfully");
      navigate("/admin/business/section/banner/all");
    } else {
      toast.error(
        res?.data?.message || "Something went wrong, please try again",
      );
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4 font-medium text-neutral">
        <h3>Edit Campaign Banner</h3>
      </div>
      <form
        onSubmit={handleEditCampaign}
        className="flex flex-col gap-4 px-4 pb-4"
      >
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-neutral-content">Image</p>
            <ImageUploading
              value={images}
              onChange={(icn) => setImages(icn)}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div
                  className="w-full rounded border border-dashed p-4"
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
                        <img
                          src={img["data_url"]}
                          alt="banner"
                          className="w-full lg:h-44"
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

            {data?.data?.image && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                  data?.data?.image
                }`}
                alt="banner"
                className="mt-2 w-44 rounded"
              />
            )}
          </div>

          <div>
            <p className="mb-1 text-neutral-content">Order</p>
            <input
              type="text"
              name="order"
              placeholder="Enter Link"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={data?.data?.order}
            />
          </div>
        </div>

        <div>
          <p className="mb-1 text-neutral-content">Link</p>
          <input
            type="text"
            name="link"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
            defaultValue={data?.data?.link}
          />
        </div>

        <div>
          <button className="primary_btn">Edit Campaign Banner</button>
        </div>
      </form>
    </section>
  );
}

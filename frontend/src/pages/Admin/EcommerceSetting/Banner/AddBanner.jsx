import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import {
  useAddBannerMutation,
  useGetBannersQuery,
} from "@/Redux/banner/bannerApi";
import toast from "react-hot-toast";

export default function AddBanner() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const { data } = useGetBannersQuery();
  const allBanners = data?.data;

  const [addBanner, { isLoading }] = useAddBannerMutation();

  const handleAddBanner = async (e) => {
    e.preventDefault();
    const image = banners[0]?.file;
    if (!image) return toast.error("Please select an image");
    // check if image size is greater than 1mb
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
      toast.success(res?.data?.message || "Banner added successfully");
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
        <h3>Add New Banner</h3>
      </div>
      <form onSubmit={handleAddBanner} className="px-4 pb-4">
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-neutral-content">Image</p>
            <ImageUploading
              value={banners}
              onChange={(icn) => setBanners(icn)}
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

                  <div className={`${banners?.length > 0 && "mt-4"} `}>
                    {banners?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt="banner"
                          className="w-full object-cover lg:h-48"
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

          <div>
            <p className="mb-1 text-neutral-content">Order</p>
            <input
              type="number"
              name="order"
              placeholder="Enter Link"
              className="w-full rounded border px-3 py-2 text-sm outline-none"
              required
              defaultValue={allBanners?.length > 0 ? allBanners?.length + 1 : 1}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1 text-neutral-content">Link</p>
          <input
            type="text"
            name="link"
            placeholder="Enter Link"
            className="w-full rounded border px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="mt-4">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Add Banner"}
          </button>
        </div>
      </form>
    </section>
  );
}

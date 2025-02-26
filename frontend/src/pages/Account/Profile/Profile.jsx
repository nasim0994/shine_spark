import { useState } from "react";
import { Link } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import { AiFillDelete, AiOutlineCloseCircle } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import usePageView from "@/hooks/usePageView";
import { useGetMyOrdersQuery } from "@/Redux/order/orderApi";
import Spinner from "@/components/shared/Spinner/Spinner";
import toast from "react-hot-toast";

export default function Profile() {
  window.scroll(0, 0);
  usePageView("Profile");
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data } = useGetMyOrdersQuery(user?._id);
  const orders = data?.data;
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  if (!user) return <Spinner />;

  const { name, phone, email, city, area, street } = user;
  const image =
    !user?.image || user?.image === "" || user?.image === null
      ? "/images/demo_user.jpg"
      : `${import.meta.env.VITE_BACKEND_URL}/user/${user?.image}`;

  const handleUploadImage = async () => {
    if (images?.length <= 0) {
      return alert("Please Select an Image");
    }

    let image = images[0].file;
    const formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };

    let url = `${import.meta.env.VITE_BACKEND_URL}/user/updateImage/${
      loggedUser?.data?._id
    }`;

    setLoading(true);

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result?.success) {
        toast.success("Image Updated Successfully");
        setModal(false);
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        toast.error(result?.data?.message || "Something went wrong");
        console.log(result);
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid-cols-3 gap-6 rounded-md bg-primary/20 lg:grid">
        <div className="flex flex-col items-center justify-center rounded-md bg-primary/70 py-4 font-medium text-base-100">
          <div className="update_image_wrap">
            <img
              src={image}
              alt="user"
              className="h-full w-full rounded-full"
            />

            <button onClick={() => setModal(true)} className="update_image_btn">
              <FcEditImage className="text-2xl" />
            </button>

            <>
              <button className={`overlay ${modal && "overlay_show"}`}></button>
              <div
                className={`modal w-[90%] sm:w-[500px] ${
                  modal && "modal_show"
                }`}
              >
                <div className="flex justify-between bg-primary/10 p-5 text-center text-neutral">
                  <h1 className="text-xl">Update Profile Photo</h1>
                  <button onClick={() => setModal(false)}>
                    <AiOutlineCloseCircle className="text-2xl text-neutral-content" />
                  </button>
                </div>

                <div className="p-4">
                  <ImageUploading
                    value={images}
                    onChange={(img) => setImages(img)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div
                        className="w-max rounded border border-dashed p-4"
                        {...dragProps}
                      >
                        <div className="flex flex-col items-center gap-2">
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
                                className="w-40"
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

                  <div className="mt-4">
                    <button
                      onClick={handleUploadImage}
                      className="rounded bg-primary px-6 py-1.5 text-base-100"
                      disabled={loading}
                    >
                      {loading ? "Loading.." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
          <h1 className="mt-2 text-xl">{loggedUser?.data?.name}</h1>
        </div>

        <div className="col-span-2 grid grid-cols-2 items-center gap-4 py-5 text-center">
          <div className="border-r border-neutral/50">
            <h1 className="font-medium">Total Order</h1>
            <p className="font-medium">{orders?.length}</p>
          </div>
          <div>
            <h1 className="font-medium">Total Wishlist</h1>
            <p className="font-medium">{wishlists?.length}</p>
          </div>
        </div>
      </div>

      <div className="col-span-2 mt-4 rounded-md border p-4">
        <h3 className="mb-2 font-medium">Personal Info</h3>
        <div>
          <div>
            <input
              type="text"
              className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
              defaultValue={name}
              disabled
            />
          </div>
          <div>
            <input
              type="text"
              className="mb-4 w-full rounded border bg-gray-100 px-3 py-1.5 outline-none"
              defaultValue={phone}
              disabled
            />
          </div>

          <div>
            <input
              type="email"
              className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
              defaultValue={email}
              disabled
            />
          </div>

          <h3 className="mb-2 font-medium">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
                defaultValue={city}
                disabled
              />
            </div>

            <div>
              <input
                className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
                defaultValue={area}
                disabled
              />
            </div>
          </div>

          <div>
            <textarea
              className="mb-4 w-full rounded border px-3 py-1.5 outline-none"
              defaultValue={street}
              disabled
            />
          </div>
          <div>
            <Link
              to="/account/profile/edite"
              className="block scale-[1] rounded bg-primary py-2 text-center text-base-100 duration-300 hover:scale-[.99]"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

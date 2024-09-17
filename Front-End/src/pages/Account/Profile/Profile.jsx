import { useState } from "react";
import { Link } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import { AiFillDelete, AiOutlineCloseCircle } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";

export default function Profile() {
  window.scroll(0, 0);
  const { loggedUser } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = loggedUser?.data;
  if (!user) {
    return <Spinner />;
  }
  const { name, phone, email, city, district, street } = user;

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
        authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
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
        Swal.fire("", "Image update success", "success");
        setModal(false);
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        Swal.fire("Something went worng", "", "error");
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-primary/20 rounded-md lg:grid grid-cols-3 gap-6">
        <div className="bg-primary/70 rounded-md flex flex-col justify-center items-center py-4 text-base-100 font-medium">
          <div className="update_image_wrap">
            <img
              src={
                loggedUser?.data?.image === ""
                  ? "/images/demo_user.jpg"
                  : `${import.meta.env.VITE_BACKEND_URL}/user/${
                      loggedUser?.data?.image
                    }`
              }
              alt=""
              className="w-full h-full rounded-full"
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
                <div className="bg-primary/10 p-5 text-center text-neutral flex justify-between">
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
                        className="border rounded border-dashed p-4 w-max"
                        {...dragProps}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
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
                                className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
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
                      className="bg-primary text-base-100 px-6 py-1.5 rounded"
                      disabled={loading && "disabled"}
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

        <div className="col-span-2 grid grid-cols-2 gap-4 items-center text-center py-5">
          <div className="border-r border-neutral/50">
            <h1 className="font-medium">Total Order</h1>
            <p className="font-medium">0</p>
          </div>
          <div>
            <h1 className="font-medium">Total Wishlist</h1>
            <p className="font-medium">0</p>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded-md p-4 col-span-2">
        <h3 className="mb-2 font-medium">Personal Info</h3>
        <div>
          <div>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
              defaultValue={name}
              disabled
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 bg-gray-100"
              defaultValue={phone}
              disabled
            />
          </div>

          <div>
            <input
              type="email"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={email}
              disabled
            />
          </div>

          <h3 className="mb-2 font-medium">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                className="w-full border outline-none rounded px-3 py-1.5 mb-4"
                defaultValue={city}
                disabled
              />
            </div>

            <div>
              <input
                className="w-full border outline-none rounded px-3 py-1.5 mb-4"
                defaultValue={district}
                disabled
              />
            </div>
          </div>

          <div>
            <textarea
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={street}
              disabled
            />
          </div>
          <div>
            <Link
              to="/account/profile/edite"
              className="block text-center bg-primary text-base-100 py-2 rounded scale-[1] hover:scale-[.99] duration-300"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
